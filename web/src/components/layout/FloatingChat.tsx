"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/constants";
import { getProduct } from "@/lib/data";
import { productOrderMessage } from "@/lib/whatsapp-order";

const PROMPTS = [
  {
    label: "Messages to help you choose",
    message: "Hi Sparklights — I need help choosing the right light for my space.",
  },
  {
    label: "Messages to craft your room",
    message:
      "Hi Sparklights — I’d like help crafting the lighting for my room. Here’s what I’m thinking…",
  },
  {
    label: "Messages for the best lights",
    message:
      "Hi Sparklights — I’m looking for your best lights for my space. Can you recommend options?",
  },
  {
    label: "Messages for what you are looking for",
    message: "Hi Sparklights — here’s what I’m looking for…",
  },
];

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.139-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function FloatingChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const productSlug = pathname.startsWith("/products/") ? pathname.split("/")[2] : null;
  const product = productSlug ? getProduct(productSlug) : undefined;
  const orderHref = product ? whatsappUrl(productOrderMessage(product)) : whatsappUrl();

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div
      ref={panelRef}
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 lg:bottom-6"
    >
      {open ? (
        <div className="w-[min(100vw-2rem,320px)] border border-line bg-paper shadow-lg rounded-2xl overflow-hidden fade-in">
          <div className="bg-[#25D366] text-white px-4 py-3">
            <p className="text-[0.6875rem] tracking-[0.14em] uppercase font-medium text-white">
              Order on WhatsApp
            </p>
            <p className="text-xs text-white/80 mt-1">
              {product
                ? `Order ${product.name} with product link & photo`
                : "Pick a message to start the chat"}
            </p>
          </div>
          {product ? (
            <div className="px-4 py-3 border-b border-line">
              <a
                href={orderHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-ink hover:bg-mist -mx-2 px-2 py-2 rounded-md transition-colors"
                onClick={() => setOpen(false)}
              >
                Order this product — {product.name}
              </a>
            </div>
          ) : null}
          <ul className="divide-y divide-line">
            {PROMPTS.map((p) => (
              <li key={p.label}>
                <a
                  href={whatsappUrl(p.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3.5 text-sm text-ink hover:bg-mist transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-4 py-3 border-t border-line">
            <a
              href={orderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 text-[0.6875rem] tracking-[0.14em] uppercase font-medium rounded-full hover:bg-[#1ebe57] transition-colors"
              onClick={() => setOpen(false)}
            >
              <WhatsAppIcon className="w-4 h-4" />
              Open WhatsApp
            </a>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Order on WhatsApp"
        className="flex items-center gap-2.5 bg-[#25D366] text-white pl-3.5 pr-4 py-3 rounded-full shadow-lg hover:bg-[#1ebe57] transition-colors"
      >
        <WhatsAppIcon className="w-5 h-5 shrink-0" />
        <span className="text-[0.6875rem] tracking-[0.14em] uppercase font-medium text-white whitespace-nowrap">
          Order on WhatsApp
        </span>
        <span
          className={`w-5 h-5 rounded-full border border-white/50 flex items-center justify-center text-xs text-white transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
    </div>
  );
}
