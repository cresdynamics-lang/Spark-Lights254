"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";
import { categories, type Product } from "@/lib/data";

export function ShopAllClient({ products }: { products: Product[] }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return products.filter((p) => {
      const catOk = category === "all" || p.category === category;
      if (!catOk) return false;
      if (!query) return true;
      const hay = [p.name, p.type, p.description, ...p.styles, ...(p.rooms || [])]
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });
  }, [products, q, category]);

  return (
    <div>
      <div className="mb-8 space-y-4">
        <label className="block">
          <span className="sr-only">Search products</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search lights, styles, rooms…"
            className="w-full border border-line bg-paper px-4 py-3.5 rounded-md text-ink placeholder:text-mute focus:outline-none focus:border-ink"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`label px-3 py-2 border rounded-full transition-colors ${
              category === "all"
                ? "border-ink bg-ink text-paper"
                : "border-line text-mute hover:border-ink hover:text-ink"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCategory(c.slug)}
              className={`label px-3 py-2 border rounded-full transition-colors ${
                category === c.slug
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-mute hover:border-ink hover:text-ink"
              }`}
            >
              {c.shortName || c.name}
            </button>
          ))}
        </div>
      </div>

      <p className="label mb-6">
        Showing {filtered.length} of {products.length}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-mute mb-4">No products match that search.</p>
          <Link href="/search" className="label border-b border-ink/30 pb-1">
            Try site search →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
