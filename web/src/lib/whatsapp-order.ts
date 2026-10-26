import { SITE } from "@/lib/constants";
import { formatPrice, type Product } from "@/lib/data";

export function absoluteAssetUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function productPageUrl(slug: string) {
  return `${SITE.url}/products/${slug}`;
}

/** Unique gallery images for this product only (no shared filler photos). */
export function productGalleryImages(product: Pick<Product, "image" | "hoverImage">) {
  const out: string[] = [];
  const push = (src?: string | null) => {
    if (!src) return;
    if (!out.includes(src)) out.push(src);
  };
  push(product.image);
  push(product.hoverImage);
  return out;
}

/**
 * WhatsApp order text with:
 * - Clean product name
 * - Website product page link
 * - Exact product photo URL (this listing only)
 */
export function productOrderMessage(
  product: Product,
  opts?: { finish?: string; size?: string; image?: string },
) {
  const page = productPageUrl(product.slug);
  const photo = absoluteAssetUrl(opts?.image || product.image);
  const lines = [
    "Hi Sparklights — I’d like to order this light.",
    "",
    `*${product.name}*`,
    `Type: ${product.type}`,
    `Price: ${formatPrice(product.price)}`,
  ];
  if (opts?.finish) lines.push(`Finish: ${opts.finish}`);
  if (opts?.size) lines.push(`Size: ${opts.size}`);
  lines.push(
    "",
    "Product page on website:",
    page,
    "",
    "Exact product photo (website image link):",
    photo,
    "",
    "Please confirm availability, installation, and delivery to my area.",
  );
  return lines.join("\n");
}
