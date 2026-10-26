import { extname } from "path";
import { readUpload } from "@/lib/uploads";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const type = TYPES[extname(path[path.length - 1] || "").toLowerCase()];
  if (!type) return new Response("Not found", { status: 404 });

  const file = await readUpload(path);
  if (!file) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": type,
      // Filenames are timestamped, so the content never changes
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
