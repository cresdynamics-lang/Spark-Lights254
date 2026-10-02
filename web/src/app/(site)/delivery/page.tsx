import Link from "next/link";
import { locations } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FAQ } from "@/components/ui/FAQ";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import { Button } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery & Installation",
  description:
    "Same-day delivery across Nairobi, countrywide shipping and careful installation by the Sparklights team.",
};

const steps = [
  {
    n: "1",
    title: "Tell us what you want",
    body: "Choose on the site or WhatsApp. Send a photo if you need advice.",
  },
  {
    n: "2",
    title: "Confirm and pay",
    body: "We confirm price, delivery time and installation. Pay by M-Pesa, card or bank.",
  },
  {
    n: "3",
    title: "We deliver",
    body: "Same day in Nairobi when ordered before [time]. Countrywide on request.",
  },
  {
    n: "4",
    title: "We install and test",
    body: "Our team fits the light, checks it and tidies up.",
  },
];

const installList = [
  "Chandeliers and large pendants",
  "Ceiling and flush lights",
  "Wall lights and picture lights",
  "Gypsum ceiling fixtures",
  "Outdoor and gate lights",
];

const faqs = [
  {
    q: "How fast is delivery in Nairobi?",
    a: "Same day when you order before [time].",
  },
  {
    q: "Do you deliver outside Nairobi?",
    a: "Yes — countrywide via courier. Timing depends on the route.",
  },
  {
    q: "What does installation cost?",
    a: "Quoted by site depending on fixture type and access. Ask on WhatsApp for an estimate.",
  },
  {
    q: "What if my light arrives damaged?",
    a: "Send photos immediately. We replace damaged goods under our Returns policy.",
  },
];

export default function DeliveryPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Delivery & Installation" },
            ]}
          />
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight mb-4">
            Delivered fast. Installed properly.
          </h1>
          <p className="text-mute text-lg max-w-2xl leading-relaxed">
            Same-day delivery across Nairobi, countrywide shipping and a careful installation
            service. The part of the job most shops leave to you.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="label mb-3">How it works</p>
          <h2 className="font-serif text-4xl mb-12">Four simple steps</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-line pt-6">
                <p className="label mb-3">{s.n}</p>
                <h3 className="font-serif text-2xl mb-3">{s.title}</h3>
                <p className="text-mute leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="label mb-3">Where we deliver</p>
          <h2 className="font-serif text-4xl mb-4">Across Nairobi and all of Kenya</h2>
          <p className="text-mute mb-10">Tap an area to see local details.</p>
          <div className="border border-line overflow-hidden">
            <div className="grid grid-cols-3 label bg-mist px-5 py-3 border-b border-line">
              <span>Area</span>
              <span>Delivery</span>
              <span>Installation</span>
            </div>
            {locations.map((l) => (
              <Link
                key={l.slug}
                href={`/delivery/${l.slug}`}
                className="grid grid-cols-3 px-5 py-4 border-b border-line last:border-0 hover:bg-mist transition-colors"
              >
                <span className="text-ink">{l.name}</span>
                <span className="text-mute">{l.delivery}</span>
                <span className="text-mute">Available</span>
              </Link>
            ))}
            <div className="grid grid-cols-3 px-5 py-4 bg-paper">
              <span>Other counties</span>
              <span className="text-mute">Via courier · [timing]</span>
              <span className="text-mute">On request</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="label mb-3">Installation</p>
            <h2 className="font-serif text-4xl mb-8">What we install</h2>
            <ul className="space-y-3 text-mute">
              {installList.map((item) => (
                <li key={item} className="border-b border-line pb-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-end">
            <Button
              href={whatsappUrl("Hi Sparklights — I’d like an installation quote.")}
              external
            >
              Request an installation quote
            </Button>
          </div>
        </div>
      </section>

      <FAQ items={faqs} eyebrow="Delivery FAQ" title="Before you order" />
      <ClosingCTA
        title="Ready when you are"
        body="Tell us what you need and where you are. We'll confirm the time."
      />
    </>
  );
}
