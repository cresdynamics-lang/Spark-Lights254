import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { SEO_INVENTORY } from "@/lib/seo-inventory";
import { prisma } from "@/lib/db";
import { products as staticProducts } from "@/lib/data";

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
        priority:
          p.path === "/"
            ? 1
            : p.family === "audience" || p.family === "category"
              ? 0.9
              : 0.7,
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

  // All published catalogue products (DB first — unique name-based slugs)
  try {
    const dbProducts = await prisma.product.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, name: true },
      orderBy: { updatedAt: "desc" },
    });
    if (dbProducts.length) {
      for (const p of dbProducts) {
        entries.push({
          url: `${SITE.url}/products/${p.slug}`,
          lastModified: p.updatedAt,
          changeFrequency: "daily",
          priority: 0.8,
        });
      }
    } else {
      for (const p of staticProducts) {
        entries.push({
          url: `${SITE.url}/products/${p.slug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  } catch {
    for (const p of staticProducts) {
      entries.push({
        url: `${SITE.url}/products/${p.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // Published journal / blog posts (canonical /blog/)
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    for (const b of blogs) {
      entries.push({
        url: `${SITE.url}/blog/${b.slug}`,
        lastModified: b.updatedAt,
        changeFrequency: "weekly",
        priority: 0.75,
      });
      entries.push({
        url: `${SITE.url}/journal/${b.slug}`,
        lastModified: b.updatedAt,
        changeFrequency: "weekly",
        priority: 0.65,
      });
    }
  } catch {
    /* ignore */
  }

  // Room guides
  try {
    const roomRows = await prisma.room.findMany({
      select: { slug: true, updatedAt: true },
    });
    for (const r of roomRows) {
      entries.push({
        url: `${SITE.url}/rooms/${r.slug}`,
        lastModified: r.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch {
    for (const slug of [
      "dining-room",
      "bedroom",
      "kitchen",
      "living-room",
      "entrance-hallway",
      "bathroom-mirror",
    ]) {
      entries.push({
        url: `${SITE.url}/rooms/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  entries.push({
    url: `${SITE.url}/llms.txt`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.3,
  });

  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}
