"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/data";

type Featured = Pick<Product, "slug" | "name" | "price" | "image" | "category" | "type">;

export function HeroFeaturedRotator({ products }: { products: Featured[] }) {
  const [index, setIndex] = useState(0);
  const list = products.length ? products : [];

  useEffect(() => {
    if (list.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [list.length]);

  if (!list.length) return null;
  const p = list[index];

  return (
    <Link
      href={`/products/${p.slug}`}
      className="group absolute right-4 bottom-24 sm:right-8 sm:bottom-32 md:right-10 md:bottom-36 z-10 w-[42vw] max-w-[220px] sm:w-[240px] sm:max-w-none border border-paper/25 bg-ink/55 backdrop-blur-sm rounded-md overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:scale-[1.02]"
      aria-live="polite"
    >
      <div className="relative aspect-[4/5] bg-mist">
        <Image
          key={p.slug}
          src={p.image}
          alt={p.name}
          fill
          className="object-cover transition-opacity duration-700"
          sizes="240px"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
        <p className="absolute top-2.5 left-2.5 label text-[0.55rem] tracking-[0.14em] text-paper bg-ink/50 px-2 py-1 rounded-full border border-paper/20">
          Featured Product
        </p>
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <p className="label text-paper/70 mb-1 text-[0.55rem] truncate">
            {p.type || p.category}
          </p>
          <p className="font-serif text-paper text-sm sm:text-lg leading-snug line-clamp-2 mb-1">
            {p.name}
          </p>
          <p className="text-paper text-xs sm:text-sm font-medium">{formatPrice(p.price)}</p>
        </div>
      </div>
      <div className="flex gap-1 px-3 py-2 bg-ink/80">
        {list.map((_, i) => (
          <span
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-colors ${
              i === index ? "bg-paper" : "bg-paper/25"
            }`}
          />
        ))}
      </div>
    </Link>
  );
}
