"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

const STATUSES = ["new", "contacted", "quoted", "ordered", "closed"] as const;

export async function updateEnquiryStatus(id: string, formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  const status = String(formData.get("status") || "").trim();
  if (!STATUSES.includes(status as (typeof STATUSES)[number])) {
    throw new Error("Invalid status");
  }
  const notes = String(formData.get("notes") || "").trim() || null;
  await prisma.enquiry.update({
    where: { id },
    data: { status, notes },
  });
  revalidatePath("/admin/enquiries");
}

export async function deleteEnquiry(id: string) {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  await prisma.enquiry.delete({ where: { id } });
  revalidatePath("/admin/enquiries");
}
