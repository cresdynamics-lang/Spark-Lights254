import { SITE } from "@/lib/constants";
import { formatPrice, type Product } from "@/lib/data";

export function absoluteAssetUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function productPageUrl(slug: string) {
  return `${SITE.url}/products/${slug}`;
}

/** Rich WhatsApp order text: product photo URL + product page + order details. */
export function productOrderMessage(
  product: Product,
  opts?: { finish?: string; size?: string },
) {
  const page = productPageUrl(product.slug);
  const photo = absoluteAssetUrl(product.image);
  const lines = [
    "Hi Sparklights — I’d like to order this light.",
    "",
    `Product: ${product.name}`,
    `Type: ${product.type}`,
    `Price: ${formatPrice(product.price)}`,
  ];
  if (opts?.finish) lines.push(`Finish: ${opts.finish}`);
  if (opts?.size) lines.push(`Size: ${opts.size}`);
  lines.push(
    "",
    `Product page (open to see the exact light):`,
    page,
    "",
    `Product photo:`,
    photo,
    "",
    "Please confirm:",
    "• Availability / stock for this piece",
    "• Delivery to my area",
    "• Installation quote (if needed)",
  );
  return lines.join("\n");
}
