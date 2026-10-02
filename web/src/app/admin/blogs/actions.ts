"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/blogs";

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
    featured,
    published,
  };
}

function revalidateBlogs() {
  revalidatePath("/admin/blogs");
  revalidatePath("/journal");
  revalidatePath("/journal/[slug]", "page");
}

export async function createBlog(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  const data = await blogFromForm(formData);
  await prisma.blog.create({ data });
  revalidateBlogs();
  redirect("/admin/blogs");
}

export async function updateBlog(id: string, formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  const data = await blogFromForm(formData);
  await prisma.blog.update({ where: { id }, data });
  revalidateBlogs();
  redirect("/admin/blogs");
}

export async function deleteBlog(id: string) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  await prisma.blog.delete({ where: { id } });
  revalidateBlogs();
  redirect("/admin/blogs");
}

export async function toggleBlogPublished(id: string, published: boolean) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  await prisma.blog.update({ where: { id }, data: { published } });
  revalidateBlogs();
}
