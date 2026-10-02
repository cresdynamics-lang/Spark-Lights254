import { QuoteForm } from "@/components/quote/QuoteForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FAQ } from "@/components/ui/FAQ";
import { Button } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Lighting Quote | Offices, Venues & Trade",
  description:
    "Offices, hotels, restaurants, designers and contractors: tell us about the space and we reply with a plan and a price.",
};

export default function RequestQuotePage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Request a quote" }]} />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink leading-tight mb-4 max-w-3xl">
            Quotes for offices, venues and trade.
          </h1>
          <p className="text-mute text-lg max-w-2xl">
            Tell us about the space. We reply with a plan and a clear price.
          </p>
        </div>
      </section>

      <section className="bg-mist border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 grid lg:grid-cols-2 gap-10">
          <div className="border border-line bg-paper p-6 sm:p-8 rounded-md">
            <p className="label mb-4">Tell us about it</p>
            <h2 className="font-serif text-2xl mb-6">Project details</h2>
            <QuoteForm />
          </div>
          <div className="space-y-8">
            <div>
              <p className="label mb-4">What happens next</p>
              <ol className="space-y-4">
                {[
                  ["1", "We reply", "Within [one working day] on WhatsApp or phone."],
                  ["2", "We plan", "A fixture plan and options."],
                  ["3", "We quote", "Supply and installation priced clearly."],
                  ["4", "We deliver", "To your schedule, countrywide."],
                ].map(([n, t, b]) => (
                  <li key={n} className="border-t border-line pt-4">
                    <p className="label mb-1">{n}</p>
                    <p className="font-serif text-xl mb-1">{t}</p>
                    <p className="text-mute text-sm">{b}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="border border-line bg-paper p-6 rounded-md">
              <h3 className="font-serif text-2xl mb-2">Trade programme</h3>
              <p className="text-mute text-sm mb-4 leading-relaxed">
                For interior designers, architects and contractors: trade pricing, samples and site
                support.
              </p>
              <Button
                href={whatsappUrl(
                  "Hi Sparklights — I’d like to apply for trade access as a designer/contractor."
                )}
                external
              >
                Apply for trade access
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FAQ
        items={[
          { q: "How fast do you reply?", a: "[Confirm]. We aim for one working day." },
          { q: "Is the quote free?", a: "Yes — the quote is free." },
          { q: "Do you work with designers?", a: "Yes. Apply for trade access above." },
          { q: "Can you supply outside Nairobi?", a: "Yes, countrywide on request." },
        ]}
        eyebrow="Quote FAQ"
        title="Before you send"
      />
    </>
  );
}
