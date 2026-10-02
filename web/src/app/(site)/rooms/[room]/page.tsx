import { notFound } from "next/navigation";
import { rooms, getRoom, productsByRoom, products } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/ui/ProductCard";
import { FAQ } from "@/components/ui/FAQ";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import type { Metadata } from "next";

type Props = { params: Promise<{ room: string }> };

export async function generateStaticParams() {
  return rooms.map((r) => ({ room: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { room } = await params;
  const r = getRoom(room);
  if (!r) return {};
  return { title: r.headline, description: r.description };
}

export default async function RoomPage({ params }: Props) {
  const { room } = await params;
  const r = getRoom(room);
  if (!r) notFound();

  const items =
    productsByRoom(room).length > 0 ? productsByRoom(room).slice(0, 8) : products.slice(0, 4);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Rooms", href: "/rooms/dining-room" },
              { label: r.name },
            ]}
          />
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight mb-4 max-w-3xl">
            {r.headline}
          </h1>
          <p className="text-mute text-lg max-w-2xl leading-relaxed">{r.description}</p>
        </div>
      </section>

      {r.chooseBy?.length ? (
        <section className="border-b border-line bg-mist">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <p className="label mb-3">Start here</p>
            <h2 className="font-serif text-4xl mb-10">Choose by your table</h2>
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

      <section className="bg-mist border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="label mb-3">Designer notes</p>
          <h2 className="font-serif text-4xl mb-12">
            Four things that make a {r.name.toLowerCase()} work
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {r.tips.map((t, i) => (
              <div key={t.title} className="border-t border-line pt-6">
                <p className="label mb-3">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-serif text-2xl mb-3">{t.title}</h3>
                <p className="text-mute leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={r.faqs} eyebrow={`${r.name} FAQ`} title="Common questions" />

      <ClosingCTA
        title={`See it in your ${r.name.toLowerCase()}`}
        body="Send a photo of the space. We will suggest the right piece and size."
      />
    </>
  );
}
