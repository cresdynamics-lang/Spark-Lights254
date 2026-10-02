"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/blogs";

function csv(value: FormDataEntryValue | null): string[] {
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseSpecs(raw: string): { label: string; value: string }[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(":");
      return { label: label.trim(), value: rest.join(":").trim() || "—" };
    })
    .filter((s) => s.label);
}

async function productFromForm(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const slugRaw = String(formData.get("slug") || "").trim();
  const slug = slugify(slugRaw || name);
  const type = String(formData.get("type") || "").trim() || "Light";
  const price = Number(formData.get("price") || 0);
  const categorySlugs = formData
    .getAll("categories")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const image = String(formData.get("image") || "").trim();
  const hoverImage = String(formData.get("hoverImage") || "").trim() || null;
  const badge = String(formData.get("badge") || "").trim() || null;
  const description = String(formData.get("description") || "").trim();
  const styles = csv(formData.get("styles"));
  const rooms = formData
    .getAll("rooms")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const finish = csv(formData.get("finish"));
  const sizes = csv(formData.get("sizes"));
  const signature = formData.get("signature") === "on";
  const published = formData.get("published") === "on";
  const specs = parseSpecs(String(formData.get("specs") || ""));

  if (!name || !slug || !categorySlugs.length || !image || !Number.isFinite(price) || price < 0) {
    throw new Error("Missing required product fields");
  }

  const primary = await prisma.category.findUnique({ where: { slug: categorySlugs[0] } });
  if (!primary) throw new Error("Invalid category");

  return {
    name,
    slug,
    type,
    price: Math.round(price),
    categoryId: primary.id,
    categories: categorySlugs,
    image,
    hoverImage,
    badge,
    description,
    styles,
    rooms,
    finish,
    sizes,
    signature,
    published,
    specs,
  };
}

function revalidateShop() {
  revalidatePath("/admin/products");
  revalidatePath("/shop/[category]", "page");
  revalidatePath("/products/[slug]", "page");
  revalidatePath("/");
  revalidatePath("/signature");
  revalidatePath("/search");
}

export async function toggleProductPublished(id: string, published: boolean) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  await prisma.product.update({ where: { id }, data: { published } });
  revalidateShop();
}

export async function createProduct(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  const data = await productFromForm(formData);
  await prisma.product.create({ data });
  revalidateShop();
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  const data = await productFromForm(formData);
  await prisma.product.update({ where: { id }, data });
  revalidateShop();
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  await prisma.product.delete({ where: { id } });
  revalidateShop();
  redirect("/admin/products");
}
