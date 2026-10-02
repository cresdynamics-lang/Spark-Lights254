import Link from "next/link";
import { newArrivalProducts, products } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { seoMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/components/seo/JsonLd";

export async function generateMetadata() {
  return seoMetadata("/new-arrivals");
}

export default function NewArrivalsPage() {
  const arrivals = newArrivalProducts();
  const items =
    arrivals.length > 0
      ? arrivals
      : products.filter((p) => p.badge === "New").slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "New arrivals", path: "/new-arrivals" },
          ]),
          collectionPageSchema({
            name: "New arrivals",
            description: "Newly arrived lights at Sparklights 254, Nairobi.",
            path: "/new-arrivals",
            items: items.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
          }),
        ]}
      />
      <section className="bg-paper border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "New arrivals" }]} />
          <p className="label mb-3">Just in</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink leading-tight max-w-3xl mb-4">
            New arrivals
          </h1>
          <p className="text-mute text-base sm:text-lg max-w-xl leading-relaxed mb-6">
            Fresh pieces for dining rooms, bedrooms and feature walls — newly stocked in Nairobi.
          </p>
          <Link href="/sale" className="label border-b border-ink/30 pb-1">
            Shop best sellers on sale →
          </Link>
        </div>
      </section>

      <section className="bg-mist border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <p className="label mb-6">{items.length} new pieces</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} badgeOverride="New" />
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA
        title="See something new you like?"
        body="Message us on WhatsApp with the product name — we confirm stock and delivery."
      />
    </>
  );
}
