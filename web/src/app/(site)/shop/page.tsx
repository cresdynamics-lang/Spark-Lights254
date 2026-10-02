import { catalogProducts } from "@/lib/catalog";
import { ShopAllClient } from "@/components/shop/ShopAllClient";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import { seoMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return seoMetadata("/shop");
}

export default async function ShopAllPage() {
  const products = await catalogProducts();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
          ]),
          collectionPageSchema({
            name: "Shop all lighting",
            description: "Browse every chandelier, wall light, ceiling light and pendant at Sparklights 254.",
            path: "/shop",
            items: products.slice(0, 24).map((p) => ({
              name: p.name,
              path: `/products/${p.slug}`,
            })),
          }),
        ]}
      />
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 md:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink leading-tight mb-3 sm:mb-4">
            Shop all lighting
          </h1>
          <p className="text-mute text-base sm:text-lg max-w-2xl leading-relaxed">
            Every piece from every category — search by name, style or room to find what fits.
          </p>
        </div>
      </section>

      <section className="bg-mist border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
          <ShopAllClient products={products} />
        </div>
      </section>

      <ClosingCTA
        title="Not sure which light?"
        body="Send a room photo on WhatsApp — we’ll shortlist options with prices."
      />
    </>
  );
}
