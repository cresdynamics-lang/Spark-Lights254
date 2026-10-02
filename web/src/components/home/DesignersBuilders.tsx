import Link from "next/link";

const benefits = [
  {
    title: "Trade pricing",
    body: "Project rates for designers, contractors and developers.",
  },
  {
    title: "Site delivery",
    body: "Coordinated delivery to site across Nairobi and beyond.",
  },
  {
    title: "Install teams",
    body: "Our installers hang, test and leave the space tidy.",
  },
];

export function DesignersBuilders() {
  return (
    <section className="border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <p className="label text-paper/50 mb-2">Designers & builders</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 max-w-3xl">
          Specifying lights for a project? Talk to us before you order.
        </h2>
        <p className="text-paper/70 max-w-2xl mb-8">
          Bulk supply, drawings and installation for offices, hotels, restaurants and homes.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          {benefits.map((b) => (
            <div key={b.title} className="border-t border-paper/20 pt-4">
              <h3 className="font-serif text-2xl mb-2">{b.title}</h3>
              <p className="text-paper/65 text-sm leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
        <Link
          href="/request-a-quote?trade=1"
          className="inline-flex bg-paper text-ink px-5 py-3 rounded-full label tracking-[0.14em]"
        >
          Request a trade quote
        </Link>
      </div>
    </section>
  );
}
