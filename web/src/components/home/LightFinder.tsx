"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import { whatsappUrl } from "@/lib/constants";

const ROOMS = [
  { id: "dining-room", label: "Dining" },
  { id: "bedroom", label: "Bedroom" },
  { id: "living-room", label: "Living" },
  { id: "kitchen", label: "Kitchen" },
  { id: "entrance-hallway", label: "Entrance" },
];

const HEIGHTS = [
  { id: "low", label: "Low ceiling" },
  { id: "standard", label: "Standard" },
  { id: "high", label: "High / double" },
];

const STYLES = [
  { id: "crystal", label: "Crystal" },
  { id: "gold", label: "Gold & brass" },
  { id: "black", label: "Black" },
  { id: "natural", label: "Natural" },
  { id: "glow", label: "Glowing" },
];

export function LightFinder() {
  const [step, setStep] = useState(0);
  const [room, setRoom] = useState("");
  const [height, setHeight] = useState("");
  const [style, setStyle] = useState("");

  const picks = useMemo(() => {
    if (!room || !style) return [];
    const styleWord = style === "gold" ? "gold" : style;
    return products
      .filter((p) => {
        const roomOk = p.rooms.includes(room);
        const styleOk = p.styles.some((s) => s.toLowerCase().includes(styleWord));
        const heightOk =
          height === "low"
            ? !p.type.toLowerCase().includes("chandelier") || p.badge === "Popular"
            : true;
        return roomOk && (styleOk || !styleOk) && heightOk;
      })
      .filter((p) => p.rooms.includes(room) || p.styles.some((s) => s.toLowerCase().includes(styleWord)))
      .slice(0, 3);
  }, [room, height, style]);

  const progress = ((step + (room && height && style ? 1 : 0)) / 4) * 100;

  const message = `Hi Sparklights — Light finder answers: room=${room || "—"}, ceiling=${height || "—"}, style=${style || "—"}. Please send options and prices.`;

  return (
    <section className="border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <p className="label text-paper/50 mb-2">The light finder</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 max-w-2xl">
          Not sure what fits? Answer three questions.
        </h2>
        <p className="text-paper/70 text-sm sm:text-lg max-w-xl mb-8">
          We reply with options and prices.
        </p>

        <div className="h-[2px] bg-paper/15 mb-8 rounded-full overflow-hidden">
          <div
            className="h-full bg-paper transition-all duration-500"
            style={{ width: `${Math.max(12, progress)}%` }}
          />
        </div>

        <div className="border border-paper/20 rounded-md p-5 sm:p-8 bg-ink">
          {step === 0 ? (
            <Step
              title="Which room?"
              options={ROOMS}
              value={room}
              onPick={(id) => {
                setRoom(id);
                setStep(1);
              }}
            />
          ) : null}
          {step === 1 ? (
            <Step
              title="Ceiling height?"
              options={HEIGHTS}
              value={height}
              onPick={(id) => {
                setHeight(id);
                setStep(2);
              }}
            />
          ) : null}
          {step === 2 ? (
            <Step
              title="Which look?"
              options={STYLES}
              value={style}
              onPick={(id) => {
                setStyle(id);
                setStep(3);
              }}
            />
          ) : null}
          {step === 3 ? (
            <div>
              <p className="label text-paper/50 mb-4">Three suggestions</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {(picks.length ? picks : products.slice(0, 3)).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className="border border-paper/20 rounded-md overflow-hidden hover:bg-paper/5 transition-colors"
                  >
                    <div className="relative aspect-[4/5] bg-paper/5">
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="33vw" />
                    </div>
                    <div className="p-3">
                      <p className="font-serif text-lg leading-snug">{p.name}</p>
                      <p className="label text-paper/50 mt-1">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center bg-[#25D366] text-white px-5 py-3 rounded-full label tracking-[0.14em]"
                >
                  Send answers on WhatsApp
                </a>
                <Link
                  href={`/request-a-quote?room=${room}&height=${height}&style=${style}`}
                  className="inline-flex justify-center border border-paper/40 px-5 py-3 rounded-full label tracking-[0.14em] text-paper"
                >
                  Request a quote
                </Link>
                <button
                  type="button"
                  className="label text-paper/60"
                  onClick={() => {
                    setStep(0);
                    setRoom("");
                    setHeight("");
                    setStyle("");
                  }}
                >
                  Start again
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Step({
  title,
  options,
  value,
  onPick,
}: {
  title: string;
  options: { id: string; label: string }[];
  value: string;
  onPick: (id: string) => void;
}) {
  return (
    <div>
      <h3 className="font-serif text-2xl sm:text-3xl mb-5">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onPick(o.id)}
            className={`min-h-[56px] sm:min-h-[64px] px-4 py-3 rounded-md border text-left text-sm sm:text-base transition-colors ${
              value === o.id
                ? "bg-paper text-ink border-paper"
                : "border-paper/25 text-paper hover:bg-paper/10"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
