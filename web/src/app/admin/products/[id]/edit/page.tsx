import { notFound } from "next/navigation";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ProductForm } from "@/components/admin/ProductForm";
import { prisma } from "@/lib/db";
import { rooms as staticRooms } from "@/lib/data";
import { updateProduct, deleteProduct } from "../../actions";

export const metadata = { title: "Admin · Edit product" };

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories, dbRooms] = await Promise.all([
    prisma.product.findUnique({ where: { id }, include: { category: true } }),
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true, slug: true },
    }),
    prisma.room.findMany({
      orderBy: { sortOrder: "asc" },
      select: { slug: true, name: true },
    }),
  ]);
  if (!product) notFound();

  const rooms =
    dbRooms.length > 0
      ? dbRooms
      : staticRooms.map((r) => ({ slug: r.slug, name: r.name }));

  const specs = Array.isArray(product.specs)
    ? (product.specs as { label: string; value: string }[])
    : [];

  return (
    <AdminChrome title="Edit product">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl mb-2">Edit product</h1>
          <p className="text-mute">{product.name}</p>
        </div>
        <form action={deleteProduct.bind(null, product.id)}>
          <button type="submit" className="label border border-red-300 text-red-700 px-4 py-2 rounded-full">
            Delete product
          </button>
        </form>
      </div>
      <ProductForm
        action={updateProduct.bind(null, product.id)}
        categories={categories}
        rooms={rooms}
        submitLabel="Save changes"
        values={{
          name: product.name,
          slug: product.slug,
          type: product.type,
          price: product.price,
          categorySlugs:
            product.categories.length > 0
              ? product.categories
              : product.category
                ? [product.category.slug]
                : [],
          image: product.image,
          hoverImage: product.hoverImage,
          badge: product.badge,
          description: product.description,
          styles: product.styles,
          rooms: product.rooms,
          finish: product.finish,
          sizes: product.sizes,
          signature: product.signature,
          published: product.published,
          specs,
        }}
      />
    </AdminChrome>
  );
}
