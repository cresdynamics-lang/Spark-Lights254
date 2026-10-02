import type { Category, Product, Room } from "@/lib/data";
import {
  categories as staticCategories,
  products as staticProducts,
  rooms as staticRooms,
  locations as staticLocations,
  guides as staticGuides,
  projects as staticProjects,
  getCategory as staticGetCategory,
  getProduct as staticGetProduct,
  getRoom as staticGetRoom,
  productsByCategory as staticProductsByCategory,
  productsByRoom as staticProductsByRoom,
  signatureProducts as staticSignature,
  featuredProducts as staticFeatured,
} from "@/lib/data";
import { prisma } from "@/lib/db";

function mapProduct(p: {
  slug: string;
  name: string;
  type: string;
  price: number;
  image: string;
  hoverImage: string | null;
  badge: string | null;
  styles: string[];
  rooms: string[];
  categories?: string[];
  finish: string[];
  sizes: string[];
  description: string;
  specs: unknown;
  signature: boolean;
  category: { slug: string };
}): Product {
  const categorySlugs =
    p.categories && p.categories.length > 0 ? p.categories : [p.category.slug];
  return {
    slug: p.slug,
    name: p.name,
    type: p.type,
    category: categorySlugs[0],
    price: p.price,
    image: p.image,
    hoverImage: p.hoverImage ?? undefined,
    badge: (p.badge as Product["badge"]) ?? undefined,
    styles: p.styles,
    rooms: p.rooms,
    finish: p.finish.length ? p.finish : undefined,
    sizes: p.sizes.length ? p.sizes : undefined,
    description: p.description,
    specs: (p.specs as Product["specs"]) ?? [],
    signature: p.signature,
  };
}

function mapCategory(c: {
  slug: string;
  name: string;
  shortName: string | null;
  subtitle: string;
  description: string;
  mosaicLabel: string | null;
  image: string;
  featured: boolean;
}): Category {
  return {
    slug: c.slug,
    name: c.name,
    shortName: c.shortName ?? undefined,
    subtitle: c.subtitle,
    description: c.description,
    mosaicLabel: c.mosaicLabel ?? undefined,
    image: c.image,
    featured: c.featured || undefined,
  };
}

async function dbReady() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export async function catalogCategories(): Promise<Category[]> {
  if (!(await dbReady())) return staticCategories;
  const rows = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.length ? rows.map(mapCategory) : staticCategories;
}

export async function catalogCategory(slug: string): Promise<Category | undefined> {
  if (!(await dbReady())) return staticGetCategory(slug);
  const row = await prisma.category.findUnique({ where: { slug } });
  return row ? mapCategory(row) : staticGetCategory(slug);
}

export async function catalogProducts(): Promise<Product[]> {
  if (!(await dbReady())) return staticProducts;
  const rows = await prisma.product.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });
  return rows.length ? rows.map(mapProduct) : staticProducts;
}

export async function catalogProduct(slug: string): Promise<Product | undefined> {
  if (!(await dbReady())) return staticGetProduct(slug);
  const row = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  return row ? mapProduct(row) : staticGetProduct(slug);
}

export async function catalogProductsByCategory(categorySlug: string): Promise<Product[]> {
  if (!(await dbReady())) return staticProductsByCategory(categorySlug);
  const rows = await prisma.product.findMany({
    where: {
      published: true,
      OR: [{ categories: { has: categorySlug } }, { category: { slug: categorySlug } }],
    },
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });
  if (rows.length) return rows.map(mapProduct);
  // Efficient fallback: related styles / adjacent categories, then static
  const staticMatch = staticProductsByCategory(categorySlug);
  if (staticMatch.length) return staticMatch;
  const all = await catalogProducts();
  return all.slice(0, 8);
}

export async function catalogProductsByRoom(roomSlug: string): Promise<Product[]> {
  if (!(await dbReady())) return staticProductsByRoom(roomSlug);
  const rows = await prisma.product.findMany({
    where: { published: true, rooms: { has: roomSlug } },
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });
  return rows.length ? rows.map(mapProduct) : staticProductsByRoom(roomSlug);
}

export async function catalogSignatureProducts(): Promise<Product[]> {
  if (!(await dbReady())) return staticSignature();
  const rows = await prisma.product.findMany({
    where: {
      published: true,
      OR: [{ signature: true }, { badge: "Signature" }],
    },
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });
  return rows.length ? rows.map(mapProduct) : staticSignature();
}

export async function catalogFeaturedProducts(): Promise<Product[]> {
  if (!(await dbReady())) return staticFeatured();
  const rows = await prisma.product.findMany({
    where: {
      published: true,
      OR: [{ badge: "New" }, { badge: "Popular" }],
    },
    include: { category: true },
    orderBy: { sortOrder: "asc" },
    take: 4,
  });
  return rows.length ? rows.map(mapProduct) : staticFeatured();
}

export async function catalogRooms(): Promise<Room[]> {
  if (!(await dbReady())) return staticRooms;
  const rows = await prisma.room.findMany({ orderBy: { sortOrder: "asc" } });
  if (!rows.length) return staticRooms;
  return rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    headline: r.headline,
    description: r.description,
    image: r.image,
    tips: r.tips as Room["tips"],
    faqs: r.faqs as Room["faqs"],
    chooseBy: (r.chooseBy as Room["chooseBy"]) ?? undefined,
  }));
}

export async function catalogRoom(slug: string) {
  const rooms = await catalogRooms();
  return rooms.find((r) => r.slug === slug) ?? staticGetRoom(slug);
}

export async function catalogLocations() {
  if (!(await dbReady())) return staticLocations;
  const rows = await prisma.location.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.length
    ? rows.map((l) => ({
        slug: l.slug,
        name: l.name,
        blurb: l.blurb,
        homes: l.homes,
        delivery: l.delivery,
        window: l.window,
      }))
    : staticLocations;
}

export async function catalogGuides() {
  if (!(await dbReady())) return staticGuides;
  const rows = await prisma.guide.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.length
    ? rows.map((g) => ({
        slug: g.slug,
        title: g.title,
        summary: g.summary,
        intent: g.intent,
      }))
    : staticGuides;
}

export async function catalogProjects() {
  if (!(await dbReady())) return staticProjects;
  const rows = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.length
    ? rows.map((p) => ({
        slug: p.slug,
        title: p.title,
        area: p.area,
        room: p.room,
        image: p.image,
      }))
    : staticProjects;
}

export async function catalogStats() {
  if (!(await dbReady())) {
    return {
      connected: false,
      categories: staticCategories.length,
      products: staticProducts.length,
      rooms: staticRooms.length,
    };
  }
  const [categories, products, rooms] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.room.count(),
  ]);
  return { connected: true, categories, products, rooms };
}
