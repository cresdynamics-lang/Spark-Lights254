/**
 * Strip supplier numeric codes from product display names.
 * Keeps slugs unchanged (URLs stay stable).
 *
 * Usage: npx tsx scripts/rename-product-display-names.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const WORD_FIX: Record<string, string> = {
  dinning: "Dining",
  chandalier: "Chandelier",
  chandeliers: "Chandeliers",
  chandelier: "Chandelier",
  pendants: "Pendant",
  pendant: "Pendant",
  ceiling: "Ceiling",
  lights: "Lights",
  light: "Light",
  wall: "Wall",
  outdoor: "Outdoor",
  decor: "Decor",
  decorative: "Decorative",
  rechargeable: "Rechargeable",
  sportlights: "Spotlights",
  spotlights: "Spotlights",
  fullmoons: "Full Moon",
  glass: "Glass",
  modern: "Modern",
  unique: "Unique",
  office: "Office",
  kitchen: "Kitchen",
  island: "Island",
  mirror: "Mirror",
  truck: "Truck",
  low: "Low",
  nairobi: "Nairobi",
  edison: "Edison",
  bulbs: "Bulbs",
  led: "LED",
  sisal: "Sisal",
  in: "in",
  one: "One",
  for: "for",
  your: "your",
  and: "and",
};

function titleCaseWord(w: string) {
  const lower = w.toLowerCase();
  if (WORD_FIX[lower]) return WORD_FIX[lower];
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export function cleanProductName(input: {
  name: string;
  slug: string;
  type: string;
}): string {
  let raw = input.name.trim();

  raw = raw.replace(/^\d{5,}[.\s_-]*/g, "");
  raw = raw.replace(/\b\d{8,}\b/g, " ");
  raw = raw
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/(ceiling)(lights?)/gi, "$1 $2")
    .replace(/(wall)(lights?)/gi, "$1 $2")
    .replace(/(pendant)s?(lights?)/gi, "Pendant $2")
    .replace(/(outdoor)(lights?|ceiling)/gi, "$1 $2")
    .replace(/(sport)(lights?)/gi, "Spot $2")
    .replace(/(full)(moons?)/gi, "$1 $2")
    .replace(/[_./]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!raw || raw.length < 3 || /^\d+$/.test(raw)) {
    raw = input.slug
      .replace(/^\d{5,}[-]?/, "")
      .replace(/-/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  if (!raw || raw.length < 3) raw = input.type || "Light";

  let name = raw
    .split(/\s+/)
    .filter(Boolean)
    .map(titleCaseWord)
    .join(" ")
    .replace(/\bPendants Lights\b/gi, "Pendant Lights")
    .replace(/\bPendant Light\b/gi, "Pendant Light")
    .replace(/\s+/g, " ")
    .replace(/\s+\d{5,}$/g, "")
    .trim();

  if (/^(lights?|chandelier|pendant|ceiling|wall)$/i.test(name)) {
    name = input.type;
  }
  if (!name) name = input.type || "Light Fixture";
  if (name.length > 80) name = `${name.slice(0, 77).trim()}…`;
  return name;
}

async function main() {
  const products = await prisma.product.findMany({
    select: { id: true, name: true, slug: true, type: true },
    orderBy: { createdAt: "asc" },
  });

  // Pass 1: clean names
  const proposed = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    old: p.name,
    next: cleanProductName(p),
  }));

  // Pass 2: uniquify duplicates with " 2", " 3"…
  const counts = new Map<string, number>();
  for (const row of proposed) {
    const key = row.next.toLowerCase();
    const n = (counts.get(key) || 0) + 1;
    counts.set(key, n);
    if (n > 1) row.next = `${row.next} ${n}`;
  }

  let updated = 0;
  for (const row of proposed) {
    if (row.next === row.old) continue;
    await prisma.product.update({
      where: { id: row.id },
      data: { name: row.next },
    });
    console.log(`${row.slug}\n  "${row.old}" → "${row.next}"`);
    updated += 1;
  }

  console.log(`Done. Updated ${updated} of ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
