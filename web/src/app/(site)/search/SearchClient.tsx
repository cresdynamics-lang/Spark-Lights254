"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { products, categories } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { WhatsAppButton } from "@/components/ui/Button";

export default function SearchClient() {
  const params = useSearchParams();
  const initial = params.get("q") || "";
  const [q, setQ] = useState(initial);
  const [type, setType] = useState("All");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return products.filter((p) => {
      const hay =
        `${p.name} ${p.type} ${p.description} ${p.styles.join(" ")} ${p.rooms.join(" ")} ${p.category} ${p.finish?.join(" ") || ""}`.toLowerCase();
      const matchesQuery =
        !query ||
        query.split(/\s+/).every((word) => hay.includes(word));
      const matchesType =
        type === "All" ||
        p.category === type ||
        p.type.toLowerCase().includes(type.toLowerCase());
      return matchesQuery && matchesType;
    });
  }, [q, type]);

  const suggestions = ["Wall lights", "Ring light", "Office", "Dimmer", "Pendant"];

  return (
    <section className="bg-paper min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
        <form
          className="mb-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search lights, rooms, styles…"
            className="w-full border border-line px-4 py-4 rounded-md text-lg outline-none focus:border-ink"
            autoFocus
          />
        </form>

        <p className="label mb-3">
          {results.length} results
          {q ? " · Try: " : null}
          {q
            ? suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="mr-3 hover:text-ink"
                  onClick={() => setQ(s)}
                >
                  {s}
                </button>
              ))
            : null}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setType("All")}
            className={`label px-3 py-2 border rounded-full ${
              type === "All" ? "bg-ink text-paper border-ink" : "border-line"
            }`}
          >
            All
          </button>
          {categories.slice(0, 5).map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setType(c.slug)}
              className={`label px-3 py-2 border rounded-full ${
                type === c.slug ? "bg-ink text-paper border-ink" : "border-line"
              }`}
            >
              {c.shortName || c.name}
            </button>
          ))}
        </div>

        {results.length ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {results.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="border border-line rounded-md p-8 text-center bg-mist">
            <p className="font-serif text-2xl mb-2">Can&apos;t find what you need?</p>
            <p className="text-mute mb-5">Tell us on WhatsApp and we&apos;ll find it.</p>
            <WhatsAppButton
              label="Ask us"
              message={`Hi Sparklights — I searched for “${q || "…"}” and couldn’t find it. Can you help?`}
            />
          </div>
        )}

        <p className="mt-10 label">
          <Link href="/shop/chandeliers">Browse all shop →</Link>
        </p>
      </div>
    </section>
  );
}
