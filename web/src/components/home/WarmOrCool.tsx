"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function kes(n: number) {
  return `KES ${n.toLocaleString("en-KE")}`;
}

const picks = [
  { room: "Bedroom", tip: "Warm light for rest", href: "/journal/bedroom-lighting-ideas-kenya" },
  { room: "Dining", tip: "Warm white, dimmable", href: "/journal/lumens-watts-kelvin-explained" },
  { room: "Kitchen", tip: "Cooler light for tasks", href: "/category/kitchen-lights" },
];

export function WarmOrCool() {
  const [kelvin, setKelvin] = useState(3000);
  const t = (kelvin - 2700) / (5000 - 2700);
  const warmFilter = `sepia(${(1 - t) * 0.35}) saturate(${1 + (1 - t) * 0.4}) hue-rotate(${(1 - t) * -12}deg)`;
  const coolFilter = `saturate(${1 + t * 0.15}) hue-rotate(${t * 18}deg) brightness(${1 + t * 0.05})`;

  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="label mb-2">Warm or cool?</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight mb-4">
            The same room looks completely different at {kes(2700)} and {kes(5000)}.
          </h2>
          <p className="text-mute mb-6 leading-relaxed">
            Drag the slider. This cuts the number-one buying mistake — choosing the wrong colour of light.
          </p>
          <div className="mb-6">
            <div className="flex justify-between label mb-2 gap-2">
              <span>{kes(2700)}</span>
              <span className="text-ink font-medium">{kes(kelvin)}</span>
              <span>{kes(5000)}</span>
            </div>
            <input
              type="range"
              min={2700}
              max={5000}
              step={100}
              value={kelvin}
              onChange={(e) => setKelvin(Number(e.target.value))}
              className="w-full accent-ink"
              aria-label="Colour temperature shown as Kenyan shillings"
            />
          </div>
          <ul className="space-y-3 mb-6">
            {picks.map((p) => (
              <li key={p.room} className="flex items-baseline justify-between border-b border-line pb-2 gap-3">
                <span className="font-serif text-xl">{p.room}</span>
                <Link href={p.href} className="label hover:text-ink">
                  {p.tip} →
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/journal/lumens-watts-kelvin-explained" className="label border-b border-ink/30 pb-1">
            Read the full colour guide →
          </Link>
        </div>
        <div className="relative aspect-[4/5] border border-line overflow-hidden rounded-md bg-mist">
          <Image
            src="/images/products/Screenshot_2025_1008_135432.jpeg"
            alt="Room lighting colour temperature demonstration"
            fill
            className="object-cover transition-[filter] duration-300"
            style={{ filter: t < 0.5 ? warmFilter : coolFilter }}
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between label text-paper drop-shadow">
            <span>Warm</span>
            <span>Cool</span>
          </div>
        </div>
      </div>
    </section>
  );
}
