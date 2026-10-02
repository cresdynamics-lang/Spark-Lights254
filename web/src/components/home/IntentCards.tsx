import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const intents = [
  {
    title: "Upgrading a room",
    cta: "Upgrade ideas",
    href: "/guides/upgrading-your-lighting",
  },
  {
    title: "Building a new home",
    cta: "New home guide",
    href: "/guides/lighting-a-new-home",
  },
  {
    title: "Looking for luxury",
    cta: "Signature collection",
    href: "/signature",
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
        {/* Keep 3 columns even on small phones */}
        <div className="grid grid-cols-3 gap-px bg-line border border-line">
          {intents.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-paper p-3 sm:p-8 md:p-10 hover:bg-mist transition-colors duration-500 group min-h-[140px] sm:min-h-[220px] flex flex-col justify-between"
            >
              <h3 className="font-serif text-sm sm:text-2xl md:text-3xl text-ink leading-snug">
                {item.title}
              </h3>
              <span className="label text-ink mt-4 sm:mt-8 text-[0.55rem] sm:text-[0.6875rem] tracking-[0.1em] sm:tracking-[0.16em] group-hover:tracking-[0.18em] transition-all duration-500">
                {item.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
