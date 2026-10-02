"use client";

import { useState } from "react";

export function FAQ({
  items,
  title = "Questions we get asked",
  eyebrow = "Good to know",
}: {
  items: { q: string; a: string }[];
  title?: string;
  eyebrow?: string;
}) {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-paper border-t border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-20 grid gap-8 sm:gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="label mb-2 sm:mb-3">{eyebrow}</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
            {title}
          </h2>
        </div>
        <div className="border-t border-line">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-line">
                <button
                  type="button"
                  className="w-full flex items-start justify-between gap-4 sm:gap-6 py-4 sm:py-5 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base md:text-lg text-ink pr-2">{item.q}</span>
                  <span
                    className={`shrink-0 mt-1 w-6 h-6 rounded-full border border-line flex items-center justify-center text-mute text-sm transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-mist" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div className={`accordion-content ${isOpen ? "open" : ""}`}>
                  <div>
                    <p className="pb-4 sm:pb-5 text-mute text-sm sm:text-base leading-relaxed max-w-xl">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
