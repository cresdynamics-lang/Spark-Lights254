import { AdminChrome } from "@/components/admin/AdminChrome";
import { catalogStats } from "@/lib/catalog";
import { prisma } from "@/lib/db";
import Link from "next/link";

export const metadata = { title: "Admin dashboard" };

export default async function AdminDashboardPage() {
  const stats = await catalogStats();
  let blogCount = 0;
  let recent: { name: string; slug: string; price: number; published: boolean }[] = [];
  if (stats.connected) {
    recent = await prisma.product.findMany({
      orderBy: { updatedAt: "desc" },
      take: 8,
      select: { name: true, slug: true, price: true, published: true },
    });
    try {
      blogCount = await prisma.blog.count();
    } catch {
      blogCount = 0;
    }
  }

  return (
    <AdminChrome title="Dashboard">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl mb-2">Dashboard</h1>
          <p className="text-mute">
            {stats.connected
              ? "Manage products and journal posts."
              : "Database offline — start with npm run db:up."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/blogs/new"
            className="label border border-ink px-4 py-2.5 rounded-full"
          >
            + New blog
          </Link>
          <Link
            href="/admin/products/new"
            className="label bg-ink text-paper px-4 py-2.5 rounded-full"
          >
            + New product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {[
          ["Products", stats.products, "/admin/products"],
          ["Blogs", blogCount, "/admin/blogs"],
          ["Categories", stats.categories, "/admin/categories"],
          ["DB", stats.connected ? "Online" : "Offline", "/admin"],
        ].map(([label, value, href]) => (
          <Link
            key={String(label)}
            href={String(href)}
            className="border border-line bg-paper p-5 rounded-md hover:bg-mist transition-colors"
          >
            <p className="label mb-2">{label}</p>
            <p className="font-serif text-3xl">{value}</p>
          </Link>
        ))}
      </div>

      <div className="border border-line bg-paper rounded-md overflow-hidden mb-8">
        <div className="px-5 py-4 border-b border-line flex items-center justify-between">
          <h2 className="font-serif text-xl">Recent products</h2>
          <Link href="/admin/products" className="label">
            View all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="p-5 text-mute text-sm">No products in database yet. Run npm run db:seed.</p>
        ) : (
          <ul className="divide-y divide-line">
            {recent.map((p) => (
              <li key={p.slug} className="px-5 py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="label mt-1">KES {p.price.toLocaleString("en-KE")}</p>
                </div>
                <span className={`label ${p.published ? "text-ink" : "text-mute"}`}>
                  {p.published ? "Published" : "Draft"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Link href="/admin/products" className="border border-line bg-paper p-5 rounded-md label">
          Manage products →
        </Link>
        <Link href="/admin/blogs" className="border border-line bg-paper p-5 rounded-md label">
          Manage blogs →
        </Link>
        <Link href="/journal" className="border border-line bg-paper p-5 rounded-md label">
          View journal →
        </Link>
      </div>
    </AdminChrome>
  );
}
