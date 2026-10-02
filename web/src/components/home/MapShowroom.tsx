import Image from "next/image";
import Link from "next/link";
import { SITE, DELIVERY_AREAS } from "@/lib/constants";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholder-images";
import { Reveal } from "@/components/ui/Reveal";

const pins = [
  { name: "Kilimani", x: 42, y: 48, href: "/delivery/kilimani", time: "Same day" },
  { name: "Kileleshwa", x: 38, y: 42, href: "/delivery/kileleshwa", time: "Same day" },
  { name: "Gigiri", x: 48, y: 28, href: "/delivery/gigiri", time: "Same day" },
  { name: "Kitengela", x: 62, y: 72, href: "/delivery/kitengela", time: "Confirm" },
  { name: "Rongai", x: 32, y: 70, href: "/delivery/rongai", time: "Confirm" },
  { name: "Showroom", x: 52, y: 52, href: "/showroom", time: "Visit", showroom: true },
];

export function MapShowroom() {
  return (
    <section className="border-t border-line bg-mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12">
        <Reveal>
          <p className="label mb-2">Map & showroom</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight mb-4">
            Come and see them lit. Or we bring them to you.
          </h2>
          <div
            className="relative aspect-[5/4] border border-line bg-paper rounded-md overflow-hidden mb-4"
            aria-label="Delivery areas map of Nairobi"
          >
            <Image
              src={PLACEHOLDER_IMAGES.map}
              alt="Nairobi delivery coverage — product photography placeholder"
              fill
              className="object-cover opacity-40"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-paper/55" />
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M20 30 C35 18, 55 15, 75 28 C88 40, 90 60, 78 78 C60 92, 35 88, 22 70 C12 55, 12 40, 20 30 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
                className="text-ink/40"
              />
            </svg>
            {pins.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                title={`${p.name} · ${p.time}`}
              >
                <span
                  className={`block w-2.5 h-2.5 rounded-full border ${
                    p.showroom ? "bg-ink border-ink w-3.5 h-3.5" : "bg-paper border-ink"
                  }`}
                />
                <span className="absolute left-1/2 -translate-x-1/2 top-4 whitespace-nowrap label opacity-0 group-hover:opacity-100 transition-opacity bg-paper border border-line px-2 py-1 rounded-md shadow-sm z-10">
                  {p.name} · {p.time}
                </span>
              </Link>
            ))}
            <p className="absolute bottom-3 left-3 label text-ink/70">Nairobi delivery map</p>
          </div>
          <Link href="/delivery/nairobi" className="label border-b border-ink/30 pb-1">
            Lighting delivery in Nairobi →
          </Link>
        </Reveal>

        <div className="border border-line bg-paper rounded-md overflow-hidden flex flex-col">
          <div className="relative aspect-[16/10]">
            <Image
              src={PLACEHOLDER_IMAGES.showroom}
              alt="Sparklights showroom — sample lit fixture"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <p className="absolute bottom-3 left-3 label text-paper drop-shadow">Showroom preview</p>
          </div>
          <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
            <div>
              <p className="label mb-3">Showroom</p>
              <h3 className="font-serif text-3xl mb-4">Visit Sparklights 254</h3>
              <p className="text-mute leading-relaxed mb-2">{SITE.address}</p>
              <p className="text-mute mb-2">{SITE.hours}</p>
              <p className="text-mute mb-6">
                <a href={`tel:${SITE.phoneTel}`} className="hover:text-ink">
                  {SITE.phoneDisplay}
                </a>
              </p>
              <p className="label mb-3">We deliver to</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {DELIVERY_AREAS.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/delivery/${a.slug}`}
                    className="label border border-line px-3 py-1.5 rounded-full hover:bg-mist"
                  >
                    {a.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/showroom"
                className="bg-ink text-paper px-5 py-3 rounded-full label tracking-[0.14em]"
              >
                Showroom details
              </Link>
              <Link
                href="/delivery"
                className="border border-ink px-5 py-3 rounded-full label tracking-[0.14em]"
              >
                Delivery areas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
