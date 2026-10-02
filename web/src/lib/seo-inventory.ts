/**
 * SEO page inventory — single source of truth from Preview 2 Missing Sections PDF.
 * Seeded into the database (SeoPage). Do not invent PLACEHOLDER facts.
 */

export type SeoFamily =
  | "home"
  | "category"
  | "audience"
  | "conversion"
  | "journal"
  | "area"
  | "product"
  | "policy"
  | "other";

export type SeoSchemaType =
  | "WebPage"
  | "CollectionPage"
  | "Article"
  | "Product"
  | "LocalBusiness"
  | "AboutPage"
  | "ContactPage";

export type SeoInventoryRow = {
  path: string;
  title: string;
  description: string;
  h1: string;
  family: SeoFamily;
  schemaType: SeoSchemaType;
  parentPath: string | null;
  indexable: boolean;
  published: boolean;
  /** Phase for area pages: 1 live, 2/3 draft until real job */
  phase?: 1 | 2 | 3;
  audienceHref?: string;
};

function assertLen(path: string, title: string, description: string) {
  if (title.length > 60) {
    throw new Error(`SEO inventory title >60 for ${path}: ${title.length} "${title}"`);
  }
  if (description.length > 155) {
    throw new Error(
      `SEO inventory description >155 for ${path}: ${description.length}`
    );
  }
}

