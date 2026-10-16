export const SITE = {
  name: "Sparklights",
  fullName: "Sparklights 254",
  tagline: "254 · Lighting · Nairobi",
  brandDescription:
    "Sparklights 254 is a Nairobi lighting retailer selling chandeliers, wall lights, ceiling lights, pendant, bedroom, dining and kitchen lights, with delivery and installation across Kenya from New Nyamakima Electrical Point Building, Duruma Road.",
  email: "marykamaa548@gmail.com",
  phoneDisplay: "+254 712 827 840",
  phoneTel: "+254712827840",
  whatsapp: "254712827840",
  whatsappDisplay: "+254 712 827 840",
  /** NAP — must match Google Business Profile exactly */
  streetAddress:
    "Shop 216, 2nd Floor, New Nyamakima Electrical Point Building, Duruma Road",
  address:
    "Nyamakima, Duruma Road, New Nyamakima Electrical Point Building, Shop 216, 2nd Floor, Nairobi, Kenya",
  hours: "Mon – Sat · 8:00 AM – 6:00 PM",
  /** Approximate CBD / Nyamakima pin — refine to exact GBP coords when confirmed */
  geo: { lat: -1.28333, lng: 36.81667 },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=New+Nyamakima+Electrical+Point+Building+Duruma+Road+Nairobi",
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  url: "https://sparklights.co.ke",
  /** Official brand mark — chandelier logo used sitewide */
  logo: "/images/brand/sparklights-logo.jpg",
  /** Add real profile URLs when confirmed — empty values are omitted from schema */
  sameAs: {
    instagram: "",
    facebook: "",
    googleBusiness: "",
  },
} as const;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Sparklights — I’d like help choosing a light for my space.";

export function whatsappUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const ANNOUNCEMENT =
  "Same-day delivery across Nairobi · Installation available · Order on WhatsApp";

export const DELIVERY_AREAS = [
  { name: "Kilimani", slug: "kilimani" },
  { name: "Kileleshwa", slug: "kileleshwa" },
  { name: "Gigiri", slug: "gigiri" },
  { name: "Kitengela", slug: "kitengela" },
  { name: "Rongai", slug: "rongai" },
] as const;
