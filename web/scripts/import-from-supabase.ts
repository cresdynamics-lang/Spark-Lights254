/**
 * One-off importer: pull Sparklights products from Supabase into local Postgres.
 * Credentials MUST be passed via process env for this run only — do not add them to .env.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/import-from-supabase.ts
 */
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { basename, extname, join } from "path";
import { pipeline } from "stream/promises";
import { Readable } from "stream";
import { PrismaClient, Prisma } from "@prisma/client";

const SUPABASE_URL = (process.env.SUPABASE_URL || "").replace(/\/$/, "");
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (pass for this run only; do not write to .env).",
  );
  process.exit(1);
}

const prisma = new PrismaClient();
const IMG_DIR = join(process.cwd(), "public/images/products/imported");
const LOCAL_PRODUCTS = join(process.cwd(), "public/images/products");

mkdirSync(IMG_DIR, { recursive: true });

type SbProduct = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  longDescription: string | null;
  badgeLabel: string | null;
  isFeatured: boolean;
  isActive: boolean;
  isOnSale: boolean;
  sortOrder: number;
  saleSortOrder: number | null;
};

type SbVariant = {
  productId: string;
  priceKes: number;
  salePriceKes: number | null;
  stockQty: number;
  isActive: boolean;
  label: string;
};

type SbImage = {
  productId: string;
  url: string;
  isPrimary: boolean;
  sortOrder: number;
};

type SbCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
};

type SbProductCategory = { productId: string; categoryId: string };

const SB_TO_LOCAL_CATEGORY: Record<string, string> = {
  "wall-lights": "wall-lights",
  "ceiling-lights": "ceiling-lights",
  "outdoor-lights": "outdoor-solar",
  "bedroom-lights": "ceiling-lights",
  "dining-lights": "chandeliers",
  "kitchen-lights": "ceiling-lights",
  "parking-lights": "outdoor-solar",
  "events-lights": "led-glow",
  "corridor-lights": "ceiling-lights",
};

const SB_TO_ROOM: Record<string, string> = {
  "bedroom-lights": "bedroom",
  "dining-lights": "dining",
  "kitchen-lights": "kitchen",
  "corridor-lights": "hallway",
  "outdoor-lights": "outdoor",
  "parking-lights": "outdoor",
  "events-lights": "living",
  "wall-lights": "living",
  "ceiling-lights": "living",
};

async function sbFetch<T>(path: string): Promise<T> {
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: "count=exact",
    },
  });
  if (!res.ok) {
    throw new Error(`Supabase ${res.status} ${path}: ${await res.text()}`);
  }
  return (await res.json()) as T;
}

async function sbFetchAll<T>(
  table: string,
  select = "*",
  order = "id.asc",
): Promise<T[]> {
  const pageSize = 1000;
  const out: T[] = [];
  let from = 0;
  for (;;) {
    const url = `${SUPABASE_URL}/rest/v1/${table}?select=${encodeURIComponent(select)}&order=${order}&limit=${pageSize}&offset=${from}`;
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    if (!res.ok) throw new Error(`Supabase ${res.status} ${table}: ${await res.text()}`);
    const batch = (await res.json()) as T[];
    out.push(...batch);
    if (batch.length < pageSize) break;
    from += pageSize;
  }
  return out;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function inferType(name: string, categorySlugs: string[]): string {
  const n = name.toLowerCase();
  if (n.includes("chandelier") || n.includes("chandalier")) return "Chandelier";
  if (n.includes("pendant")) return "Pendant";
  if (n.includes("wall")) return "Wall light";
  if (n.includes("floor") || n.includes("table lamp")) return "Lamp";
  if (n.includes("outdoor") || n.includes("solar") || n.includes("flood")) return "Outdoor";
  if (n.includes("downlight") || n.includes("gypsum") || n.includes("panel")) return "Downlight";
  if (n.includes("led") || n.includes("strip") || n.includes("glow")) return "LED";
  if (categorySlugs.includes("wall-lights")) return "Wall light";
  if (categorySlugs.includes("outdoor-lights") || categorySlugs.includes("parking-lights"))
    return "Outdoor";
  if (categorySlugs.includes("dining-lights")) return "Chandelier";
  return "Ceiling light";
}

function primaryLocalCategory(sbSlugs: string[]): string {
  for (const s of sbSlugs) {
    const mapped = SB_TO_LOCAL_CATEGORY[s];
    if (mapped) return mapped;
  }
  return "ceiling-lights";
}

function roomsFor(sbSlugs: string[]): string[] {
  const rooms = new Set<string>();
  for (const s of sbSlugs) {
    const r = SB_TO_ROOM[s];
    if (r) rooms.add(r);
  }
  if (!rooms.size) rooms.add("living");
  return [...rooms];
}

function safeFilename(urlOrPath: string, productSlug: string, index: number): string {
  let base = basename(urlOrPath.split("?")[0] || "");
  base = decodeURIComponent(base).replace(/[^a-zA-Z0-9._-]+/g, "-");
  if (!base || base === "/" || base === ".") {
    base = `${productSlug}-${index}.jpg`;
  }
  const ext = extname(base) || ".jpg";
  const stem = basename(base, ext).slice(0, 60) || productSlug;
  return `${productSlug}-${index}-${stem}${ext.toLowerCase()}`;
}

async function downloadTo(url: string, dest: string): Promise<boolean> {
  if (existsSync(dest)) return true;
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok || !res.body) {
      console.warn(`  skip download ${res.status}: ${url.slice(0, 100)}`);
      return false;
    }
    await pipeline(Readable.fromWeb(res.body as never), createWriteStream(dest));
    return true;
  } catch (e) {
    console.warn(`  download error: ${(e as Error).message} — ${url.slice(0, 100)}`);
    return false;
  }
}

