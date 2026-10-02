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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <Reveal>
          <p className="label mb-2">Map & showroom</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight mb-8 sm:mb-10 max-w-3xl">
            Come and see them lit. Or we bring them to you.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          {/* Nairobi delivery card */}
          <div className="border border-line bg-paper rounded-md overflow-hidden flex flex-col">
            <div
              className="relative aspect-[5/4] bg-paper"
              aria-label="Delivery areas map of Nairobi"
            >
              <Image
                src={PLACEHOLDER_IMAGES.map}
                alt="Nairobi delivery coverage"
                fill
                className="object-cover opacity-40"
                sizes="(max-width:640px) 100vw, 50vw"
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
            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
              <div>
                <p className="label mb-2">Nairobi delivery</p>
                <h3 className="font-serif text-2xl sm:text-3xl mb-3">We bring them to you</h3>
                <p className="text-mute text-sm leading-relaxed mb-3">
                  Same-day runs across Nairobi. Confirm your estate on WhatsApp before dispatch.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {DELIVERY_AREAS.slice(0, 5).map((a) => (
                    <Link
                      key={a.slug}
                      href={`/delivery/${a.slug}`}
                      className="label text-[0.55rem] border border-line px-2.5 py-1 rounded-full hover:bg-mist"
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/delivery/nairobi"
                className="inline-flex self-start border border-ink px-4 py-2.5 rounded-full label tracking-[0.14em]"
              >
                Delivery areas →
              </Link>
            </div>
          </div>

          {/* Showroom card */}
          <div className="border border-line bg-paper rounded-md overflow-hidden flex flex-col">
            <div className="relative aspect-[5/4]">
              <Image
                src={PLACEHOLDER_IMAGES.showroom}
                alt="Sparklights showroom — sample lit fixture"
                fill
                className="object-cover"
                sizes="(max-width:640px) 100vw, 50vw"
              />
              <p className="absolute bottom-3 left-3 label text-paper drop-shadow">Showroom preview</p>
            </div>
            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
              <div>
                <p className="label mb-2">Showroom</p>
                <h3 className="font-serif text-2xl sm:text-3xl mb-3">Come and see them lit</h3>
                <p className="text-mute text-sm leading-relaxed mb-1">{SITE.address}</p>
                <p className="text-mute text-sm mb-1">{SITE.hours}</p>
                <p className="text-mute text-sm">
                  <a href={`tel:${SITE.phoneTel}`} className="hover:text-ink">
                    {SITE.phoneDisplay}
                  </a>
                </p>
              </div>
              <Link
                href="/showroom"
                className="inline-flex self-start bg-ink text-paper px-4 py-2.5 rounded-full label tracking-[0.14em]"
              >
                Showroom details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
