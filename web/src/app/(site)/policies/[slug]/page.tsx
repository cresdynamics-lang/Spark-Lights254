import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { seoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const policies: Record<string, { title: string; body: string[] }> = {
  delivery: {
    title: "Delivery Policy",
    body: [
      "Same-day delivery is available across Nairobi when you order before the daily cutoff. PLACEHOLDER — confirm cutoff time with Sparklights.",
      "Countrywide delivery is available on request via courier. Timing depends on the route.",
      "You will receive confirmation of the delivery window on WhatsApp after payment.",
      "Phase 1 areas with live pages: Kilimani, Kileleshwa, Gigiri, Kitengela, Rongai — see /delivery/.",
    ],
  },
  installation: {
    title: "Installation Policy",
    body: [
      "Installation is quoted by site depending on fixture type, ceiling height and access.",
      "Our team installs and tests before leaving. PLACEHOLDER — confirm what the client must prepare on site (ladder access, power off, etc.).",
      "Book installation when you order on WhatsApp or via /request-a-quote.",
    ],
  },
  returns: {
    title: "Returns & Exchanges",
    body: [
      "If a product arrives damaged, contact us immediately with photos.",
      "Returns of unused items may be accepted within PLACEHOLDER period subject to inspection.",
      "Custom or installed items may be excluded. Confirm with Sparklights before purchase.",
    ],
  },
  warranty: {
    title: "Warranty",
    body: [
      "Products are tested before dispatch.",
      "Warranty covers manufacturing defects for PLACEHOLDER period.",
      "Damage from incorrect installation by third parties may void warranty.",
    ],
  },
  payment: {
    title: "Payment",
    body: [
      "We accept M-Pesa, Visa, Mastercard and bank transfer.",
      "Orders are confirmed once payment is received.",
      "PLACEHOLDER — add Till / Paybill / card checkout details when live on-site payments launch.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "We collect contact details you share via WhatsApp, forms or phone to fulfil orders.",
      "We do not sell your personal information.",
      "PLACEHOLDER — add full privacy policy text when provided by the client.",
    ],
  },
  terms: {
    title: "Terms of Sale",
    body: [
      "Prices include VAT unless stated otherwise.",
      "Orders are confirmed once payment is received.",
      "PLACEHOLDER — add full terms of sale when provided.",
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return seoMetadata(`/policies/${slug}`);
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) notFound();

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: policy.title },
          ]}
        />
        <h1 className="font-serif text-4xl md:text-5xl text-ink mb-8">{policy.title}</h1>
        <div className="space-y-5 text-mute leading-relaxed text-lg">
          {policy.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
