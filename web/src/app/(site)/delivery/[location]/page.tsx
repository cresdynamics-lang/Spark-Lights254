import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { locations, products } from "@/lib/data";
import { SITE, whatsappUrl } from "@/lib/constants";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/ui/ProductCard";
import { FAQ } from "@/components/ui/FAQ";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

type Props = { params: Promise<{ location: string }> };

export async function generateStaticParams() {
  return locations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const loc = locations.find((l) => l.slug === location);
  if (!loc) return {};
  return {
    title: `Lighting Delivery & Installation in ${loc.name}`,
    description: loc.blurb,
  };
}

export default async function LocationPage({ params }: Props) {
  const { location } = await params;
  const loc = locations.find((l) => l.slug === location);
  if (!loc) notFound();

  const others = locations.filter((l) => l.slug !== loc.slug);
  const recs = products.filter((p) =>
    ["ceiling-lights", "wall-lights"].includes(p.category)
  ).slice(0, 2);

  const faqs = [
    {
      q: `Do you deliver to ${loc.name} on the same day?`,
      a: `Yes, when you order before [time] — confirm on WhatsApp for today’s route.`,
    },
    {
      q: "Do you install in apartments?",
      a: "Yes. We install across apartments and townhouses in this area.",
    },
    {
      q: "Can I see the lights before I buy?",
      a: "Visit the showroom or request photos and video on WhatsApp.",
    },
  ];

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Delivery", href: "/delivery" },
              { label: loc.name },
            ]}
          />
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight mb-4 max-w-3xl">
            Lighting Delivery & Installation in {loc.name}
          </h1>
          <p className="text-mute text-lg max-w-2xl leading-relaxed">{loc.blurb}</p>
        </div>
      </section>

      <section className="border-b border-line bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            ["Same-day delivery", "Order before [time] and receive today."],
            ["Installation", "Quoted by site, scheduled with you."],
            ["Delivery window", loc.window],
            ["Easy ordering", "Chat, choose and pay by M-Pesa."],
          ].map(([t, b]) => (
            <div key={t} className="border border-line bg-paper p-6">
              <h3 className="font-serif text-xl mb-2">{t}</h3>
              <p className="text-mute text-sm leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="label mb-3">Our work in {loc.name}</p>
          <h2 className="font-serif text-4xl mb-8">Lights we&apos;ve delivered nearby</h2>
          <div className="relative aspect-[16/9] max-w-3xl border border-line overflow-hidden bg-mist">
            <Image
              src="/images/products/roomm3.png"
              alt={`Project in ${loc.name}`}
              fill
              className="object-cover"
            />
          </div>
          <p className="label mt-4">
            Project name · {loc.name} · Trefoil Pendant
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="label mb-3">Popular in {loc.name}</p>
            <h2 className="font-serif text-4xl mb-5">Made for apartments and townhouses</h2>
            <p className="text-mute text-lg leading-relaxed mb-6">{loc.homes}</p>
            <Link href="/shop/ceiling-lights" className="label border-b border-ink/30 pb-1">
              Shop ceiling lights →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {recs.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-10">
          <div className="border border-line p-8">
            <p className="label mb-4">Visit or call</p>
            <h3 className="font-serif text-3xl mb-4">{SITE.fullName}</h3>
            <ul className="space-y-2 text-mute mb-6">
              <li>{SITE.address}</li>
              <li>Nairobi, Kenya</li>
              <li>{SITE.phoneDisplay}</li>
              <li>{SITE.hours}</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" variant="secondary">
                Get directions
              </Button>
              <Button href={whatsappUrl()} external>
                WhatsApp
              </Button>
            </div>
          </div>
          <div>
            <p className="label mb-4">We also deliver to</p>
            <div className="flex flex-wrap gap-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/delivery/${o.slug}`}
                  className="label border border-line px-4 py-2 hover:border-ink"
                >
                  {o.name}
                </Link>
              ))}
            </div>
            <div className="relative mt-8 aspect-[16/9] border border-line overflow-hidden rounded-md">
              <Image
                src="/images/products/Screenshot_20251008_135721_1.jpg"
                alt={`Lighting delivered in ${loc.name}`}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <p className="absolute bottom-3 left-3 label text-paper drop-shadow">
                Delivered in {loc.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={faqs} eyebrow={`${loc.name} FAQ`} title="Local questions" />
      <ClosingCTA
        title={`Order for ${loc.name} today`}
        body="Tell us what you need. We'll confirm delivery time on WhatsApp."
      />
    </>
  );
}
