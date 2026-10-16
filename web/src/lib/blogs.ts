import { prisma } from "@/lib/db";
import { staticBlogPosts, type BlogPost } from "@/lib/blog-data";

export type BlogFaq = { q: string; a: string };

export type BlogPostFull = BlogPost & {
  metaTitle?: string;
  metaDescription?: string;
  faqs?: BlogFaq[];
  publishedAt?: string;
  updatedAt?: string;
};

function mapFaqs(raw: unknown): BlogFaq[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const faqs = raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const q = String(row.q || row.question || "").trim();
      const a = String(row.a || row.answer || "").trim();
      return q && a ? { q, a } : null;
    })
    .filter(Boolean) as BlogFaq[];
  return faqs.length ? faqs : undefined;
}

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
  metaTitle?: string | null;
  metaDescription?: string | null;
  faqs?: unknown;
  publishedAt?: Date | null;
  updatedAt?: Date;
}): BlogPostFull {
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
    metaTitle: b.metaTitle ?? undefined,
    metaDescription: b.metaDescription ?? undefined,
    faqs: mapFaqs(b.faqs),
    publishedAt: b.publishedAt?.toISOString(),
    updatedAt: b.updatedAt?.toISOString(),
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

export async function listPublishedBlogs(): Promise<BlogPostFull[]> {
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

export async function getPublishedBlog(slug: string): Promise<BlogPostFull | undefined> {
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

function inlineFormat(text: string) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

export type BlogBlock =
  | { type: "h2"; text: string; key: number }
  | { type: "h3"; text: string; key: number }
  | { type: "p"; text: string; html: string; key: number }
  | { type: "ul"; items: string[]; key: number }
  | { type: "ol"; items: string[]; key: number }
  | { type: "table"; headers: string[]; rows: string[][]; key: number };

/** Render markdown-ish body: ## / ### headings, lists, tables, links. */
export function renderBlogBody(body: string): BlogBlock[] {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const blocks: BlogBlock[] = [];
  let i = 0;
  let key = 0;

  const pushParagraph = (buf: string[]) => {
    const text = buf.join(" ").replace(/\s+/g, " ").trim();
    if (!text) return;
    blocks.push({ type: "p", text, html: inlineFormat(text), key: key++ });
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3).trim(), key: key++ });
      i += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.slice(4).trim(), key: key++ });
      i += 1;
      continue;
    }

    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i += 1;
      }
      const parseRow = (row: string) =>
        row
          .slice(1, -1)
          .split("|")
          .map((c) => c.trim());
      const headers = parseRow(tableLines[0] || "| |");
      const dataStart =
        tableLines[1] && /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(tableLines[1])
          ? 2
          : 1;
      const rows = tableLines.slice(dataStart).map(parseRow);
      if (headers.length) {
        blocks.push({ type: "table", headers, rows, key: key++ });
      }
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(inlineFormat(lines[i].trim().replace(/^[-*]\s+/, "")));
        i += 1;
      }
      blocks.push({ type: "ul", items, key: key++ });
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(inlineFormat(lines[i].trim().replace(/^\d+\.\s+/, "")));
        i += 1;
      }
      blocks.push({ type: "ol", items, key: key++ });
      continue;
    }

    const para: string[] = [trimmed];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("## ") &&
      !lines[i].trim().startsWith("### ") &&
      !lines[i].trim().startsWith("|") &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim())
    ) {
      para.push(lines[i].trim());
      i += 1;
    }
    pushParagraph(para);
  }

  return blocks;
}
