import { SITE } from "@/lib/constants";
import { prisma } from "@/lib/db";

/** Google taxonomy — home lighting (valid for Meta google_product_category). */
const GOOGLE_PRODUCT_CATEGORY = "Home & Garden > Lighting";

const CSV_COLUMNS = [
  "id",
  "title",
  "description",
  "availability",
  "condition",
  "price",
  "link",
  "image_link",
  "brand",
  "google_product_category",
  "product_type",
  "additional_image_link",
] as const;

function csvCell(value: string): string {
  const safe = value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (/[",\n]/.test(safe)) return `"${safe.replace(/"/g, '""')}"`;
  return safe;
}

function absoluteUrl(path: string, origin: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = origin.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function formatPrice(kes: number): string {
  return `${kes.toFixed(2)} KES`;
}

function sanitizeDescription(text: string, maxLen = 5000): string {
  const plain = text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen - 1).trim()}…`;
}

function availabilityFor(slug: string): "in stock" | "out of stock" {
  if (/no-?stock/i.test(slug)) return "out of stock";
  return "in stock";
}

export async function buildMetaCatalogCsv(siteOrigin = SITE.url): Promise<string> {
  let rows: Awaited<ReturnType<typeof loadPublishedProducts>>;

  try {
    rows = await loadPublishedProducts();
  } catch {
    rows = [];
  }

  const lines = [CSV_COLUMNS.join(",")];

  for (const p of rows) {
    const link = absoluteUrl(`/products/${p.slug}`, siteOrigin);
    const imageLink = absoluteUrl(p.image, siteOrigin);
    const additional = p.hoverImage
      ? absoluteUrl(p.hoverImage, siteOrigin)
      : "";

    const record: Record<(typeof CSV_COLUMNS)[number], string> = {
      id: p.slug,
      title: p.name.slice(0, 200),
      description: sanitizeDescription(p.description || p.name),
      availability: availabilityFor(p.slug),
      condition: "new",
      price: formatPrice(p.price),
      link,
      image_link: imageLink,
      brand: SITE.fullName,
      google_product_category: GOOGLE_PRODUCT_CATEGORY,
      product_type: p.type || p.category.name,
      additional_image_link: additional,
    };

    lines.push(CSV_COLUMNS.map((col) => csvCell(record[col])).join(","));
  }

  return `${lines.join("\n")}\n`;
}

async function loadPublishedProducts() {
  return prisma.product.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
      slug: true,
      name: true,
      type: true,
      price: true,
      image: true,
      hoverImage: true,
      description: true,
      category: { select: { name: true, slug: true } },
    },
  });
}
