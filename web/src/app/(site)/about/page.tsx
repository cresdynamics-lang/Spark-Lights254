import { ClosingCTA } from "@/components/ui/ClosingCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Sparklights 254",
  description: "We make light simple and beautiful — delivered fast across Nairobi.",
};

const principles = [
  {
    n: "01",
    title: "Fast",
    body: "Same-day delivery in Nairobi, and we mean it.",
  },
  {
    n: "02",
    title: "Consistent",
    body: "The same careful service on the first order and the hundredth.",
  },
  {
    n: "03",
    title: "Considered",
    body: "We choose lights we would put in our own homes.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="label mb-4">About Sparklights 254</p>
          <h1 className="font-serif text-5xl md:text-7xl text-ink leading-tight max-w-3xl">
            We make light simple and beautiful.
          </h1>
        </div>
      </section>

      <section className="border-b border-line bg-mist">
        <div className="mx-auto max-w-3xl px-6 py-20 space-y-6 text-lg text-mute leading-relaxed">
          <p className="label text-ink">Our story</p>
          <p>
            [Founding story, one or two short paragraphs. Where the business began, why lighting,
            what drives the team.]
          </p>
          <p>
            [A second paragraph about how they choose the lights they sell — craft, finish, and how
            each piece looks when the switch is on.]
          </p>
        </div>
      </section>

      <section className="bg-paper border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-3 gap-10">
          {principles.map((p) => (
            <div key={p.n} className="border-t border-line pt-6">
              <p className="label mb-3">{p.n}</p>
              <h2 className="font-serif text-3xl mb-3">{p.title}</h2>
              <p className="text-mute leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <ClosingCTA
        title="Come and see the lights"
        body="Visit the showroom or chat with us first."
        primaryLabel="Chat on WhatsApp"
        secondaryLabel="Get directions"
      />
    </>
  );
}
