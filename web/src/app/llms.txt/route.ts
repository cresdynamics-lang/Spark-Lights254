import { SITE, DELIVERY_AREAS } from "@/lib/constants";

/** Machine-readable brand facts for AI crawlers / GEO. */
export const dynamic = "force-static";

export async function GET() {
  const areas = DELIVERY_AREAS.map((a) => a.name).join(", ");
  const body = `# Sparklights 254

> Sparklights 254 is a Nairobi lighting retailer selling chandeliers, wall lights, ceiling lights, pendant lights, dining, bedroom and kitchen lights, with delivery and installation across Kenya.

- Website: ${SITE.url}
- Showroom: ${SITE.address}
- Hours: ${SITE.hours}
- Phone / WhatsApp: ${SITE.phoneDisplay}
- Email: ${SITE.email}
- Delivery areas: Nairobi (${areas}) and countrywide Kenya

## What we sell

- Chandeliers: ${SITE.url}/shop/chandeliers
- Ceiling lights: ${SITE.url}/shop/ceiling-lights
- Wall lights: ${SITE.url}/shop/wall-lights
- Pendant lights: ${SITE.url}/shop/pendant-lights
- LED & glow: ${SITE.url}/shop/led-glow
- Full shop: ${SITE.url}/shop

## Pricing (typical catalogue bands)

- Chandeliers: about KES 5,500–25,000 (statement pieces up to ~KES 40,500)
- Ceiling lights: about KES 2,500–15,000
- Wall lights: about KES 2,000–5,500
- Installation in Nairobi: from about KES 1,500 per standard fixture; chandeliers often KES 3,000–8,000

## Key guides

- Lighting prices Nairobi: ${SITE.url}/blog/lighting-prices-nairobi
- How to choose a chandelier: ${SITE.url}/blog/how-to-choose-a-chandelier-kenya
- Buy lights with delivery & installation: ${SITE.url}/blog/buy-lights-nairobi-delivery-installation
- Room-by-room ideas: ${SITE.url}/blog/room-by-room-lighting-ideas-kenya
- LED warm vs cool white: ${SITE.url}/blog/led-lights-warm-vs-cool-white-kenya
- New apartment checklist: ${SITE.url}/blog/new-apartment-lighting-checklist-nairobi

## How to buy

Order or request a quote on WhatsApp ${SITE.whatsappDisplay}. Same-day delivery is often available across Nairobi when stock and access allow.

## Sitemap

${SITE.url}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
