export const META_PIXEL_ID = "996247916797830";

export type MetaContent = {
  content_name?: string;
  content_ids?: string[];
  content_type?: "product" | "product_group";
  content_category?: string;
  value?: number;
  currency?: string;
  num_items?: number;
  search_string?: string;
};

declare global {
  interface Window {
    fbq?: (
      action: "track" | "trackCustom" | "init",
      event: string,
      params?: Record<string, unknown>,
    ) => void;
    _fbq?: unknown;
  }
}

export function trackMeta(
  event: string,
  params?: MetaContent | Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", event, params as Record<string, unknown> | undefined);
}

export function metaProductPayload(product: {
  slug: string;
  name: string;
  price: number;
  category?: string;
  type?: string;
}): MetaContent {
  return {
    content_name: product.name,
    content_ids: [product.slug],
    content_type: "product",
    content_category: product.category || product.type,
    value: product.price,
    currency: "KES",
    num_items: 1,
  };
}
