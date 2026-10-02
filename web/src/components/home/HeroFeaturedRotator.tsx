"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/data";

type Featured = Pick<Product, "slug" | "name" | "price" | "image" | "category" | "type">;

const FIVE_MINUTES_MS = 5 * 60 * 1000;

export function HeroFeaturedRotator({ products }: { products: Featured[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const list = products.length ? products : [];

  useEffect(() => {
    if (list.length < 2) return;
    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % list.length);
        setVisible(true);
      }, 280);
    }, FIVE_MINUTES_MS);
    return () => window.clearInterval(id);
  }, [list.length]);

  if (!list.length) return null;
  const p = list[index];

  return (
    <Link
      href={`/products/${p.slug}`}
      className={`hero-featured-float group absolute right-4 bottom-24 sm:right-8 sm:bottom-32 md:right-10 md:bottom-36 z-10 w-[42vw] max-w-[220px] sm:w-[240px] sm:max-w-none border border-paper/25 bg-ink/55 backdrop-blur-sm rounded-md overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-label={`Featured product: ${p.name}`}
    >
      <div className="relative aspect-[4/5] bg-mist">
        <Image
          key={p.slug}
          src={p.image}
          alt={p.name}
          fill
          className="object-cover"
          sizes="240px"
          priority={false}
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
    </Link>
  );
}
