import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { SEO_INVENTORY } from "@/lib/seo-inventory";
import { prisma } from "@/lib/db";
import { products } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  try {
    const pages = await prisma.seoPage.findMany({
      where: { published: true, indexable: true },
      select: { path: true, lastModified: true, family: true },
    });
    for (const p of pages) {
      entries.push({
        url: `${SITE.url}${p.path === "/" ? "" : p.path}`,
        lastModified: p.lastModified,
        changeFrequency: p.family === "journal" ? "weekly" : "weekly",
        priority: p.path === "/" ? 1 : p.family === "audience" || p.family === "category" ? 0.9 : 0.7,
      });
    }
  } catch {
    for (const p of SEO_INVENTORY.filter((r) => r.published && r.indexable)) {
      entries.push({
        url: `${SITE.url}${p.path === "/" ? "" : p.path}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: p.path === "/" ? 1 : 0.8,
      });
    }
  }

  // Products always included when published in static/DB catalogue
  for (const p of products) {
    entries.push({
      url: `${SITE.url}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  // Dedupe by URL
  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}
