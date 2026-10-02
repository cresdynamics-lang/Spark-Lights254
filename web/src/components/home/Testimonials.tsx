import { testimonials } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section className="border-t border-line bg-mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <Reveal>
          <p className="label mb-2 sm:mb-3">Client words</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink mb-8 sm:mb-12">
            Trusted across Nairobi
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {testimonials.map((t) => (
            <blockquote
              key={t.name + t.area}
              className="border border-line bg-paper p-5 sm:p-8 flex flex-col justify-between min-h-[200px] sm:min-h-[260px] rounded-md"
            >
              <p className="font-serif text-xl sm:text-2xl leading-snug text-ink">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 sm:mt-8">
                <p className="text-sm text-ink">{t.name}</p>
                <p className="label mt-1">{t.area}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
