/**
 * Compress product photos in public/images/products (incl. imported/)
 * without a visible quality hit — max 1200px edge, JPEG q=80 mozjpeg.
 *
 *   npx tsx scripts/compress-product-images.ts
 */
import { readdir, stat } from "fs/promises";
import { join, extname } from "path";
import { compressImageFile } from "../src/lib/image-compress";

const ROOT = join(process.cwd(), "public/images/products");
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (EXTS.has(extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}

async function main() {
  const files = await walk(ROOT);
  let saved = 0;
  let beforeTotal = 0;
  let afterTotal = 0;
  let n = 0;

  for (const file of files) {
    const before = (await stat(file)).size;
    // Skip tiny already-light files (< 35KB) unless huge dimensions handled by sharp anyway
    try {
      const result = await compressImageFile(file, { maxEdge: 1200, quality: 80 });
      const delta = result.before - result.after;
      beforeTotal += result.before;
      afterTotal += result.after;
      n += 1;
      if (delta > 0) saved += delta;
      const pct = result.before ? Math.round((1 - result.after / result.before) * 100) : 0;
      if (pct >= 5 || result.before > 80_000) {
        console.log(
          `${pct}% ${(result.before / 1024).toFixed(0)}→${(result.after / 1024).toFixed(0)}KB  ${file.replace(ROOT + "/", "")}`,
        );
      }
    } catch (e) {
      console.warn("skip", file, (e as Error).message);
    }
  }

  console.log(
    `\nDone. ${n} files. ${(beforeTotal / 1024 / 1024).toFixed(1)}MB → ${(afterTotal / 1024 / 1024).toFixed(1)}MB (saved ${(saved / 1024 / 1024).toFixed(1)}MB)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
