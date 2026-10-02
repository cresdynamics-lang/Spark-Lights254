import Link from "next/link";
import { saleProducts, products } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { seoMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/components/seo/JsonLd";

export async function generateMetadata() {
  return seoMetadata("/sale");
}

export default function SalePage() {
  const bestsellers = saleProducts();
  const items =
    bestsellers.length > 0
      ? bestsellers
      : products.filter((p) => p.badge === "Popular" || p.signature).slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sale", path: "/sale" },
          ]),
          collectionPageSchema({
            name: "Sale — best sellers",
            description: "Best-selling lights on sale at Sparklights 254, Nairobi.",
            path: "/sale",
            items: items.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
          }),
        ]}
      />
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Sale" }]}
            light
          />
          <p className="label text-paper/50 mb-3">Sale · Best sellers</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight max-w-3xl mb-4">
            Best sellers, ready to order.
          </h1>
          <p className="text-paper/70 text-base sm:text-lg max-w-xl leading-relaxed mb-6">
            Our most-ordered lights across Nairobi — fast to pick, fast to deliver.
          </p>
          <Link
            href="/new-arrivals"
            className="label text-paper/80 border-b border-paper/30 pb-1 hover:text-paper"
          >
            See new arrivals →
          </Link>
        </div>
      </section>

      <section className="bg-paper border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <p className="label mb-6">{items.length} best sellers</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} badgeOverride="Sale" />
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA
        title="Want a best seller for your room?"
        body="Send a photo on WhatsApp — we’ll confirm size and delivery today."
      />
    </>
  );
}
