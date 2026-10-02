import Link from "next/link";
import Image from "next/image";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { prisma } from "@/lib/db";

export const metadata = { title: "Admin · Categories" };

export default async function AdminCategoriesPage() {
  type Row = {
    id: string;
    slug: string;
    name: string;
    subtitle: string;
    image: string;
    _count: { products: number };
  };

  let categories: Row[] = [];
  try {
    categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    categories = [];
  }

  return (
    <AdminChrome>
      <div className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl mb-2">Categories</h1>
        <p className="text-mute">
          Each category powers a shop page. Product counts show what visitors will see.
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="border border-line bg-paper p-8 rounded-md text-mute">
          No categories yet. Run <code className="text-ink">npm run db:seed</code>.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/shop/${c.slug}`}
              className="border border-line bg-paper rounded-md overflow-hidden hover:bg-mist/50 transition-colors grid grid-cols-[96px_1fr]"
            >
              <div className="relative min-h-[96px] bg-mist">
                <Image src={c.image} alt="" fill className="object-cover" sizes="96px" />
              </div>
              <div className="p-4">
                <p className="font-serif text-xl">{c.name}</p>
                <p className="label mt-1">{c.subtitle}</p>
                <p className="text-sm text-mute mt-3">
                  {c._count.products} products · /shop/{c.slug}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AdminChrome>
  );
}
