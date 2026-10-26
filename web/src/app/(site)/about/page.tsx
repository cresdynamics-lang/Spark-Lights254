import { ClosingCTA } from "@/components/ui/ClosingCTA";
import { JsonLd, breadcrumbSchema, localBusinessSchema, organizationSchema } from "@/components/seo/JsonLd";
import { SITE, DELIVERY_AREAS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "About Sparklights 254 | Lighting Shop Nairobi" },
  description:
    "Sparklights 254 is a Nairobi lighting retailer on Duruma Road — chandeliers, wall and ceiling lights with delivery and installation across Kenya.",
  alternates: { canonical: `${SITE.url}/about` },
};

const principles = [
  {
    n: "01",
    title: "Fast",
    body: "Same-day delivery across much of Nairobi when stock and access allow — and clear timelines for the rest of Kenya.",
  },
  {
    n: "02",
    title: "Installed properly",
    body: "We deliver, fit and test before we leave so you are not left guessing with a ladder and a wiring diagram.",
  },
  {
    n: "03",
    title: "Considered",
    body: "We stock chandeliers, wall lights, ceiling lights and LED pieces we would put in our own homes — sized for Kenyan rooms and ceilings.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          organizationSchema(),
          localBusinessSchema(),
        ]}
      />
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
          <p className="label text-ink">Who we are</p>
          <p>
            <strong className="text-ink">Sparklights 254</strong> is a Nairobi lighting retailer at{" "}
            {SITE.streetAddress}. We sell chandeliers, wall lights, ceiling lights, pendant lights,
            dining, bedroom and kitchen fixtures — with delivery and installation across Nairobi
            neighbourhoods including{" "}
            {DELIVERY_AREAS.map((a) => a.name).join(", ")}, and further across Kenya.
          </p>
          <p>
            Homeowners, landlords, Airbnb hosts, interior designers and contractors come to us for
            clear prices, WhatsApp quoting, and a team that hangs and tests the light before leaving.
            Visit the showroom Mon–Sat, {SITE.hours.replace("Mon – Sat · ", "")}, or chat on WhatsApp{" "}
            {SITE.whatsappDisplay}.
          </p>
          <p>
            Browse the catalogue at{" "}
            <a href="/shop" className="text-ink underline underline-offset-2">
              sparklights.co.ke/shop
            </a>
            , read practical guides in the{" "}
            <a href="/journal" className="text-ink underline underline-offset-2">
              Lighting Journal
            </a>
            , or start with our{" "}
            <a href="/blog/lighting-prices-nairobi" className="text-ink underline underline-offset-2">
              Nairobi lighting price guide
            </a>
            .
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
        title="Ready to light a room?"
        body="Send a photo of your space on WhatsApp — we will recommend size, style and a clear quote."
      />
    </>
  );
}
