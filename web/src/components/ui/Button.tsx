"use client";

import Link from "next/link";
import { whatsappUrl } from "@/lib/constants";
import {
  metaProductPayload,
  trackMeta,
  type MetaContent,
} from "@/lib/meta-pixel";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink/90 border border-ink",
  secondary: "bg-transparent text-ink border border-ink hover:bg-mist",
  whatsapp: "bg-ink text-paper hover:bg-ink/90 border border-ink",
  ghost: "bg-transparent text-ink border border-transparent hover:border-line",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const cls = `inline-flex items-center justify-center px-5 sm:px-6 py-3 text-[0.65rem] sm:text-[0.6875rem] tracking-[0.14em] sm:tracking-[0.16em] uppercase rounded-full transition-colors duration-300 ${styles[variant]} ${className}`;

  if (external || href.startsWith("http") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={cls}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}

export function WhatsAppButton({
  message,
  label = "Order on WhatsApp",
  className = "",
  product,
  trackPurchase = false,
}: {
  message?: string;
  label?: string;
  className?: string;
  product?: {
    slug: string;
    name: string;
    price: number;
    category?: string;
    type?: string;
  };
  /** When true (product order CTAs), fire AddToCart → InitiateCheckout → Purchase */
  trackPurchase?: boolean;
}) {
  const onClick = () => {
    if (product && trackPurchase) {
      const payload = metaProductPayload(product);
      trackMeta("AddToCart", payload);
      trackMeta("InitiateCheckout", payload);
      trackMeta("Purchase", payload);
      return;
    }
    if (product) {
      trackMeta("Contact", metaProductPayload(product));
      return;
    }
    const payload: MetaContent = { currency: "KES" };
    trackMeta("Contact", payload);
  };

  return (
    <Button
      href={whatsappUrl(message)}
      variant="whatsapp"
      className={className}
      external
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
