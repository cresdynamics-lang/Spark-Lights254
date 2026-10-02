import { AdminChrome } from "@/components/admin/AdminChrome";
import { ProductForm } from "@/components/admin/ProductForm";
import { prisma } from "@/lib/db";
import { rooms as staticRooms } from "@/lib/data";
import { createProduct } from "../actions";

export const metadata = { title: "Admin · New product" };

export default async function NewProductPage() {
  const [categories, dbRooms] = await Promise.all([
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true, slug: true },
    }),
    prisma.room.findMany({
      orderBy: { sortOrder: "asc" },
      select: { slug: true, name: true },
    }),
  ]);

  const rooms =
    dbRooms.length > 0
      ? dbRooms
      : staticRooms.map((r) => ({ slug: r.slug, name: r.name }));

  return (
    <AdminChrome title="New product">
      <h1 className="font-serif text-3xl sm:text-4xl mb-2">New product</h1>
      <p className="text-mute mb-8">Add a fixture to the live catalogue.</p>
      <ProductForm
        action={createProduct}
        categories={categories}
        rooms={rooms}
        submitLabel="Create product"
      />
    </AdminChrome>
  );
}
