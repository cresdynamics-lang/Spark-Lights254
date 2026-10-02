import Link from "next/link";
import { catalogFeaturedProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export async function FeaturedProducts() {
  const items = await catalogFeaturedProducts();

  return (
    <section className="border-t border-line bg-mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <p className="label mb-2 sm:mb-3">New & Popular</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink">
                Pieces to start with
              </h2>
            </div>
            <Link href="/shop/chandeliers" className="label hidden sm:inline hover:text-ink shrink-0">
              View all →
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <Link href="/shop/chandeliers" className="label inline-block mt-6 sm:hidden hover:text-ink">
          View all →
        </Link>
      </div>
    </section>
  );
}
