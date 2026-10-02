import Link from "next/link";
import Image from "next/image";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { prisma } from "@/lib/db";
import { toggleProductPublished, deleteProduct } from "./actions";

export const metadata = { title: "Admin · Products" };

export default async function AdminProductsPage() {
  let products: {
    id: string;
    name: string;
    type: string;
    slug: string;
    price: number;
    image: string;
    published: boolean;
    categories: string[];
    category: { name: string; slug: string };
  }[] = [];
  let categoryNames: Record<string, string> = {};

  try {
    const [rows, cats] = await Promise.all([
      prisma.product.findMany({
        include: { category: true },
        orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
      }),
      prisma.category.findMany({ select: { slug: true, name: true } }),
    ]);
    products = rows;
    categoryNames = Object.fromEntries(cats.map((c) => [c.slug, c.name]));
  } catch {
    products = [];
  }

  return (
    <AdminChrome title="Products">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl mb-2">Products</h1>
          <p className="text-mute">{products.length} products in the catalogue.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/shop/chandeliers" className="label border border-ink px-4 py-2 rounded-full">
            View shop
          </Link>
          <Link href="/admin/products/new" className="label bg-ink text-paper px-4 py-2 rounded-full">
            + New product
          </Link>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="border border-line bg-paper p-8 rounded-md">
          <p className="font-serif text-2xl mb-2">No products yet</p>
          <p className="text-mute mb-4">Create your first product or seed the database.</p>
          <Link href="/admin/products/new" className="label bg-ink text-paper px-4 py-2 rounded-full inline-block">
            + New product
          </Link>
        </div>
      ) : (
        <div className="border border-line bg-paper rounded-md overflow-hidden">
          <div className="hidden sm:grid grid-cols-[72px_1.4fr_1fr_100px_100px_140px] gap-3 px-4 py-3 label border-b border-line bg-mist">
            <span>Image</span>
            <span>Product</span>
            <span>Categories</span>
            <span>Price</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          <ul className="divide-y divide-line">
            {products.map((p) => {
              const slugs = p.categories.length ? p.categories : [p.category.slug];
              const categoryLabel = slugs
                .map((slug) => categoryNames[slug] || p.category.name)
                .join(", ");
              return (
                <li
                  key={p.id}
                  className="grid grid-cols-[56px_1fr] sm:grid-cols-[72px_1.4fr_1fr_100px_100px_140px] gap-3 px-4 py-3 items-center"
                >
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-mist rounded-md overflow-hidden border border-line">
                    <Image src={p.image} alt="" fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="label mt-0.5 truncate">{p.type}</p>
                    <div className="sm:hidden flex flex-wrap gap-3 mt-2">
                      <form action={toggleProductPublished.bind(null, p.id, !p.published)}>
                        <button type="submit" className="label">
                          {p.published ? "Live" : "Draft"}
                        </button>
                      </form>
                      <Link href={`/admin/products/${p.id}/edit`} className="label">
                        Edit
                      </Link>
                      <form action={deleteProduct.bind(null, p.id)}>
                        <button type="submit" className="label text-red-700">
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                  <p className="hidden sm:block text-sm text-mute truncate" title={categoryLabel}>
                    {categoryLabel}
                  </p>
                  <p className="hidden sm:block text-sm">KES {p.price.toLocaleString("en-KE")}</p>
                  <form
                    action={toggleProductPublished.bind(null, p.id, !p.published)}
                    className="hidden sm:block"
                  >
                    <button
                      type="submit"
                      className={`label px-3 py-1.5 rounded-full border ${
                        p.published ? "border-ink bg-ink text-paper" : "border-line text-mute"
                      }`}
                    >
                      {p.published ? "Live" : "Draft"}
                    </button>
                  </form>
                  <div className="hidden sm:flex items-center gap-3">
                    <Link href={`/admin/products/${p.id}/edit`} className="label">
                      Edit
                    </Link>
                    <form action={deleteProduct.bind(null, p.id)}>
                      <button type="submit" className="label text-red-700">
                        Delete
                      </button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </AdminChrome>
  );
}
