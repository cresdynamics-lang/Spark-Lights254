import { mkdir, readFile, writeFile } from "fs/promises";
import { join, normalize, sep } from "path";
import { compressImageBuffer } from "@/lib/image-compress";
import { slugify } from "@/lib/blogs";

/**
 * Admin uploads live outside `public/`: `next start` only serves public files
 * that existed at boot, so new photos are served by app/uploads/[...path].
 */
export function uploadRoot() {
  return process.env.UPLOAD_DIR || join(process.cwd(), "uploads");
}

export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

/** Compress (max 1200px, JPEG q80) and save. Returns the public URL path + compressed bytes. */
export async function saveProductUpload(file: File) {
  if (file.size === 0) throw new Error("No file uploaded");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("File too large (max 15MB)");
  if (file.type && !file.type.startsWith("image/")) throw new Error("Only image files are allowed");

  const input = Buffer.from(await file.arrayBuffer());
  const { buffer, ext } = await compressImageBuffer(input, { maxEdge: 1200, quality: 80 });

  const base = slugify(file.name.replace(/\.[^.]+$/, "")).slice(0, 60) || "photo";
  const name = `${Date.now()}-${base}${ext}`;
  const dir = join(uploadRoot(), "products");
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, name), buffer);

  return { path: `/uploads/products/${name}`, buffer };
}

/** Read an uploaded file by its URL segments; null when missing or outside the upload root. */
export async function readUpload(segments: string[]) {
  const root = normalize(uploadRoot());
  const full = normalize(join(root, ...segments));
  if (!full.startsWith(root + sep)) return null;
  try {
    return await readFile(full);
  } catch {
    return null;
  }
}
