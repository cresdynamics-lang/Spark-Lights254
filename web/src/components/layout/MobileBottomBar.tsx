"use client";

import { SITE, whatsappUrl } from "@/lib/constants";
import { trackMeta } from "@/lib/meta-pixel";

export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-line bg-paper/95 backdrop-blur-sm">
      <div className="grid grid-cols-2">
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-ink text-paper text-center py-3.5 label tracking-[0.16em]"
          onClick={() => trackMeta("Contact", { currency: "KES" })}
        >
          WhatsApp
        </a>
        <a
          href={`tel:${SITE.phoneTel}`}
          className="text-ink text-center py-3.5 label tracking-[0.16em]"
          onClick={() => trackMeta("Contact", { currency: "KES" })}
        >
          Call
        </a>
      </div>
    </div>
  );
}
