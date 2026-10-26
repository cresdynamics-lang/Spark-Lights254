"use client";

import { logLead } from "@/lib/leads";
import { trackMeta } from "@/lib/meta-pixel";

export function ContactWhatsAppStart({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center bg-ink text-paper py-4 label tracking-[0.16em] mb-10"
      onClick={() => {
        void logLead({
          type: "message",
          source: "contact-whatsapp",
          message: "Hi Sparklights — website WhatsApp chat started from Contact page.",
        });
        trackMeta("Contact", { currency: "KES", content_name: "contact-whatsapp" });
      }}
    >
      Chat on WhatsApp
    </a>
  );
}
