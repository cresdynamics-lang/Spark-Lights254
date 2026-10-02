import { mkdir, writeFile } from "fs/promises";
import { dirname, extname } from "path";
import sharp from "sharp";

export type CompressOptions = {
  /** Longest edge in px (default 1200 — enough for product zoom, light for shop grids) */
  maxEdge?: number;
  /** JPEG/WebP quality 1–100 (default 80 — visually lossless for product photos) */
  quality?: number;
};

/**
 * Compress an image buffer without a visible quality hit:
 * resize down only if larger than maxEdge, strip metadata, mozjpeg / webp.
 */
export async function compressImageBuffer(
  input: Buffer,
  opts: CompressOptions = {},
): Promise<{ buffer: Buffer; ext: ".jpg" | ".webp"; contentType: string }> {
  const maxEdge = opts.maxEdge ?? 1200;
  const quality = opts.quality ?? 80;

  const image = sharp(input, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const width = meta.width || maxEdge;
  const height = meta.height || maxEdge;
  const longest = Math.max(width, height);

  let pipeline = image;
  if (longest > maxEdge) {
    pipeline = pipeline.resize({
      width: width >= height ? maxEdge : undefined,
      height: height > width ? maxEdge : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  // Prefer JPEG for broad compatibility on product paths
  const buffer = await pipeline
    .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toBuffer();

  return { buffer, ext: ".jpg", contentType: "image/jpeg" };
}

/** Write a compressed image to disk (creates parent dirs). Returns absolute path written. */
export async function writeCompressedImage(
  input: Buffer,
  destPathWithoutExt: string,
  opts?: CompressOptions,
): Promise<string> {
  const { buffer, ext } = await compressImageBuffer(input, opts);
  const dest = `${destPathWithoutExt}${ext}`;
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buffer);
  return dest;
}

/** Compress an existing file in place (or to sibling .jpg). */
export async function compressImageFile(
  filePath: string,
  opts?: CompressOptions,
): Promise<{ before: number; after: number; path: string }> {
  const fs = await import("fs/promises");
  const input = await fs.readFile(filePath);
  const before = input.length;
  const { buffer, ext } = await compressImageBuffer(input, opts);

  const origExt = extname(filePath).toLowerCase();
  // Keep original extension so DB paths (.jpeg) stay valid; only convert exotic types to .jpg
  const keepExt =
    origExt === ".jpg" || origExt === ".jpeg" || origExt === ".png" || origExt === ".webp"
      ? origExt === ".png" || origExt === ".webp"
        ? ".jpg"
        : origExt
      : ext;
  const outPath = filePath.replace(/\.[^.]+$/, "") + keepExt;

  // If output is jpeg/jpg, write jpeg buffer; path extension must match
  await writeFile(outPath, buffer);
  if (outPath !== filePath) {
    try {
      await fs.unlink(filePath);
    } catch {
      /* keep original if unlink fails */
    }
  }
  return { before, after: buffer.length, path: outPath };
}
