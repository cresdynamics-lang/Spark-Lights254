/**
 * Upsert SEO_INVENTORY rows into SeoPage without wiping the table (seed.ts deletes everything).
 * Usage: npx tsx scripts/sync-seo-pages.ts [family]   e.g. "audience"
 */
import { PrismaClient } from "@prisma/client";
import { SEO_INVENTORY } from "../src/lib/seo-inventory";
import { SITE } from "../src/lib/constants";

const prisma = new PrismaClient();

async function main() {
  const family = process.argv[2];
  const rows = family ? SEO_INVENTORY.filter((r) => r.family === family) : SEO_INVENTORY;
  for (const r of rows) {
    const data = {
      title: r.title,
      description: r.description,
      h1: r.h1,
      canonical: `${SITE.url}${r.path === "/" ? "" : r.path}`,
      family: r.family,
      schemaType: r.schemaType,
      parentPath: r.parentPath ?? null,
      indexable: r.indexable,
      published: r.published,
      phase: r.phase ?? null,
      audienceHref: r.audienceHref ?? null,
      lastModified: new Date(),
    };
    await prisma.seoPage.upsert({ where: { path: r.path }, create: { path: r.path, ...data }, update: data });
  }
  console.log(`Synced ${rows.length} SEO pages${family ? ` (${family})` : ""}`);
}

main().finally(() => prisma.$disconnect());
