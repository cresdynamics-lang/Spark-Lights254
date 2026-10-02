import { prisma } from "@/lib/db";
import { staticBlogPosts, type BlogPost } from "@/lib/blog-data";

function mapBlog(b: {
  slug: string;
  title: string;
  topic: string;
  excerpt: string;
  body: string;
  author: string;
  minutes: number;
  featured: boolean;
  audienceHref: string | null;
  image: string | null;
}): BlogPost {
  return {
    slug: b.slug,
    title: b.title,
    topic: b.topic,
    excerpt: b.excerpt,
    body: b.body,
    author: b.author,
    minutes: b.minutes,
    featured: b.featured,
    audienceHref: b.audienceHref ?? undefined,
    image: b.image ?? undefined,
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

export async function listPublishedBlogs(): Promise<BlogPost[]> {
  if (!(await dbReady())) return staticBlogPosts;
  try {
    const rows = await prisma.blog.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { updatedAt: "desc" }],
    });
    return rows.length ? rows.map(mapBlog) : staticBlogPosts;
  } catch {
    return staticBlogPosts;
  }
}

export async function getPublishedBlog(slug: string): Promise<BlogPost | undefined> {
  if (!(await dbReady())) return staticBlogPosts.find((p) => p.slug === slug);
  try {
    const row = await prisma.blog.findFirst({ where: { slug, published: true } });
    if (row) return mapBlog(row);
    return staticBlogPosts.find((p) => p.slug === slug);
  } catch {
    return staticBlogPosts.find((p) => p.slug === slug);
  }
}

export async function listAdminBlogs() {
  return prisma.blog.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Render simple markdown-ish body: ## headings and paragraphs. */
export function renderBlogBody(body: string) {
  const blocks = body.split(/\n\n+/).filter(Boolean);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return { type: "h2" as const, text: trimmed.slice(3), key: i };
    }
    return { type: "p" as const, text: trimmed.replace(/\n/g, " "), key: i };
  });
}
