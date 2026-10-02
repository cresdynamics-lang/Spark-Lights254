import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholder-images";

const intents = [
  {
    title: "Upgrading a room",
    cta: "Upgrade ideas",
    href: "/guides/upgrading-your-lighting",
    image: PLACEHOLDER_IMAGES.wall,
  },
  {
    title: "Building a new home",
    cta: "New home guide",
    href: "/guides/lighting-a-new-home",
    image: PLACEHOLDER_IMAGES.room,
  },
  {
    title: "Looking for luxury",
    cta: "Signature collection",
    href: "/signature",
    image: PLACEHOLDER_IMAGES.dining,
  },
];

export function IntentCards() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <Reveal>
          <div className="max-w-2xl mb-8 sm:mb-12">
            <p className="label mb-2 sm:mb-3">Where are you starting?</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight mb-3 sm:mb-4">
              Find the light that fits your moment
            </h2>
            <p className="text-mute text-sm sm:text-lg leading-relaxed">
              Three ways people come to us. Pick yours and we&apos;ll show you where to begin.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {intents.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative overflow-hidden border border-line rounded-md min-h-[220px] sm:min-h-[280px] flex flex-col justify-end"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width:640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/35 to-ink/10" />
              <div className="relative p-5 sm:p-8">
                <h3 className="font-serif text-2xl sm:text-3xl text-paper leading-snug mb-3">
                  {item.title}
                </h3>
                <span className="label text-paper/80 tracking-[0.14em]">
                  {item.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
