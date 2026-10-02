"use client";

import { whatsappUrl } from "@/lib/constants";
import { trackMeta } from "@/lib/meta-pixel";

export function MetaWhatsAppLink({
  href,
  className = "",
  children,
  message,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
  message?: string;
}) {
  return (
    <a
      href={href || whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackMeta("Contact", { currency: "KES" })}
    >
      {children}
    </a>
  );
}
