import { signatureProducts, products } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signature Collection",
  description:
    "Hand-picked crystal, brass and glowing sculptural lights for dining rooms, entrances and double-height spaces.",
};

export default function SignaturePage() {
  const items =
    signatureProducts().length > 0
      ? signatureProducts()
      : products.filter((p) => p.badge === "Popular" || p.badge === "New").slice(0, 6);

  return (
    <>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <p className="label text-paper/50 mb-4">The Signature Collection</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight max-w-3xl mb-6">
            Statement pieces for rooms that deserve one.
          </h1>
          <p className="text-paper/70 text-lg max-w-xl leading-relaxed">
            Hand-picked crystal, brass and glowing sculptural lights for dining rooms, entrances and
            double-height spaces.
          </p>
        </div>
      </section>

      <section className="bg-paper border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA
        title="Looking for a statement piece?"
        body="Send a photo of the room and ceiling height. We’ll suggest the right scale."
      />
    </>
  );
}
