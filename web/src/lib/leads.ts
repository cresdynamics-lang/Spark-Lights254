import { SITE } from "@/lib/constants";

export type LeadPayload = {
  type: "order" | "message" | "quote";
  source?: string;
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
  message: string;
  productSlug?: string;
  productName?: string;
  productPrice?: number;
  productImage?: string;
  productUrl?: string;
};

/** Fire-and-forget lead log before opening WhatsApp. */
export async function logLead(payload: LeadPayload) {
  try {
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    /* never block WhatsApp */
  }
}

export function absoluteProductImage(path?: string | null) {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
