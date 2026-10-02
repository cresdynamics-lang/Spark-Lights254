/**
 * One-off: import Supabase BlogPost rows as local Journal (Prisma Blog) posts.
 * Pass credentials for this run only — do not write them into .env.
 *
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/import-blogs-from-supabase.ts
 */
import { existsSync, mkdirSync, createWriteStream } from "fs";
import { basename, extname, join } from "path";
import { pipeline } from "stream/promises";
import { Readable } from "stream";
import { PrismaClient } from "@prisma/client";

const SUPABASE_URL = (process.env.SUPABASE_URL || "").replace(/\/$/, "");
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY for this run.");
  process.exit(1);
}

const prisma = new PrismaClient();
const IMG_DIR = join(process.cwd(), "public/images/journal");
const PRODUCT_DIR = join(process.cwd(), "public/images/products");
mkdirSync(IMG_DIR, { recursive: true });

type Section = { heading?: string; paragraphs?: string[] };
type Related = { path?: string; label?: string };

type SbBlog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  readMinutes: number | null;
  publishedAt: string | null;
  image: string | null;
  sections: Section[] | null;
  relatedLinks: Related[] | null;
  isPublished: boolean;
};

async function sbFetchAll<T>(table: string): Promise<T[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?select=*&order=publishedAt.asc.nullslast`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    },
  );
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return (await res.json()) as T[];
}

function sectionsToBody(sections: Section[] | null, related: Related[] | null): string {
  const parts: string[] = [];
  for (const s of sections || []) {
    if (s.heading) parts.push(`## ${s.heading.trim()}`);
    for (const p of s.paragraphs || []) {
      const t = (p || "").trim();
      if (t) parts.push(t);
    }
  }
  const links = (related || []).filter((l) => l.path && l.label);
  if (links.length) {
    parts.push("## Related");
    parts.push(links.map((l) => `- [${l.label}](${l.path})`).join("\n"));
  }
  return parts.join("\n\n").trim();
}

async function downloadTo(url: string, dest: string): Promise<boolean> {
  if (existsSync(dest)) return true;
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok || !res.body) return false;
    await pipeline(Readable.fromWeb(res.body as never), createWriteStream(dest));
    return true;
  } catch {
    return false;
  }
}

async function resolveImage(raw: string | null, slug: string): Promise<string | null> {
  if (!raw) return null;

  if (/^https?:\/\//i.test(raw)) {
    const leaf = basename(raw.split("?")[0] || "") || `${slug}.jpg`;
    const safe = leaf.replace(/[^a-zA-Z0-9._-]+/g, "-");
    const dest = join(IMG_DIR, `${slug}-${safe}`);
    if (await downloadTo(raw, dest)) return `/images/journal/${basename(dest)}`;
    return null;
  }

  const leaf = basename(raw);
  const localCandidates = [
    join(PRODUCT_DIR, leaf),
    join(process.cwd(), "public", leaf.replace(/^\//, "")),
    join(IMG_DIR, leaf),
  ];
  for (const c of localCandidates) {
    if (existsSync(c)) {
      if (c.startsWith(PRODUCT_DIR)) return `/images/products/${basename(c)}`;
      if (c.startsWith(IMG_DIR)) return `/images/journal/${basename(c)}`;
      return `/${leaf.replace(/^\//, "")}`;
    }
  }

  // Try Supabase public storage
  const guesses = [
    `${SUPABASE_URL}/storage/v1/object/public/product-images/products/${leaf}`,
    `${SUPABASE_URL}/storage/v1/object/public/product-images/${leaf}`,
  ];
  const dest = join(IMG_DIR, `${slug}${extname(leaf) || ".jpg"}`);
  for (const g of guesses) {
    if (await downloadTo(g, dest)) return `/images/journal/${basename(dest)}`;
  }

  // Fallback: known product path even if we didn't verify (may exist on server)
  if (leaf) return `/images/products/${leaf}`;
  return null;
}

async function main() {
  console.log("Fetching Supabase BlogPost…");
  const posts = await sbFetchAll<SbBlog>("BlogPost");
  console.log(`Found ${posts.length} blogs`);

  let created = 0;
  let updated = 0;
  let i = 0;

  for (const post of posts) {
    i += 1;
    const slug = post.slug.trim();
    const body = sectionsToBody(post.sections, post.relatedLinks);
    if (!body) {
      console.warn(`[${i}] skip ${slug} — empty body`);
      continue;
    }
    const image = await resolveImage(post.image, slug);
    const data = {
      slug,
      title: post.title.trim(),
      topic: (post.category || "General").trim(),
      excerpt: (post.excerpt || "").trim() || post.title.trim(),
      body,
      author: "Sparklights 254",
      minutes: post.readMinutes && post.readMinutes > 0 ? post.readMinutes : 5,
      featured: i === posts.length, // newest featured
      published: Boolean(post.isPublished),
      audienceHref: "/journal",
      image,
      sortOrder: i,
    };

    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) {
      await prisma.blog.update({ where: { slug }, data });
      updated += 1;
      console.log(`[${i}/${posts.length}] updated ${slug} · image=${image}`);
    } else {
      await prisma.blog.create({ data });
      created += 1;
      console.log(`[${i}/${posts.length}] created ${slug} · image=${image}`);
    }
  }

  // Un-feature older seed posts if we featured the latest import
  if (posts.length) {
    const featuredSlug = posts[posts.length - 1].slug;
    await prisma.blog.updateMany({
      where: { slug: { not: featuredSlug }, featured: true },
      data: { featured: false },
    });
    await prisma.blog.update({
      where: { slug: featuredSlug },
      data: { featured: true },
    });
  }

  const total = await prisma.blog.count();
  const withImage = await prisma.blog.count({ where: { image: { not: null } } });
  console.log({ created, updated, total, withImage });
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
