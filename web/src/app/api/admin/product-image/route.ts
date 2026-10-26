import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { rooms as staticRooms } from "@/lib/data";
import { saveProductUpload } from "@/lib/uploads";
import { analyzeProductPhoto } from "@/lib/product-ai";

export const maxDuration = 60;

/** Upload a product photo; with analyze=1 also return AI-suggested name, description and placement. */
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  let saved;
  try {
    saved = await saveProductUpload(file);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }

  if (form.get("analyze") !== "1") return NextResponse.json({ path: saved.path });

  const [categories, dbRooms] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" }, select: { slug: true, name: true } }),
    prisma.room.findMany({ orderBy: { sortOrder: "asc" }, select: { slug: true, name: true } }),
  ]);
  const rooms = dbRooms.length > 0 ? dbRooms : staticRooms.map((r) => ({ slug: r.slug, name: r.name }));

  try {
    const suggestion = await analyzeProductPhoto(saved.buffer, { categories, rooms });
    return NextResponse.json({ path: saved.path, suggestion });
  } catch (err) {
    console.error("[product-image] analysis failed", err);
    // The photo is saved either way; the owner can fill the details by hand
    return NextResponse.json({ path: saved.path, aiError: "AI analysis failed — fill the details manually." });
  }
}
