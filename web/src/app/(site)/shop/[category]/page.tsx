import { notFound } from "next/navigation";
import Link from "next/link";
import { categories as staticCategories } from "@/lib/data";
import {
  catalogCategories,
  catalogCategory,
  catalogProductsByCategory,
} from "@/lib/catalog";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FAQ } from "@/components/ui/FAQ";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import { CategoryProductGrid } from "@/components/shop/CategoryProductGrid";
import { JsonLd, breadcrumbSchema, collectionPageSchema, faqPageSchema } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

type Props = { params: Promise<{ category: string }> };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return staticCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = await catalogCategory(category);
  if (!cat) return {};
  const title = `${cat.name} in Nairobi | Sparklights 254`.slice(0, 60);
  const description = (
    cat.description || `Shop ${cat.name} in Nairobi with delivery and installation.`
  ).slice(0, 155);
  const url = `${SITE.url}/shop/${cat.slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.fullName,
      locale: "en_KE",
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = await catalogCategory(category);
  if (!cat) notFound();

  const [items, allCategories] = await Promise.all([
    catalogProductsByCategory(category),
    catalogCategories(),
  ]);

  const related = allCategories.filter((c) => c.slug !== category).slice(0, 4);
  const singular = cat.name.toLowerCase().replace(/s$/, "");

  const faqs = [
    {
      q: `How much does a ${singular} cost in Nairobi?`,
      a: `Sparklights ${cat.name.toLowerCase()} are priced on each product card. Ranges depend on size, material and finish — WhatsApp us with a room photo for a shortlist in your budget.`,
    },
    {
      q: `Do you install ${cat.name.toLowerCase()}?`,
      a: "Yes. Our team delivers, installs and tests before we leave. Installation is quoted by site.",
    },
    {
      q: "How long will delivery take?",
      a: "Same-day across much of Nairobi when ordered early enough and stock is ready. Countrywide delivery on request.",
    },
    {
      q: "What size suits my room?",
      a: "Send a photo and measurements on WhatsApp — we confirm size before you buy.",
    },
    {
      q: "Are the bulbs included?",
      a: "It depends on the fixture. Each product page lists the light source; ask us if unsure.",
    },
  ];

  const faqLd = faqPageSchema(faqs);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: cat.name, path: `/shop/${cat.slug}` },
          ]),
          collectionPageSchema({
            name: `${cat.name} in Nairobi`,
            description: cat.description,
            path: `/shop/${cat.slug}`,
            items: items.slice(0, 24).map((p) => ({
              name: p.name,
              path: `/products/${p.slug}`,
            })),
          }),
          ...(faqLd ? [faqLd] : []),
        ]}
      />
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 md:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: cat.name },
            ]}
          />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink leading-tight mb-3 sm:mb-4">
            {cat.name} in Nairobi
          </h1>
          <p className="text-mute text-base sm:text-lg max-w-2xl leading-relaxed">
            {cat.description}
          </p>
          <p className="text-mute text-sm mt-3 max-w-2xl">
            Sparklights 254 supplies and installs {cat.name.toLowerCase()} across Nairobi and Kenya —
            WhatsApp {SITE.whatsappDisplay} for sizing help.
          </p>
          <p className="label mt-4">{items.length} products</p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
          <CategoryProductGrid products={items} />
        </div>
      </section>

      <section className="border-t border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <p className="label mb-3">Buying guide</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight mb-4 sm:mb-5">
              How to choose the right {singular}
            </h2>
            <p className="text-mute text-base sm:text-lg leading-relaxed mb-4">
              A piece that is too small looks lost. One that is too big takes over the room. Here is
              the quick way to get it right.
            </p>
            <p className="text-mute leading-relaxed">
              Send us your room photo on WhatsApp and we will confirm the size before you buy.
            </p>
          </div>
          <div className="border border-line bg-paper rounded-md overflow-hidden">
            <div className="grid grid-cols-[1fr_1.4fr] label border-b border-line px-4 sm:px-5 py-3">
              <span>Question</span>
              <span>Simple rule</span>
            </div>
            {[
              [
                "Width of the fixture",
                "Add the room’s length and width in feet. That number in inches is a good diameter.",
              ],
              ["Height above a dining table", "Roughly 75 to 90 cm above the tabletop."],
              [
                "Ceiling height",
                "Leave at least 2.1 m of clear space below any hanging light.",
              ],
              [
                "Bulb colour",
                "Warm white (around 2700 – 3000K) for dining rooms and bedrooms.",
              ],
            ].map(([q, a]) => (
              <div
                key={q}
                className="grid grid-cols-1 sm:grid-cols-[1fr_1.4fr] gap-2 sm:gap-4 px-4 sm:px-5 py-4 sm:py-5 border-b border-line last:border-0"
              >
                <p className="text-sm font-medium text-ink">{q}</p>
                <p className="text-sm text-mute leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} eyebrow={`${cat.name} FAQ`} title="Before you buy" />

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <p className="label mb-6">Continue exploring</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                className="border border-line p-4 sm:p-6 hover:bg-mist transition-colors rounded-md"
              >
                <p className="font-serif text-xl sm:text-2xl text-ink">{c.name}</p>
                <p className="label mt-2">Shop →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA
        title={`Not sure which ${singular} fits?`}
        body="Send a photo of the room and the ceiling height. We will recommend a size and style."
      />
    </>
  );
}