const rows: SeoInventoryRow[] = [
  // Home
  {
    path: "/",
    title: "Sparklights 254 | Lighting Shop Nairobi",
    description:
      "Chandeliers, wall lights and ceiling lights for Kenyan homes. Same-day Nairobi delivery and installation. Order on WhatsApp.",
    h1: "Light that makes a house feel like home.",
    family: "home",
    schemaType: "WebPage",
    parentPath: null,
    indexable: true,
    published: true,
  },
  // Categories — keep bedroom URL live
  {
    path: "/category/bedroom-lights",
    title: "Bedroom Lights in Nairobi | Ceiling & Wall Lights",
    description:
      "Ceiling lights, wall lights and bedside lighting for restful bedrooms. Delivered in Nairobi the same day. Order on WhatsApp.",
    h1: "Bedroom Lights in Nairobi",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/category/kitchen-lights",
    title: "Kitchen Lights in Nairobi | Pendants & Ceiling Lights",
    description:
      "Pendants over the island and bright, even light for worktops. Delivered in Nairobi and installed on request.",
    h1: "Kitchen Lights in Nairobi",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/category/bathroom-lights",
    title: "Bathroom & Mirror Lights in Nairobi | Sparklights",
    description:
      "Mirror lights and sealed ceiling lights for bathrooms. Clear, flattering light chosen for damp rooms. Delivered in Nairobi.",
    h1: "Bathroom & Mirror Lights in Nairobi",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/shop/chandeliers",
    title: "Chandeliers in Nairobi | Crystal, Gold & Modern",
    description:
      "Crystal, gold and modern chandeliers for dining rooms and entrances. Delivered across Kenya. Order on WhatsApp.",
    h1: "Chandeliers",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/shop/wall-lights",
    title: "Wall Lights in Nairobi | Sconces & Accents",
    description:
      "Up-down wall lights, crystal sconces and glowing accents for hallways and bedrooms. Delivered in Nairobi.",
    h1: "Wall Lights",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/shop/ceiling-lights",
    title: "Ceiling Lights in Nairobi | Flush & Semi-Flush",
    description:
      "Flush and semi-flush ceiling lights for living rooms, bedrooms and apartments. Delivered and installed.",
    h1: "Ceiling Lights",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/shop/pendant-lights",
    title: "Pendant Lights Nairobi | Island & Dining Pendants",
    description:
      "Single pendants and clusters for islands, dining tables and double-height spaces. Order on WhatsApp.",
    h1: "Pendant Lights",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/shop",
    title: "Shop All Lighting Nairobi | Sparklights 254",
    description:
      "Browse every chandelier, wall light, ceiling light and pendant. Search by style or room. Order on WhatsApp.",
    h1: "Shop all lighting",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/collection",
    title: "Lighting Collection Nairobi | Shop by Style",
    description:
      "Explore crystal, gold & brass, black, natural timber and glowing lights. Shop the Sparklights lookbook in Nairobi.",
    h1: "Explore the collection",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/collection/crystal",
    title: "Crystal Lighting in Nairobi | Sparklights",
    description:
      "Crystal chandeliers and glass fixtures for dining rooms and entrances. Delivered and installed across Nairobi.",
    h1: "Crystal lighting in Nairobi",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/collection",
    indexable: true,
    published: true,
  },
  {
    path: "/collection/gold-brass",
    title: "Gold & Brass Lighting Nairobi | Sparklights",
    description:
      "Warm gold and brass wall lights, pendants and ceiling fixtures. Delivered across Nairobi. Order on WhatsApp.",
    h1: "Gold and brass lighting in Nairobi",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/collection",
    indexable: true,
    published: true,
  },
  {
    path: "/collection/black",
    title: "Black Lighting in Nairobi | Modern Fixtures",
    description:
      "Matte and polished black lights for modern rooms. Chandeliers, wall lights and ceiling fixtures in Nairobi.",
    h1: "Black lighting in Nairobi",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/collection",
    indexable: true,
    published: true,
  },
  {
    path: "/collection/natural",
    title: "Natural Timber Lighting Nairobi | Sparklights",
    description:
      "Wood, rattan and natural-texture lights for softer rooms. Delivered in Nairobi. Order on WhatsApp.",
    h1: "Natural timber and rattan lighting",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/collection",
    indexable: true,
    published: true,
  },
  {
    path: "/collection/glowing",
    title: "Glowing LED Lighting Nairobi | Sparklights",
    description:
      "Soft-glow and LED light sculptures for living rooms and bedrooms. Delivered and installed in Nairobi.",
    h1: "Glowing LED lighting in Nairobi",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/collection",
    indexable: true,
    published: true,
  },
  {
    path: "/sale",
    title: "Sale Lighting Nairobi | Best Sellers",
    description:
      "Best-selling chandeliers, wall lights and ceiling lights on sale. Delivered across Nairobi. Order on WhatsApp.",
    h1: "Best sellers, ready to order.",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/new-arrivals",
    title: "New Arrivals Lighting Nairobi | Sparklights",
    description:
      "Newly arrived lights for dining rooms, bedrooms and feature walls. Shop new stock in Nairobi on WhatsApp.",
    h1: "New arrivals",
    family: "category",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  // Audience
  {
    path: "/podcast-studio-lighting-nairobi",
    title: "Podcast & Studio Lighting in Nairobi | Sparklights 254",
    description:
      "Look as good as you sound. Soft lighting, backdrops and installation for podcasts and studios in Nairobi. Same-day delivery. Order on WhatsApp.",
    h1: "Podcast & Studio Lighting in Nairobi",
    family: "audience",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/study-lamps-nairobi",
    title: "Study Lamps & Student Lighting in Nairobi | Sparklights",
    description:
      "Study lamps and ceiling lights for hostels and bedsitters. Affordable, delivered fast in Nairobi. Pay by M-Pesa. Order on WhatsApp.",
    h1: "Study Lamps & Student Lighting in Nairobi",
    family: "audience",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/office-lighting-nairobi",
    title: "Office Lighting in Nairobi | Supply & Installation",
    description:
      "Design, supply and installation of office lighting in Nairobi. Reception, meeting rooms and open plan. Request a quote today.",
    h1: "Office Lighting in Nairobi",
    family: "audience",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/hotel-restaurant-lighting-nairobi",
    title: "Hotel & Restaurant Lighting in Nairobi | Sparklights",
    description:
      "Lighting that sets the mood in restaurants, hotels, lodges and bars. Design, supply and installation across Kenya. Request a site visit.",
    h1: "Hotel & Restaurant Lighting in Nairobi",
    family: "audience",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/restaurant-lighting-nairobi",
    title: "Restaurant Lighting Nairobi | Pendants & Wall Lights",
    description:
      "Warm, welcoming restaurant lighting in Nairobi. Pendants, wall lights and chandeliers, supplied and installed.",
    h1: "Restaurant Lighting in Nairobi",
    family: "audience",
    schemaType: "CollectionPage",
    parentPath: "/hotel-restaurant-lighting-nairobi",
    indexable: true,
    published: true,
  },
  {
    path: "/hotel-lighting-kenya",
    title: "Hotel Lighting Kenya | Lobby, Rooms & Restaurants",
    description:
      "Lobby chandeliers, bedside lights and corridor lighting for hotels and lodges. Supplied and installed countrywide.",
    h1: "Hotel Lighting in Kenya",
    family: "audience",
    schemaType: "CollectionPage",
    parentPath: "/hotel-restaurant-lighting-nairobi",
    indexable: true,
    published: true,
  },
  {
    path: "/walkway-corridor-lights-nairobi",
    title: "Walkway & Corridor Lights in Nairobi | Sparklights",
    description:
      "Safe, welcoming light for corridors, stairs, driveways and garden paths. Indoor and outdoor. Delivered and installed.",
    h1: "Walkway & Corridor Lights in Nairobi",
    family: "audience",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/outdoor-path-lights-nairobi",
    title: "Outdoor Path & Gate Lights Nairobi | Weatherproof",
    description:
      "Weatherproof wall lights and path lights for gates, gardens and driveways. Delivered across Kenya.",
    h1: "Outdoor Path & Gate Lights",
    family: "audience",
    schemaType: "CollectionPage",
    parentPath: "/walkway-corridor-lights-nairobi",
    indexable: true,
    published: true,
  },
  {
    path: "/accent-display-lighting-nairobi",
    title: "Accent & Display Lighting in Nairobi | Sparklights",
    description:
      "Light for artwork, shelves, feature walls and shop displays. Supplied and installed in Nairobi. Order on WhatsApp.",
    h1: "Accent & Display Lighting in Nairobi",
    family: "audience",
    schemaType: "CollectionPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/shop-display-lighting-nairobi",
    title: "Shop Display Lighting Nairobi | Retail & Showroom",
    description:
      "Focused, accurate lighting for shops and showrooms in Nairobi. Supplied and installed. Request a quote.",
    h1: "Shop & Showroom Display Lighting",
    family: "audience",
    schemaType: "CollectionPage",
    parentPath: "/accent-display-lighting-nairobi",
    indexable: true,
    published: true,
  },
  // Conversion
  {
    path: "/request-a-quote",
    title: "Request a Lighting Quote | Offices, Venues & Trade",
    description:
      "Offices, hotels, restaurants, designers and contractors: tell us about the space and we reply with a plan and a price.",
    h1: "Quotes for Offices, Venues and Trade",
    family: "conversion",
    schemaType: "WebPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/showroom",
    title: "Visit the Sparklights 254 Showroom | Nairobi",
    description:
      "See the lights before you buy at our Nyamakima showroom on Duruma Road. Book a visit on WhatsApp.",
    h1: "Come and see the lights",
    family: "conversion",
    schemaType: "LocalBusiness",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/delivery",
    title: "Delivery & Installation Across Kenya | Sparklights 254",
    description:
      "Same-day delivery across Nairobi and installation countrywide. Lighting delivered and fitted by our team.",
    h1: "Delivery & Installation",
    family: "conversion",
    schemaType: "WebPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/delivery/nairobi",
    title: "Lighting Delivery in Nairobi | Same-Day | Sparklights",
    description:
      "Same-day lighting delivery across Nairobi. Kilimani, Kileleshwa, Gigiri and beyond. Order on WhatsApp.",
    h1: "Lighting Delivery in Nairobi",
    family: "area",
    schemaType: "WebPage",
    parentPath: "/delivery",
    indexable: true,
    published: true,
    phase: 1,
  },
  {
    path: "/contact",
    title: "Contact Sparklights 254 | WhatsApp & Showroom",
    description:
      "Chat on WhatsApp or visit our Nyamakima showroom. Phone, email and directions for Sparklights 254.",
    h1: "Contact",
    family: "conversion",
    schemaType: "ContactPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/about",
    title: "About Sparklights 254 | Nairobi Lighting Studio",
    description:
      "Who we are, how we deliver and install lighting across Kenya, and how to reach a human on WhatsApp.",
    h1: "About Sparklights 254",
    family: "other",
    schemaType: "AboutPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  // Journal hub + 13 guides (titles trimmed to ≤60 where PDF exceeded)
  {
    path: "/journal",
    title: "The Lighting Journal | Guides for Kenyan Homes",
    description:
      "Practical lighting guides for homes, offices and venues in Kenya, written by the team who install them.",
    h1: "The Lighting Journal",
    family: "journal",
    schemaType: "WebPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/journal/podcast-lighting-setup-kenya",
    title: "How to Light a Podcast Set in Nairobi",
    description:
      "Soft main light, backdrop depth and control — a creator-ready podcast lighting setup for Nairobi studios.",
    h1: "How to Light a Podcast Set in Nairobi",
    family: "journal",
    schemaType: "Article",
    parentPath: "/journal",
    indexable: true,
    published: true,
    audienceHref: "/podcast-studio-lighting-nairobi",
  },
  {
    path: "/journal/best-lighting-for-studying-kenya",
    title: "Best Lighting for Studying at Night | Student Guide",
    description:
      "Neutral light, desk placement and budget options for hostels and bedsitters in Nairobi.",
    h1: "The Best Lighting for Studying at Night",
    family: "journal",
    schemaType: "Article",
    parentPath: "/journal",
    indexable: true,
    published: true,
    audienceHref: "/study-lamps-nairobi",
  },
  {
    path: "/journal/office-lighting-guide-kenya",
    title: "Office Lighting Guide | How Bright Should It Be?",
    description:
      "How bright your workspace should be, and which fixtures suit reception, desks and meeting rooms in Kenya.",
    h1: "Office Lighting Guide for Kenyan Workspaces",
    family: "journal",
    schemaType: "Article",
    parentPath: "/journal",
    indexable: true,
    published: true,
    audienceHref: "/office-lighting-nairobi",
  },
  {
    path: "/journal/restaurant-lighting-ideas-kenya",
    title: "Restaurant Lighting Ideas for Warm Dining Rooms",
    description:
      "Atmosphere-first restaurant lighting: pendants, wall wash and dimmers for Kenyan venues.",
    h1: "Restaurant Lighting Ideas for Warm Rooms",
    family: "journal",
    schemaType: "Article",
    parentPath: "/journal",
    indexable: true,
    published: true,
    audienceHref: "/hotel-restaurant-lighting-nairobi",
  },
  {
    path: "/journal/bedroom-lighting-ideas-kenya",
    title: "Bedroom Lighting: Warm or Cool? A Simple Guide",
    description:
      "Restful colour temperature and layered bedside lighting for Nairobi bedrooms.",
    h1: "Bedroom Lighting: Warm or Cool?",
    family: "journal",
    schemaType: "Article",
    parentPath: "/journal",
    indexable: true,
    published: true,
    audienceHref: "/category/bedroom-lights",
  },
  {
    path: "/journal/bathroom-lighting-ip-rating-guide",
    title: "Bathroom Lighting: What IP Rating Do You Need?",
    description:
      "Safe lighting near water explained without jargon. Mirror and ceiling picks for Nairobi bathrooms.",
    h1: "What IP Rating Does a Bathroom Light Need?",
    family: "journal",
    schemaType: "Article",
    parentPath: "/journal",
    indexable: true,
    published: true,
    audienceHref: "/category/bathroom-lights",
  },
  {
    path: "/journal/kitchen-lighting-ideas-kenya",
    title: "Kitchen Lighting in Three Simple Layers",
    description:
      "Island pendants, worktop task light and ambient glow for Kenyan kitchens.",
    h1: "Kitchen Lighting in Three Simple Layers",
    family: "journal",
    schemaType: "Article",
    parentPath: "/journal",
    indexable: true,
    published: true,
    audienceHref: "/category/kitchen-lights",
  },
  {
    path: "/journal/corridor-lighting-ideas",
    title: "How to Light a Long, Narrow Corridor",
    description:
      "Spacing, flush lights and outdoor path options for corridors and walkways in Nairobi.",
    h1: "How to Light a Long, Narrow Corridor",
    family: "journal",
    schemaType: "Article",
    parentPath: "/journal",
    indexable: true,
    published: true,
    audienceHref: "/walkway-corridor-lights-nairobi",
  },
  {
    path: "/journal/solar-vs-mains-outdoor-lights-kenya",
    title: "Solar or Mains? Outdoor Lights in Kenya",
    description:
      "How to choose between solar and mains outdoor lights for gates, gardens and driveways in Kenya.",
    h1: "Solar or Mains? Choosing Outdoor Lights",
    family: "journal",
    schemaType: "Article",
    parentPath: "/journal",
    indexable: true,
    published: true,
    audienceHref: "/outdoor-path-lights-nairobi",
  },
  {
    path: "/journal/how-to-light-artwork-at-home",
    title: "How to Light Artwork and Shelves at Home",
    description:
      "Avoid glare and make the piece you love stand out with accent and display lighting.",
    h1: "How to Light Artwork and Shelves at Home",
    family: "journal",
    schemaType: "Article",
    parentPath: "/journal",
    indexable: true,
    published: true,
    audienceHref: "/accent-display-lighting-nairobi",
  },
  {
    path: "/journal/lumens-watts-kelvin-explained",
    title: "Lumens, Watts and Kelvin Explained Simply",
    description:
      "Plain-language guide to lumens, watts and kelvin for Kenyan lighting buyers.",
    h1: "Lumens, Watts and Kelvin Explained",
    family: "journal",
    schemaType: "Article",
    parentPath: "/journal",
    indexable: true,
    published: true,
    audienceHref: "/journal",
  },
  {
    path: "/journal/gypsum-ceiling-lighting-guide-kenya",
    title: "Gypsum Ceiling Lighting: Where to Place Lights",
    description:
      "Where to place every light in a gypsum ceiling for even, beautiful rooms in Kenya.",
    h1: "Gypsum Ceiling Lighting Placement Guide",
    family: "journal",
    schemaType: "Article",
    parentPath: "/journal",
    indexable: true,
    published: true,
    audienceHref: "/shop/ceiling-lights",
  },
  {
    path: "/journal/cost-of-lighting-a-house-nairobi",
    title: "Cost to Light a 3-Bedroom House in Nairobi",
    description:
      "What it typically costs to light a three-bedroom house in Nairobi — fixtures, delivery and installation.",
    h1: "What Does It Cost to Light a House in Nairobi?",
    family: "journal",
    schemaType: "Article",
    parentPath: "/journal",
    indexable: true,
    published: true,
    audienceHref: "/delivery/nairobi",
  },
  // Phase 1 areas
  ...(["kilimani", "kileleshwa", "gigiri", "kitengela", "rongai"] as const).map(
    (slug) => {
      const name = slug.charAt(0).toUpperCase() + slug.slice(1);
      const title = `Lighting Shop in ${name} | Same-Day Delivery | Sparklights`;
      const description = `Chandeliers and ceiling lights delivered to ${name} the same day. Installation available. Order on WhatsApp.`;
      return {
        path: `/delivery/${slug}`,
        title: title.slice(0, 60),
        description: description.slice(0, 155),
        h1: `Lighting Delivery in ${name}`,
        family: "area" as const,
        schemaType: "WebPage" as const,
        parentPath: "/delivery",
        indexable: true,
        published: true,
        phase: 1 as const,
      };
    }
  ),
  // Phase 2 — draft / not in sitemap until real job
  ...[
    "lavington",
    "westlands",
    "karen",
    "langata",
    "runda",
    "ruaka",
    "syokimau",
    "ngong",
    "south-b-c",
    "embakasi",
    "thika-road",
    "athi-river",
  ].map((slug) => {
    const name = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      path: `/delivery/${slug}`,
      title: `Lighting Shop in ${name} | Same-Day Delivery`.slice(0, 60),
      description: `Lighting delivery and installation in ${name}. PLACEHOLDER — publish after first documented job.`.slice(
        0,
        155
      ),
      h1: `Lighting Delivery in ${name}`,
      family: "area" as const,
      schemaType: "WebPage" as const,
      parentPath: "/delivery",
      indexable: false,
      published: false,
      phase: 2 as const,
    };
  }),
  // Phase 3 drafts
  ...["mombasa", "nakuru", "kisumu", "eldoret", "thika", "machakos"].map((slug) => {
    const name = slug.charAt(0).toUpperCase() + slug.slice(1);
    return {
      path: `/delivery/${slug}`,
      title: `Lights Delivered to ${name} | Sparklights 254`.slice(0, 60),
      description: `Countrywide lighting delivery to ${name}. PLACEHOLDER — publish after first documented delivery.`.slice(
        0,
        155
      ),
      h1: `Lights Delivered to ${name}`,
      family: "area" as const,
      schemaType: "WebPage" as const,
      parentPath: "/delivery",
      indexable: false,
      published: false,
      phase: 3 as const,
    };
  }),
  // Policies
  {
    path: "/policies/delivery",
    title: "Delivery Policy | Sparklights 254 Nairobi",
    description:
      "Same-day Nairobi delivery and countrywide options. Timelines, areas and how we confirm your window on WhatsApp.",
    h1: "Delivery Policy",
    family: "policy",
    schemaType: "WebPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/policies/installation",
    title: "Installation Policy | Sparklights 254",
    description:
      "How Sparklights installs lighting in Nairobi homes and venues. What we need on site and how to book.",
    h1: "Installation Policy",
    family: "policy",
    schemaType: "WebPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/policies/warranty",
    title: "Warranty | Sparklights 254 Lighting",
    description:
      "Warranty cover for Sparklights products. PLACEHOLDER period — confirm with the team before launch.",
    h1: "Warranty",
    family: "policy",
    schemaType: "WebPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/policies/returns",
    title: "Returns & Exchanges | Sparklights 254",
    description:
      "Damaged goods and return rules for Sparklights orders. PLACEHOLDER period — confirm with the team.",
    h1: "Returns & Exchanges",
    family: "policy",
    schemaType: "WebPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/policies/payment",
    title: "Payment | M-Pesa and Card | Sparklights 254",
    description:
      "Pay by M-Pesa or card. How Sparklights confirms payment before delivery and installation.",
    h1: "Payment",
    family: "policy",
    schemaType: "WebPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/policies/privacy",
    title: "Privacy Policy | Sparklights 254",
    description:
      "How Sparklights 254 collects and uses contact details shared via WhatsApp, forms and phone.",
    h1: "Privacy Policy",
    family: "policy",
    schemaType: "WebPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
  {
    path: "/policies/terms",
    title: "Terms of Sale | Sparklights 254",
    description:
      "Terms for ordering lighting from Sparklights 254. PLACEHOLDER — add full legal text before launch.",
    h1: "Terms of Sale",
    family: "policy",
    schemaType: "WebPage",
    parentPath: "/",
    indexable: true,
    published: true,
  },
];

for (const r of rows) {
  assertLen(r.path, r.title, r.description);
}

export const SEO_INVENTORY: SeoInventoryRow[] = rows;

export function getInventoryByPath(path: string) {
  const normalised = path.replace(/\/$/, "") || "/";
  return SEO_INVENTORY.find((r) => r.path === normalised);
}
