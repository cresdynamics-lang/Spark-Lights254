import { notFound } from "next/navigation";
import Link from "next/link";
import {
  STYLE_COLLECTIONS,
  getStyleCollection,
  productsByStyle,
} from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/ui/ProductCard";
import { FAQ } from "@/components/ui/FAQ";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ style: string }> };

export function generateStaticParams() {
  return STYLE_COLLECTIONS.map((s) => ({ style: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { style } = await params;
  return seoMetadata(`/collection/${style}`);
}

export default async function StyleCollectionPage({ params }: Props) {
  const { style } = await params;
  const collection = getStyleCollection(style);
  if (!collection) notFound();

  const items = productsByStyle(style);
  const others = STYLE_COLLECTIONS.filter((s) => s.slug !== style);

  const faqs = [
    {
      q: `What is ${collection.name.toLowerCase()} lighting best for?`,
      a: collection.description,
    },
    {
      q: "Do you deliver across Nairobi?",
      a: "Yes — same-day across Kilimani, Kileleshwa, Gigiri and more when ordered in time. Installation available.",
    },
    {
      q: "Can I see them before I buy?",
      a: "Visit the showroom on Duruma Road, or send a photo of your room on WhatsApp for recommendations.",
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Collection", path: "/collection" },
            { name: collection.name, path: `/collection/${style}` },
          ]),
          collectionPageSchema({
            name: collection.headline,
            description: collection.description,
            path: `/collection/${style}`,
            items: items.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
          }),
        ]}
      />
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 md:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Collection", href: "/collection" },
              { label: collection.name },
            ]}
          />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink leading-tight mb-3 sm:mb-4">
            {collection.headline}
          </h1>
          <p className="text-mute text-base sm:text-lg max-w-2xl leading-relaxed">
            {collection.description}
          </p>
          <p className="label mt-4">{items.length} products</p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
          {items.length ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {items.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-mute">
              PLACEHOLDER — more {collection.name.toLowerCase()} pieces are being photographed.
              Message us on WhatsApp for current stock.
            </p>
          )}
        </div>
      </section>

      <section className="border-t border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
          <p className="label mb-4">Other looks</p>
          <div className="flex flex-wrap gap-2">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/collection/${s.slug}`}
                className="label border border-line bg-paper px-4 py-2 rounded-full hover:bg-mist"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} />
      <ClosingCTA />
    </>
  );
}
