import { notFound } from "next/navigation";
import Link from "next/link";
import { guides } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import { Button, WhatsAppButton } from "@/components/ui/Button";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.summary };
}

const roomLinks = [
  {
    title: "Entrance & hallway",
    body: "A flush or pendant light that welcomes people in.",
    href: "/rooms/entrance-hallway",
    cta: "Shop Entrance & Hallway",
  },
  {
    title: "Dining room",
    body: "One focal chandelier, with wall lights for layers.",
    href: "/rooms/dining-room",
    cta: "Shop Dining Room",
  },
  {
    title: "Kitchen",
    body: "Pendants over the island and bright, even light on worktops.",
    href: "/rooms/kitchen",
    cta: "Shop Kitchen",
  },
  {
    title: "Bedrooms",
    body: "Soft ceiling light plus wall lights beside the bed.",
    href: "/rooms/bedroom",
    cta: "Shop Bedrooms",
  },
  {
    title: "Outdoor & gate",
    body: "Waterproof wall lights that look good at night.",
    href: "/shop/outdoor-solar",
    cta: "Shop Outdoor & Gate",
  },
];

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const isNewHome = slug === "lighting-a-new-home";
  const isUpgrade = slug === "upgrading-your-lighting";
  const isSize = slug === "chandelier-size-guide";
  const isWarm = slug === "warm-vs-cool-white";

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides/lighting-a-new-home" },
              { label: guide.title },
            ]}
          />
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight mb-4 max-w-3xl">
            {guide.title}
          </h1>
          <p className="text-mute text-lg max-w-2xl leading-relaxed">{guide.summary}</p>
        </div>
      </section>

      {(isNewHome || isUpgrade) && (
        <section className="border-b border-line bg-mist">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="label mb-3">The process</p>
            <h2 className="font-serif text-4xl mb-12">
              {isNewHome ? "From bare walls to lit rooms" : "From tired to transformed"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {(isNewHome
                ? [
                    ["01", "Plan", "Decide where each fixture sits before the ceiling and wiring are finished."],
                    ["02", "Choose", "Pick your fixtures with us in person, on WhatsApp or from your floor plan."],
                    ["03", "Order", "We reserve and deliver your lights when the site is ready."],
                    ["04", "Install", "Our team fits and tests everything."],
                  ]
                : [
                    ["01", "Audit", "Photo the rooms and note what feels dull, harsh or missing."],
                    ["02", "Replace the hero", "Swap the main ceiling light first — biggest visual change."],
                    ["03", "Add layers", "Wall lights and lamps soften corners and evenings."],
                    ["04", "Install", "We deliver and fit so the refresh is done in a day."],
                  ]
              ).map(([n, t, b]) => (
                <div key={n} className="border-t border-line pt-6">
                  <p className="label mb-3">{n}</p>
                  <h3 className="font-serif text-2xl mb-3">{t}</h3>
                  <p className="text-mute leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {isNewHome && (
        <section className="bg-paper border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <h2 className="font-serif text-4xl mb-10">Room by room</h2>
            <div className="divide-y divide-line border-y border-line">
              {roomLinks.map((r) => (
                <div
                  key={r.href}
                  className="py-8 grid md:grid-cols-[1fr_1.2fr_auto] gap-4 md:gap-8 items-center"
                >
                  <h3 className="font-serif text-2xl">{r.title}</h3>
                  <p className="text-mute">{r.body}</p>
                  <Link href={r.href} className="label hover:text-ink whitespace-nowrap">
                    {r.cta} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {isSize && (
        <section className="bg-mist border-b border-line">
          <div className="mx-auto max-w-3xl px-6 py-20 space-y-8">
            <div className="border border-line bg-paper p-8">
              <h2 className="font-serif text-3xl mb-4">Diameter</h2>
              <p className="text-mute leading-relaxed">
                Add the room&apos;s length and width in feet. That number in inches is a good
                chandelier diameter.
              </p>
            </div>
            <div className="border border-line bg-paper p-8">
              <h2 className="font-serif text-3xl mb-4">Above the table</h2>
              <p className="text-mute leading-relaxed">
                Hang roughly 75 to 90 cm above the tabletop. Leave at least 2.1 m clear below hanging
                lights in open spaces.
              </p>
            </div>
            <Button href="/shop/chandeliers" variant="secondary">
              Browse chandeliers
            </Button>
          </div>
        </section>
      )}

      {isWarm && (
        <section className="bg-mist border-b border-line">
          <div className="mx-auto max-w-3xl px-6 py-20 space-y-6 text-mute leading-relaxed text-lg">
            <p>
              <strong className="text-ink">Warm white (2700–3000K)</strong> feels inviting — best for
              dining rooms, bedrooms and living rooms.
            </p>
            <p>
              <strong className="text-ink">Cool white (4000K+)</strong> feels sharper — use sparingly,
              usually in task areas if needed.
            </p>
            <p>When unsure, choose warm. Most Sparklights pieces ship with a warm character.</p>
          </div>
        </section>
      )}

      {isUpgrade && (
        <section className="bg-paper border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-6">
            {[
              ["Shop ceiling lights", "/shop/ceiling-lights"],
              ["Shop wall lights", "/shop/wall-lights"],
              ["Signature pieces", "/signature"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="border border-line p-8 hover:bg-mist transition-colors font-serif text-2xl"
              >
                {label} →
              </Link>
            ))}
          </div>
        </section>
      )}

      <ClosingCTA
        title={
          isNewHome
            ? "Building? Send us your floor plan."
            : "Tell us about your room. We'll suggest the light."
        }
        body={
          isNewHome
            ? "We will suggest fixtures for every room and quote delivery and installation together."
            : "Send a photo and the room size on WhatsApp. We reply with options and prices."
        }
        primaryLabel={isNewHome ? "Send floor plan on WhatsApp" : "Order on WhatsApp"}
        secondaryLabel={isNewHome ? "Book a showroom visit" : "Send a photo of your room"}
      />

      {isNewHome ? (
        <div className="sr-only">
          <WhatsAppButton label="Book showroom" />
        </div>
      ) : null}
    </>
  );
}
