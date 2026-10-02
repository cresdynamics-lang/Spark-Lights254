import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    n: "1",
    title: "Choose on WhatsApp",
    body: "Send us the product or a photo of your space.",
  },
  {
    n: "2",
    title: "We deliver",
    body: "Same-day across Nairobi. Countrywide delivery on request.",
  },
  {
    n: "3",
    title: "We install and test",
    body: "A tidy fit by our team, checked before we leave.",
  },
];

export function DeliverySection() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <Reveal>
          <div className="max-w-2xl mb-10 sm:mb-14">
            <p className="label mb-2 sm:mb-3">Delivery & Installation</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight mb-3 sm:mb-4">
              Delivered fast. Installed properly.
            </h2>
            <p className="text-mute text-base sm:text-lg leading-relaxed">
              We know a beautiful light is wasted if it arrives late or hangs crooked.
            </p>
          </div>
        </Reveal>
        {/* Keep three columns on phones like intent cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-8 md:gap-12 mb-8 sm:mb-10">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-line pt-4 sm:pt-6">
              <p className="label mb-2 sm:mb-3">{s.n}</p>
              <h3 className="font-serif text-sm sm:text-2xl mb-1.5 sm:mb-2 leading-snug">
                {s.title}
              </h3>
              <p className="text-mute text-xs sm:text-base leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <Link href="/delivery" className="label border-b border-ink/30 pb-1 hover:border-ink">
          Delivery & Installation details →
        </Link>
      </div>
    </section>
  );
}
