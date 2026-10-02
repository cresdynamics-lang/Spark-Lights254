"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/lib/data";

const STYLE_FILTERS = ["All", "Crystal", "Gold", "Black & Gold", "LED", "Modern"];

export function CategoryProductGrid({ products }: { products: Product[] }) {
  const [style, setStyle] = useState("All");

  const filtered = useMemo(() => {
    if (style === "All") return products;
    const map: Record<string, string[]> = {
      Crystal: ["Crystal"],
      Gold: ["Gold", "Gold & Brass"],
      "Black & Gold": ["Black", "Gold & Brass"],
      LED: ["LED & Glow"],
      Modern: ["Modern"],
    };
    const keys = map[style] || [style];
    return products.filter((p) => p.styles.some((s) => keys.includes(s)));
  }, [products, style]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 border-b border-line pb-4">
        <div className="flex flex-wrap gap-2">
          {STYLE_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setStyle(f)}
              className={`label px-3 py-2 border transition-colors duration-300 ${
                style === f
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-mute hover:border-ink hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 label">
          <span>Room</span>
          <span>Size</span>
          <span>Price</span>
          <span className="text-ink">Sort: Featured</span>
        </div>
      </div>

      <p className="label mb-6">
        Showing {filtered.length} of {products.length}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-mute py-16 text-center">No products match this filter yet.</p>
      ) : null}
    </div>
  );
}
