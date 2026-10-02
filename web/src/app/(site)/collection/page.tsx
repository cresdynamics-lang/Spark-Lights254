import Link from "next/link";
import Image from "next/image";
import { STYLE_COLLECTIONS, productsByStyle } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import { seoMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/components/seo/JsonLd";

export async function generateMetadata() {
  return seoMetadata("/collection");
}

export default function CollectionIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Collection", path: "/collection" },
          ]),
          collectionPageSchema({
            name: "Lighting collection",
            description: "Shop Sparklights by style — crystal, gold & brass, black, natural and glowing.",
            path: "/collection",
            items: STYLE_COLLECTIONS.map((s) => ({
              name: s.name,
              path: `/collection/${s.slug}`,
            })),
          }),
        ]}
      />
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 md:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collection" }]} />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink leading-tight mb-3 sm:mb-4">
            Explore the collection
          </h1>
          <p className="text-mute text-base sm:text-lg max-w-2xl leading-relaxed">
            Start with the look you already know — then open the fixtures that match.
          </p>
        </div>
      </section>
      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {STYLE_COLLECTIONS.map((s) => {
            const count = productsByStyle(s.slug).length;
            return (
              <Link
                key={s.slug}
                href={`/collection/${s.slug}`}
                className="group relative aspect-[4/5] border border-line rounded-md overflow-hidden bg-paper"
              >
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width:640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="label text-paper/70 mb-1">{count} pieces</p>
                  <h2 className="font-serif text-3xl text-paper leading-none">{s.name}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
