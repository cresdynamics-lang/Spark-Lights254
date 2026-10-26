"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { saveProductUpload } from "@/lib/uploads";

/**
 * Admin upload: always compresses (max 1200px, JPEG q80) before saving.
 * Returns the public path e.g. /uploads/products/….jpg
 */
export async function uploadCompressedProductImage(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file uploaded");
  }

  const { path, buffer } = await saveProductUpload(file);

  revalidatePath("/shop");
  revalidatePath("/admin/media");
  return { path, bytes: buffer.length };
}
