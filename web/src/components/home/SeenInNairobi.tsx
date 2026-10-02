"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholder-images";

type Job = {
  area: string;
  room: string;
  href: string;
  image: string;
  before?: string;
};

const jobs: Job[] = [
  {
    area: "Kilimani",
    room: "Dining",
    href: "/delivery/kilimani",
    image: PLACEHOLDER_IMAGES.dining,
    before: PLACEHOLDER_IMAGES.ceiling,
  },
  {
    area: "Kileleshwa",
    room: "Bedroom",
    href: "/delivery/kileleshwa",
    image: PLACEHOLDER_IMAGES.bedroom,
  },
  {
    area: "Gigiri",
    room: "Entrance",
    href: "/delivery/gigiri",
    image: PLACEHOLDER_IMAGES.entrance,
  },
  {
    area: "Kitengela",
    room: "Kitchen",
    href: "/delivery/kitengela",
    image: PLACEHOLDER_IMAGES.kitchen,
  },
  {
    area: "Rongai",
    room: "Outdoor",
    href: "/delivery/rongai",
    image: PLACEHOLDER_IMAGES.outdoor,
  },
];

const featuredBefore = PLACEHOLDER_IMAGES.ceiling;

export function SeenInNairobi() {
  const [pos, setPos] = useState(55);
  const dragging = useRef(false);
  const featured = jobs[0];

  const onMove = (clientX: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(92, Math.max(8, next)));
  };

  return (
    <section className="border-t border-line bg-mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <p className="label mb-2">Seen in Nairobi homes</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink mb-3 max-w-3xl">
          Kilimani. Kileleshwa. Gigiri. Kitengela. Rongai. See what we fitted.
        </h2>
        <p className="text-mute mb-8 max-w-2xl">
          Finished looks by area — using our product photography until install photos are supplied.
        </p>

        <div
          className="relative aspect-[16/10] sm:aspect-[21/9] border border-line rounded-md overflow-hidden bg-paper mb-3 select-none touch-none"
          onPointerDown={(e) => {
            dragging.current = true;
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            onMove(e.clientX, e.currentTarget);
          }}
          onPointerMove={(e) => {
            if (!dragging.current) return;
            onMove(e.clientX, e.currentTarget);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
        >
          <Image
            src={featured.before ?? featuredBefore}
            alt="Before — unlit room placeholder"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Image
              src={featured.image}
              alt="After — Kilimani dining install placeholder"
              fill
              className="object-cover"
            />
          </div>
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-paper shadow"
            style={{ left: `${pos}%` }}
          >
            <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-paper text-ink text-xs flex items-center justify-center border border-line">
              ⇄
            </span>
          </div>
          <p className="absolute bottom-3 left-3 label text-paper drop-shadow">
            Before · After · {featured.area}
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {jobs.slice(1).map((j) => (
            <Link key={j.area} href={j.href} className="group">
              <div className="relative aspect-[4/5] border border-line rounded-md overflow-hidden mb-2">
                <Image
                  src={j.image}
                  alt={`${j.area} ${j.room} lighting`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <p className="label">{j.area}</p>
              <p className="font-serif text-xl">{j.room}</p>
            </Link>
          ))}
        </div>
        <Link href="/projects" className="label border-b border-ink/30 pb-1">
          View every project →
        </Link>
      </div>
    </section>
  );
}
