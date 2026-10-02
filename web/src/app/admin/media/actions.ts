"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { compressImageBuffer } from "@/lib/image-compress";
import { slugify } from "@/lib/blogs";

/**
 * Admin upload: always compresses (max 1200px, JPEG q80) before saving.
 * Returns the public path e.g. /images/products/uploads/….jpg
 */
export async function uploadCompressedProductImage(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file uploaded");
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error("File too large (max 12MB)");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const { buffer, ext } = await compressImageBuffer(bytes, {
    maxEdge: 1200,
    quality: 80,
  });

  const base =
    slugify(file.name.replace(/\.[^.]+$/, "")) || `upload-${Date.now()}`;
  const name = `${Date.now()}-${base}${ext}`;
  const dir = join(process.cwd(), "public/images/products/uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, name), buffer);

  revalidatePath("/shop");
  revalidatePath("/admin/media");
  return { path: `/images/products/uploads/${name}`, bytes: buffer.length };
}
