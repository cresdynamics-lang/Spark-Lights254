import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { getInventoryByPath, SEO_INVENTORY, type SeoInventoryRow } from "@/lib/seo-inventory";
import { prisma } from "@/lib/db";

export function absoluteUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${p === "/" ? "" : p}`;
}

export function canonicalFor(path: string) {
  const normalised = path.replace(/\/$/, "") || "/";
  return absoluteUrl(normalised);
}

/** Prefer DB row; fall back to inventory file. */
export async function getSeoPage(path: string): Promise<SeoInventoryRow | null> {
  const normalised = path.replace(/\/$/, "") || "/";
  try {
    const row = await prisma.seoPage.findUnique({ where: { path: normalised } });
    if (row) {
      return {
        path: row.path,
        title: row.title,
        description: row.description,
        h1: row.h1,
        family: row.family as SeoInventoryRow["family"],
        schemaType: row.schemaType as SeoInventoryRow["schemaType"],
        parentPath: row.parentPath,
        indexable: row.indexable,
        published: row.published,
        phase: (row.phase as 1 | 2 | 3 | undefined) ?? undefined,
        audienceHref: row.audienceHref ?? undefined,
      };
    }
  } catch {
    /* db offline */
  }
  return getInventoryByPath(normalised) ?? null;
}

export async function seoMetadata(path: string, overrides?: Partial<Metadata>): Promise<Metadata> {
  const page = await getSeoPage(path);
  const canonical = canonicalFor(path);
  if (!page) {
    return {
      alternates: { canonical },
      ...overrides,
    };
  }
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical },
    robots: page.indexable && page.published ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: SITE.fullName,
      locale: "en_KE",
      type: "website",
      images: [
        {
          url: SITE.logo,
          width: 320,
          height: 320,
          alt: `${SITE.fullName} logo`,
        },
      ],
    },
    ...overrides,
  };
}

export function validateSeoInventory(rows: SeoInventoryRow[] = SEO_INVENTORY) {
  const errors: string[] = [];
  const titles = new Map<string, string>();
  const h1s = new Map<string, string>();

  for (const r of rows) {
    if (!r.published) continue;
    if (r.title.length > 60) errors.push(`${r.path}: title ${r.title.length}/60`);
    if (r.description.length > 155) errors.push(`${r.path}: description ${r.description.length}/155`);
    if (!r.h1?.trim()) errors.push(`${r.path}: missing H1`);
    if (!r.path) errors.push(`missing path for title ${r.title}`);

    const tKey = r.title.toLowerCase();
    if (titles.has(tKey)) errors.push(`duplicate title: "${r.title}" (${titles.get(tKey)} & ${r.path})`);
    else titles.set(tKey, r.path);

    const hKey = r.h1.toLowerCase();
    if (h1s.has(hKey)) errors.push(`duplicate H1: "${r.h1}" (${h1s.get(hKey)} & ${r.path})`);
    else h1s.set(hKey, r.path);

    const expectedCanonical = canonicalFor(r.path);
    if (!expectedCanonical.startsWith("https://")) {
      errors.push(`${r.path}: canonical must be https`);
    }
  }

  return errors;
}
