"use client";

import { formatPrice } from "@/lib/data";
import { PROMO, promoPrice } from "@/lib/promo";
import { usePromoActive } from "./usePromoActive";

/** Shows the price, or the Black November sale price with the old one struck through. */
export function Price({
  price,
  className = "",
  wasClassName = "opacity-60",
}: {
  price: number;
  className?: string;
  wasClassName?: string;
}) {
  const active = usePromoActive();
  if (!active) return <span className={className}>{formatPrice(price)}</span>;
  return (
    <span className={className}>
      <span className="text-[#c0392b] font-medium">{formatPrice(promoPrice(price))}</span>{" "}
      <s className={wasClassName} aria-label={`was ${formatPrice(price)}`}>
        {formatPrice(price)}
      </s>
      <span className="sr-only"> — {PROMO.name} {PROMO.percentOff}% off</span>
    </span>
  );
}
