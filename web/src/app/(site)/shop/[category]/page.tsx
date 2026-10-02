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
  return {
    title: `${cat.name} in Nairobi`,
    description: cat.description,
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

  const faqs = [
    {
      q: `How much does a ${cat.name.toLowerCase().replace(/s$/, "")} cost in Nairobi?`,
      a: `Our ${cat.name.toLowerCase()} start from the prices shown below depending on size, crystal and finish.`,
    },
    {
      q: `Do you install ${cat.name.toLowerCase()}?`,
      a: "Yes. Installation is quoted by site and completed by our team.",
    },
    {
      q: "How long will delivery take?",
      a: "Same-day across Nairobi when ordered before [time]. Countrywide on request.",
    },
    {
      q: "What size suits my room?",
      a: "Send a photo and measurements on WhatsApp — we’ll confirm before you buy.",
    },
    {
      q: "Are the bulbs included?",
      a: "It depends on the fixture. Each product page lists the light source; ask us if unsure.",
    },
  ];

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 md:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: cat.name }]} />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink leading-tight mb-3 sm:mb-4">
            {cat.name} in Nairobi
          </h1>
          <p className="text-mute text-base sm:text-lg max-w-2xl leading-relaxed">
            {cat.description}
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
              How to choose the right {cat.name.toLowerCase().replace(/s$/, "")}
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
                <span className="font-serif text-base sm:text-xl">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA
        title={`Not sure which ${cat.name.toLowerCase().replace(/s$/, "")} fits?`}
        body="Send a photo of the room and the ceiling height. We will recommend a size and style."
      />
    </>
  );
}
