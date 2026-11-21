"use client";

import Link from "next/link";
import { PROMO } from "@/lib/promo";
import { usePromoActive } from "./usePromoActive";

export function PromoBanner() {
  const active = usePromoActive();
  if (!active) return null;
  return (
    <Link
      href="/shop"
      className="block bg-[#c0392b] text-white text-center px-3 py-2 text-[0.7rem] sm:text-sm font-medium tracking-wide hover:bg-[#a93226] transition-colors"
    >
      <span className="font-semibold uppercase tracking-[0.12em]">{PROMO.name}</span>
      {" · "}
      Up to {PROMO.upToPercentOff}% off lights
      <span className="hidden sm:inline"> · Ends 27 Nov</span>
      <span className="underline underline-offset-2 ml-2">Shop now</span>
    </Link>
  );
}