async function resolveImage(
  rawUrl: string,
  productSlug: string,
  index: number,
): Promise<string | null> {
  if (!rawUrl) return null;

  // Already absolute Supabase (or other) URL — download locally
  if (/^https?:\/\//i.test(rawUrl)) {
    const file = safeFilename(rawUrl, productSlug, index);
    const dest = join(IMG_DIR, file);
    const ok = await downloadTo(rawUrl, dest);
    return ok ? `/images/products/imported/${file}` : null;
  }

  // Root-relative from old storefront, e.g. /6500.jpeg
  const leaf = basename(rawUrl);
  const localCandidates = [
    join(LOCAL_PRODUCTS, leaf),
    join(LOCAL_PRODUCTS, leaf.replace(/\.jpeg$/i, ".jpg")),
    join(LOCAL_PRODUCTS, leaf.replace(/\.png$/i, ".jpeg")),
  ];
  for (const c of localCandidates) {
    if (existsSync(c)) {
      return `/images/products/${basename(c)}`;
    }
  }

  // Try public storage bucket with same leaf
  const storageGuess = `${SUPABASE_URL}/storage/v1/object/public/product-images/products/${leaf}`;
  const file = safeFilename(leaf, productSlug, index);
  const dest = join(IMG_DIR, file);
  if (await downloadTo(storageGuess, dest)) {
    return `/images/products/imported/${file}`;
  }

  // Fallback: keep pointing at existing relative if present in public root later
  if (existsSync(join(process.cwd(), "public", leaf.replace(/^\//, "")))) {
    return rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
  }

  console.warn(`  no image for ${productSlug}: ${rawUrl}`);
  return null;
}

function effectivePrice(v: SbVariant | undefined, onSale: boolean): number {
  if (!v) return 0;
  if (onSale && v.salePriceKes != null && v.salePriceKes > 0) {
    return Math.round(v.salePriceKes);
  }
  return Math.round(v.priceKes || 0);
}

async function main() {
  console.log("Fetching Supabase catalogue…");
  const [products, variants, images, categories, productCategories] = await Promise.all([
    sbFetchAll<SbProduct>("Product"),
    sbFetchAll<SbVariant>("ProductVariant"),
    sbFetchAll<SbImage>("ProductImage"),
    sbFetchAll<SbCategory>("Category"),
    sbFetchAll<SbProductCategory>("ProductCategory", "*", "productId.asc"),
  ]);

  console.log({
    products: products.length,
    variants: variants.length,
    images: images.length,
    categories: categories.length,
    productCategories: productCategories.length,
  });

  const variantByProduct = new Map<string, SbVariant>();
  for (const v of variants) {
    const prev = variantByProduct.get(v.productId);
    if (!prev || (v.isActive && !prev.isActive)) variantByProduct.set(v.productId, v);
  }

  const imagesByProduct = new Map<string, SbImage[]>();
  for (const img of images) {
    const list = imagesByProduct.get(img.productId) || [];
    list.push(img);
    imagesByProduct.set(img.productId, list);
  }
  for (const list of imagesByProduct.values()) {
    list.sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary) || a.sortOrder - b.sortOrder);
  }

  const catById = new Map(categories.map((c) => [c.id, c]));
  const catsByProduct = new Map<string, string[]>();
  for (const pc of productCategories) {
    const cat = catById.get(pc.categoryId);
    if (!cat) continue;
    const list = catsByProduct.get(pc.productId) || [];
    list.push(cat.slug);
    catsByProduct.set(pc.productId, list);
  }

  const localCats = await prisma.category.findMany();
  const localBySlug = Object.fromEntries(localCats.map((c) => [c.slug, c.id]));
  const fallbackCategoryId =
    localBySlug["ceiling-lights"] || localCats[0]?.id;
  if (!fallbackCategoryId) {
    throw new Error("No local categories — run db:seed first.");
  }

  // Placeholders already in repo for missing downloads
  const placeholder =
    existsSync(join(LOCAL_PRODUCTS, "7500.jpeg"))
      ? "/images/products/7500.jpeg"
      : "/images/brand/sparklights-logo.jpg";

  const usedSlugs = new Set<string>();
  const rows: Prisma.ProductCreateManyInput[] = [];

  // Prefer active products; keep inactive unpublished
  const ordered = [...products].sort(
    (a, b) => (a.sortOrder - b.sortOrder) || a.name.localeCompare(b.name),
  );

  let i = 0;
  for (const p of ordered) {
    i += 1;
    let slug = slugify(p.slug || p.name) || `product-${i}`;
    if (usedSlugs.has(slug)) {
      let n = 2;
      while (usedSlugs.has(`${slug}-${n}`)) n += 1;
      slug = `${slug}-${n}`;
    }
    usedSlugs.add(slug);

    const sbCatSlugs = catsByProduct.get(p.id) || [];
    const localCatSlug = primaryLocalCategory(sbCatSlugs);
    const categoryId = localBySlug[localCatSlug] || fallbackCategoryId;
    const mappedCategorySlugs = [
      ...new Set(
        sbCatSlugs
          .map((s) => SB_TO_LOCAL_CATEGORY[s] || s)
          .concat(localCatSlug),
      ),
    ];

    const imgs = imagesByProduct.get(p.id) || [];
    console.log(`[${i}/${ordered.length}] ${p.name} (${slug})`);
    const resolved: string[] = [];
    for (let j = 0; j < imgs.length; j++) {
      const path = await resolveImage(imgs[j].url, slug, j);
      if (path) resolved.push(path);
    }
    const image = resolved[0] || placeholder;
    const hoverImage = resolved[1] || null;

    const variant = variantByProduct.get(p.id);
    const price = effectivePrice(variant, p.isOnSale);
    if (!price) {
      console.warn(`  warning: no price for ${slug}`);
    }

    let badge: string | null = p.badgeLabel;
    if (!badge && p.isOnSale) badge = "Sale";
    if (!badge && p.isFeatured) badge = "Featured";

    const description =
      (p.longDescription || p.shortDescription || "").trim() ||
      `${p.name} available at Sparklights 254, Nairobi.`;

    const type = inferType(p.name, sbCatSlugs);
    const rooms = roomsFor(sbCatSlugs);

    rows.push({
      slug,
      name: p.name.trim(),
      type,
      price: price || 0,
      image,
      hoverImage,
      badge,
      styles: ["modern"],
      rooms,
      categories: mappedCategorySlugs,
      finish: [],
      sizes: [],
      description,
      specs: [
        { label: "Availability", value: p.isActive ? "In stock" : "Unavailable" },
        ...(variant?.stockQty != null
          ? [{ label: "Stock", value: String(variant.stockQty) }]
          : []),
      ] as Prisma.InputJsonValue,
      signature: Boolean(p.isFeatured),
      published: Boolean(p.isActive),
      sortOrder: p.isOnSale ? (p.saleSortOrder ?? p.sortOrder ?? i) : (p.sortOrder ?? i),
      categoryId,
    });
  }

  console.log(`\nReplacing ${await prisma.product.count()} local products with ${rows.length}…`);
  await prisma.$transaction(async (tx) => {
    await tx.product.deleteMany();
    // createMany in chunks
    const chunk = 50;
    for (let c = 0; c < rows.length; c += chunk) {
      await tx.product.createMany({ data: rows.slice(c, c + chunk) });
    }
  });

  const [count, priceAgg, published] = await Promise.all([
    prisma.product.count(),
    prisma.product.aggregate({ _min: { price: true }, _max: { price: true }, _avg: { price: true } }),
    prisma.product.count({ where: { published: true } }),
  ]);

  console.log("\nDone.");
  console.log({
    products: count,
    published,
    priceMin: priceAgg._min.price,
    priceMax: priceAgg._max.price,
    priceAvg: Math.round(priceAgg._avg.price || 0),
  });
  console.log("Supabase credentials were NOT written to any .env file.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
