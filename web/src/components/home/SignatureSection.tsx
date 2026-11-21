import Link from "next/link";
import Image from "next/image";
import { catalogSignatureProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export async function SignatureSection() {
  const items = (await catalogSignatureProducts()).slice(0, 2);

  return (
    <section className="bg-ink text-paper border-t border-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-end mb-10 sm:mb-14">
          <Reveal className="lg:col-span-6">
            <p className="label text-paper/50 mb-2 sm:mb-3">The Signature Collection</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl leading-tight">
              Statement pieces for rooms that deserve one.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <p className="text-paper/70 text-base sm:text-lg leading-relaxed mb-5 sm:mb-6">
              Hand-picked crystal, brass and glowing sculptural lights for dining rooms, entrances
              and double-height spaces.
            </p>
            <Link
              href="/signature"
              className="label text-paper tracking-[0.14em] sm:tracking-[0.16em] border-b border-paper/40 pb-1 hover:border-paper transition-colors"
            >
              View the collection
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-6">
          {items.map((p, i) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className={`group ${i === 1 ? "sm:mt-12" : ""}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-ink border border-paper/10 mb-3 sm:mb-4 rounded-md">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="label text-paper/50 mb-1 text-[0.6rem] sm:text-[0.6875rem]">{p.type}</p>
              <h3 className="font-serif text-base sm:text-2xl mb-1 leading-snug">{p.name}</h3>
              <p className="text-paper/60 text-xs sm:text-sm">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
