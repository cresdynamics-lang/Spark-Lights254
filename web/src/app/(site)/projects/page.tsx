"use client";

import Image from "next/image";
import { useState } from "react";
import { projects } from "@/lib/data";
import { ClosingCTA } from "@/components/ui/ClosingCTA";

const filters = ["All", "Living", "Dining", "Bedroom", "Kitchen", "Entrance"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.room === filter.toLowerCase());

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <p className="label mb-3">Home / Projects</p>
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight mb-4">
            Spaces we&apos;ve lit
          </h1>
          <p className="text-mute text-lg max-w-2xl leading-relaxed mb-10">
            Homes and apartments across Nairobi and beyond. Real rooms, real fixtures, installed by
            our team.
          </p>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`label px-4 py-2 border ${
                  filter === f ? "border-ink bg-ink text-paper" : "border-line text-mute"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((p, i) => (
              <article
                key={p.slug}
                className={`break-inside-avoid border border-line bg-paper overflow-hidden ${
                  i % 3 === 1 ? "" : ""
                }`}
              >
                <div
                  className={`relative ${i % 5 === 0 ? "aspect-[3/4]" : i % 5 === 2 ? "aspect-square" : "aspect-[4/5]"}`}
                >
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
                <div className="p-4 flex items-center justify-between gap-3">
                  <h2 className="font-serif text-lg">{p.title}</h2>
                  <span className="label">{p.area}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA
        title="Want your room to look like this?"
        body="Send us your space and we'll recommend the right lights."
      />
    </>
  );
}
