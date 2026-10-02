/**
 * Repair product.image / hoverImage paths that point at missing files
 * (e.g. .jpg after compress while disk still has .jpeg).
 *
 *   npx tsx scripts/repair-product-image-paths.ts
 */
import { existsSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PUBLIC = join(process.cwd(), "public");

function candidates(img: string): string[] {
  const list = [img];
  if (img.endsWith(".jpg")) list.push(img.replace(/\.jpg$/i, ".jpeg"));
  if (img.endsWith(".jpeg")) list.push(img.replace(/\.jpeg$/i, ".jpg"));
  const base = img.replace(/\.(jpg|jpeg|png)$/i, "");
  list.push(
    `${base}..jpeg`,
    `${base}...jpeg`,
    `${base}.jpeg`,
    `${base}.jpg`,
    `${base}..jpg`,
  );
  return [...new Set(list)];
}

function resolve(img: string): string | null {
  for (const c of candidates(img)) {
    const full = join(PUBLIC, c.replace(/^\//, ""));
    if (existsSync(full)) return c.startsWith("/") ? c : `/${c}`;
  }
  return null;
}

async function main() {
  const rows = await prisma.product.findMany({
    select: { id: true, slug: true, image: true, hoverImage: true },
  });
  let fixed = 0;
  let missing = 0;
  for (const r of rows) {
    const data: { image?: string; hoverImage?: string | null } = {};
    if (!existsSync(join(PUBLIC, r.image.replace(/^\//, "")))) {
      const found = resolve(r.image);
      if (found) data.image = found;
      else {
        missing += 1;
        console.warn("still missing", r.slug, r.image);
      }
    }
    if (r.hoverImage && !existsSync(join(PUBLIC, r.hoverImage.replace(/^\//, "")))) {
      data.hoverImage = resolve(r.hoverImage);
    }
    if (Object.keys(data).length) {
      await prisma.product.update({ where: { id: r.id }, data });
      fixed += 1;
      console.log("fixed", r.slug, data);
    }
  }
  console.log({ fixed, stillMissing: missing });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
