"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/blogs";

type FaqItem = { q: string; a: string };

function parseFaqs(raw: string): FaqItem[] | null {
  const text = raw.trim();
  if (!text || text === "[]") return null;
  try {
    const parsed = JSON.parse(text) as unknown;
    if (!Array.isArray(parsed)) {
      throw new Error("FAQ JSON must be an array");
    }
    const faqs = parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const row = item as Record<string, unknown>;
        const q = String(row.q ?? row.question ?? "").trim();
        const a = String(row.a ?? row.answer ?? "").trim();
        return q && a ? { q, a } : null;
      })
      .filter((x): x is FaqItem => Boolean(x));
    return faqs.length ? faqs : null;
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("FAQ JSON")) throw err;
    throw new Error('FAQ JSON is invalid — use [{"q":"…","a":"…"}]');
  }
}

/** Prisma Json columns need InputJsonValue (not a plain TS object array). */
function faqsToJson(faqs: FaqItem[] | null): Prisma.InputJsonValue | typeof Prisma.DbNull {
  if (!faqs) return Prisma.DbNull;
  return faqs as unknown as Prisma.InputJsonValue;
}

async function assertUniqueSlug(slug: string, excludeId?: string) {
  const clash = await prisma.blog.findFirst({
    where: excludeId ? { slug, NOT: { id: excludeId } } : { slug },
    select: { id: true },
  });
  if (clash) {
    throw new Error(`Slug "${slug}" is already used by another post — choose a unique slug`);
  }
}

async function blogFromForm(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slugRaw = String(formData.get("slug") || "").trim();
  const slug = slugify(slugRaw || title);
  const topic = String(formData.get("topic") || "").trim() || "General";
  const excerpt = String(formData.get("excerpt") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const author = String(formData.get("author") || "").trim() || "Sparklights 254";
  const minutes = Number(formData.get("minutes") || 5);
  const audienceHref = String(formData.get("audienceHref") || "").trim() || null;
  const image = String(formData.get("image") || "").trim() || null;
  const metaTitle = String(formData.get("metaTitle") || "").trim() || null;
  const metaDescription = String(formData.get("metaDescription") || "").trim() || null;
  const faqs = parseFaqs(String(formData.get("faqsJson") || ""));
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";

  if (!title || !slug || !excerpt || !body) {
    throw new Error("Missing required blog fields");
  }

  return {
    title,
    slug,
    topic,
    excerpt,
    body,
    author,
    minutes: Number.isFinite(minutes) && minutes > 0 ? Math.round(minutes) : 5,
    audienceHref,
    image,
    metaTitle,
    metaDescription,
    faqs: faqsToJson(faqs),
    featured,
    published,
    publishedAt: published ? new Date() : null,
  };
}

function revalidateBlogs(slug?: string) {
  revalidatePath("/admin/blogs");
  revalidatePath("/journal");
  revalidatePath("/blog");
  revalidatePath("/journal/[slug]", "page");
  revalidatePath("/blog/[slug]", "page");
  if (slug) {
    revalidatePath(`/journal/${slug}`);
    revalidatePath(`/blog/${slug}`);
  }
}

export async function createBlog(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  const data = await blogFromForm(formData);
  await assertUniqueSlug(data.slug);
  await prisma.blog.create({ data });
  revalidateBlogs(data.slug);
  redirect("/admin/blogs");
}

export async function updateBlog(id: string, formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  const data = await blogFromForm(formData);
  await assertUniqueSlug(data.slug, id);
  const existing = await prisma.blog.findUnique({
    where: { id },
    select: { publishedAt: true },
  });
  if (!existing) throw new Error("Blog post not found");
  await prisma.blog.update({
    where: { id },
    data: {
      ...data,
      publishedAt: data.published
        ? existing.publishedAt || data.publishedAt || new Date()
        : null,
    },
  });
  revalidateBlogs(data.slug);
  redirect("/admin/blogs");
}

export async function deleteBlog(id: string) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  const row = await prisma.blog.findUnique({ where: { id }, select: { slug: true } });
  await prisma.blog.delete({ where: { id } });
  revalidateBlogs(row?.slug);
  redirect("/admin/blogs");
}

export async function toggleBlogPublished(id: string, published: boolean) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  const row = await prisma.blog.findUnique({
    where: { id },
    select: { slug: true, publishedAt: true },
  });
  await prisma.blog.update({
    where: { id },
    data: {
      published,
      publishedAt: published ? row?.publishedAt || new Date() : null,
    },
  });
  revalidateBlogs(row?.slug);
}
