import { notFound, redirect } from "next/navigation";
import { getRoom, productsByRoom, products } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/ui/ProductCard";
import { FAQ } from "@/components/ui/FAQ";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo";
import { getInventoryByPath } from "@/lib/seo-inventory";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/components/seo/JsonLd";

const ROOM_ALIASES: Record<string, string> = {
  "bedroom-lights": "bedroom",
  "kitchen-lights": "kitchen",
  "bathroom-lights": "bathroom-mirror",
};

const REDIRECTS: Record<string, string> = {
  chandeliers: "/shop/chandeliers",
  "wall-lights": "/shop/wall-lights",
  "ceiling-lights": "/shop/ceiling-lights",
  "pendant-lights": "/shop/pendant-lights",
  "all-lights": "/shop/chandeliers",
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...Object.keys(ROOM_ALIASES).map((slug) => ({ slug })),
    ...Object.keys(REDIRECTS).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return seoMetadata(`/category/${slug}`);
}

export default async function CategoryAliasPage({ params }: Props) {
  const { slug } = await params;

  const redirectTo = REDIRECTS[slug];
  if (redirectTo) redirect(redirectTo);

  const roomSlug = ROOM_ALIASES[slug];
  if (!roomSlug) notFound();

  const seo = getInventoryByPath(`/category/${slug}`);
  const r = getRoom(roomSlug);
  if (!r) notFound();

  const items =
    productsByRoom(roomSlug).length > 0
      ? productsByRoom(roomSlug).slice(0, 8)
      : products.slice(0, 4);

  const h1 = seo?.h1 ?? r.headline;
  const description = seo?.description ?? r.description;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: h1, path: `/category/${slug}` },
          ]),
          collectionPageSchema({
            name: h1,
            description,
            path: `/category/${slug}`,
            items: items.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
          }),
        ]}
      />
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop/chandeliers" },
              { label: r.name },
            ]}
          />
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight mb-4 max-w-3xl">
            {h1}
          </h1>
          <p className="text-mute text-lg max-w-2xl leading-relaxed">{description}</p>
        </div>
      </section>

      {r.chooseBy?.length ? (
        <section className="border-b border-line bg-mist">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <p className="label mb-3">Start here</p>
            <h2 className="font-serif text-4xl mb-10">Choose by your space</h2>
            <div className="grid md:grid-cols-3 gap-px bg-line border border-line">
              {r.chooseBy.map((c) => (
                <div key={c.title} className="bg-paper p-8">
                  <h3 className="font-serif text-2xl mb-3">{c.title}</h3>
                  <p className="text-mute leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-paper border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="font-serif text-3xl md:text-4xl mb-10">{r.name} favourites</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <FAQ items={r.faqs} eyebrow={`${r.name} FAQ`} title="Questions we hear" />

      <ClosingCTA
        title={`Need the right light for your ${r.name.toLowerCase()}?`}
        body="Send a photo and the room size on WhatsApp. We reply with options and prices."
      />
    </>
  );
}
