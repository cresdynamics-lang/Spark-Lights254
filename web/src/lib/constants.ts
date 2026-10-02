export const SITE = {
  name: "Sparklights",
  fullName: "Sparklights 254",
  tagline: "254 · Lighting · Nairobi",
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
  /** PLACEHOLDER — confirm exact map pin to 5 decimals with client */
  geo: { lat: -1.28333, lng: 36.81667 },
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  url: "https://sparklights.co.ke",
  /** PLACEHOLDER social profiles */
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
