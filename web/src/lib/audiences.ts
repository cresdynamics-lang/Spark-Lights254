import type { Product } from "@/lib/data";
import { products } from "@/lib/data";

export type AudiencePage = {
  slug: string;
  path: string;
  breadcrumb: string;
  title: string;
  h1: string;
  description: string;
  cardsTitle: string;
  cardsSubtitle?: string;
  cards: { title: string; body: string; tag?: string }[];
  guideEyebrow: string;
  guideTitle: string;
  guideIntro?: string;
  guideRows: [string, string, string][];
  guideHeaders: [string, string, string];
  packages?: {
    eyebrow: string;
    title: string;
    items: { tier: string; name: string; price: string; bullets: string[] }[];
  };
  process?: { title: string; steps: { n: string; title: string; body: string }[] };
  productsTitle: string;
  productSlugs: string[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryHref?: string;
};

function pick(...slugs: string[]): string[] {
  return slugs.filter((s) => products.some((p) => p.slug === s));
}

export const audiences: AudiencePage[] = [
  {
    slug: "podcast-studio-lighting-nairobi",
    path: "/podcast-studio-lighting-nairobi",
    breadcrumb: "Spaces / Podcast & Studio",
    title: "Podcast & Studio Lighting in Nairobi | Sparklights 254",
    h1: "Podcast & Studio Lighting in Nairobi",
    description:
      "Look as good as you sound. Soft, flattering light and a backdrop with depth for podcasters, creators and small studios.",
    cardsTitle: "Three looks. Pick the one that matches your show.",
    cardsSubtitle: "Choose your set",
    cards: [
      {
        title: "The warm backdrop",
        body: "Up-and-down wall lights wash the wall behind you with a warm glow. Cosy, talk-show feel.",
        tag: "Most popular",
      },
      {
        title: "The clean minimal",
        body: "A soft ring or flat ceiling light for even, shadow-free light. Modern and calm.",
        tag: "Small rooms",
      },
      {
        title: "The glow accent",
        body: "Slim LED wall bars that frame the shot with a thin line of light. Cinematic.",
        tag: "Video podcasts",
      },
    ],
    guideEyebrow: "Setup guide",
    guideTitle: "What every podcast set needs",
    guideIntro: "The right light does more for a video than a better camera. Here is the simple version.",
    guideHeaders: ["Layer", "What it does", "Our pick"],
    guideRows: [
      ["Soft main light", "Even light on the face, no hard shadows", "Ring or flat ceiling light"],
      ["Backdrop light", "Adds depth and hides a flat wall", "Up-down wall lights"],
      ["Accent in shot", "A visible lamp or LED line that looks designed", "Slim LED wall bar"],
      ["Control", "Change the mood for each recording", "Dimmer or remote"],
    ],
    packages: {
      eyebrow: "Done for you",
      title: "Podcast lighting packages",
      items: [
        {
          tier: "Starter",
          name: "Home podcast",
          price: "From KES 00,000",
          bullets: ["One main light", "One backdrop light", "Delivered in Nairobi"],
        },
        {
          tier: "Studio",
          name: "Small studio",
          price: "From KES 00,000",
          bullets: ["Main and fill lights", "Two backdrop lights", "Dimmer and installation"],
        },
        {
          tier: "Pro",
          name: "Multi-camera set",
          price: "From KES 00,000",
          bullets: ["Full layered plan", "Custom backdrop design", "Site visit included"],
        },
      ],
    },
    productsTitle: "Lights creators choose",
    productSlugs: pick(
      "aurum-up-down-wall-light",
      "onyx-up-down-wall-light",
      "opal-globe-wall-light",
      "cadence-wall-light"
    ),
    faqs: [
      {
        q: "What lighting do I need for a podcast?",
        a: "A soft main light for your face, a backdrop light for depth, and one control to change the mood.",
      },
      {
        q: "Warm or white light?",
        a: "Warm around 3000K feels inviting on camera; neutral around 4000K looks cleaner. Keep every light the same colour.",
      },
      { q: "Do you install in studios?", a: "Yes. Installation is quoted by site and fitted by our team." },
      {
        q: "Can you design the whole backdrop?",
        a: "Yes — send a photo of your set and we will suggest a layered plan.",
      },
    ],
    ctaTitle: "Show us your set",
    ctaBody: "Send a photo of your recording space and we will suggest the look.",
    ctaPrimary: "Send a photo on WhatsApp",
    ctaSecondary: "Get a quote",
    ctaPrimaryHref: "/request-a-quote",
  },
  {
    slug: "study-lamps-nairobi",
    path: "/study-lamps-nairobi",
    breadcrumb: "Spaces / Students",
    title: "Study Lamps & Student Lighting in Nairobi | Sparklights",
    h1: "Study Lamps & Student Lighting in Nairobi",
    description:
      "Bright, comfortable light for long nights of reading. Affordable, delivered to your hostel, bedsitter or home.",
    cardsTitle: "What do you need for your room?",
    cardsSubtitle: "Pick your space",
    cards: [
      {
        title: "Bedsitter or hostel ceiling",
        body: "One bright, even ceiling light so the whole room works for study.",
        tag: "Under KES 0,000",
      },
      {
        title: "Reading corner",
        body: "A wall light beside the bed or desk for focused light without glare.",
        tag: "Wall light",
      },
      {
        title: "Desk setup",
        body: "A slim ring or desk lamp that lights books and a laptop evenly.",
        tag: "Desk lamp",
      },
    ],
    guideEyebrow: "Study guide",
    guideTitle: "Light that is kind to your eyes",
    guideIntro: "Short answers students can act on in a minute.",
    guideHeaders: ["Question", "Simple answer", "Why"],
    guideRows: [
      ["Warm or white?", "Neutral white, about 4000K", "Keeps you alert without feeling harsh"],
      ["How bright?", "Bright enough to read without squinting", "Dim light makes you tired faster"],
      ["Where to place it?", "To the side and slightly above the page", "Stops shadows from your hand"],
      ["Power cuts?", "Choose a rechargeable lamp", "[Confirm stock]"],
    ],
    packages: {
      eyebrow: "Budget friendly",
      title: "Student bundles",
      items: [
        {
          tier: "Hostel",
          name: "One room",
          price: "From KES 00,000",
          bullets: ["Ceiling light", "Desk lamp", "Delivered to campus area"],
        },
        {
          tier: "Bedsitter",
          name: "Small flat",
          price: "From KES 00,000",
          bullets: ["Ceiling light", "Wall light", "Bulbs included"],
        },
        {
          tier: "Move-in",
          name: "First home",
          price: "From KES 00,000",
          bullets: ["Lights for three rooms", "Installation quote", "Pay by M-Pesa"],
        },
      ],
    },
    productsTitle: "Popular with students",
    productSlugs: pick(
      "halo-ring-ceiling-light",
      "aurora-ring-ceiling",
      "opal-globe-wall-light",
      "lumen-flush-ceiling"
    ),
    faqs: [
      {
        q: "Do you deliver to hostels?",
        a: "Yes. Share the location on WhatsApp and we will confirm the time.",
      },
      { q: "Can I pay with M-Pesa?", a: "Yes — M-Pesa, Visa and Mastercard." },
      {
        q: "Do you offer student prices?",
        a: "Ask on WhatsApp about current student bundles and move-in packs.",
      },
      {
        q: "Will it fit my ceiling?",
        a: "Send a photo and rough measurements — we will confirm before you buy.",
      },
    ],
    ctaTitle: "Light up your study space",
    ctaBody: "Tell us your room and budget on WhatsApp. We will suggest the right light.",
    ctaPrimary: "Chat on WhatsApp",
    ctaSecondary: "See all lamps",
    ctaPrimaryHref: "/shop/table-floor-lamps",
  },
  {
    slug: "office-lighting-nairobi",
    path: "/office-lighting-nairobi",
    breadcrumb: "Spaces / Offices",
    title: "Office Lighting in Nairobi | Supply & Installation",
    h1: "Office Lighting in Nairobi",
    description:
      "Design, supply and installation for offices that feel as good as they perform. From home offices to reception areas.",
    cardsTitle: "Lighting for every part of the office",
    cardsSubtitle: "By area",
    cards: [
      {
        title: "Open plan & private offices",
        body: "Even, glare-free light that keeps people comfortable through the day.",
        tag: "Work areas",
      },
      {
        title: "Reception & waiting areas",
        body: "A statement light that gives clients a first impression worth remembering.",
        tag: "Impression",
      },
      {
        title: "Meeting rooms & corridors",
        body: "Warm pendants and wall lights that feel professional and welcoming.",
        tag: "Welcome",
      },
    ],
    guideEyebrow: "Office guide",
    guideTitle: "Getting the basics right",
    guideHeaders: ["Area", "Typical goal", "Common choice"],
    guideRows: [
      ["Desks & computer work", "Even light, no screen glare", "Soft ceiling lights"],
      ["Reception", "Welcoming, brand-worthy", "Chandelier or pendants"],
      ["Meeting rooms", "Flexible brightness", "Dimmable ceiling light"],
      ["Corridors", "Safe, continuous light", "Flush ceiling lights"],
    ],
    process: {
      title: "From brief to lit office",
      steps: [
        { n: "1", title: "Brief", body: "Tell us the space and goals." },
        { n: "2", title: "Plan", body: "We suggest fixtures and layout." },
        { n: "3", title: "Quote", body: "A clear price for supply and fitting." },
        { n: "4", title: "Install", body: "Our team fits it with minimal disruption." },
      ],
    },
    productsTitle: "Popular for offices",
    productSlugs: pick(
      "halo-ring-ceiling-light",
      "aurora-ring-ceiling",
      "trio-gold-ceiling-light",
      "clarity-glass-pendant"
    ),
    faqs: [
      { q: "Do you supply bulk orders?", a: "Yes. Request a quote for your quantity." },
      {
        q: "Can you install after hours?",
        a: "Yes — we schedule installs to minimise disruption.",
      },
      { q: "Do you help with the layout?", a: "Yes. Send a floor plan or photos and we will propose a layout." },
      { q: "Do you work with contractors?", a: "Yes — see our trade programme on the quote page." },
    ],
    ctaTitle: "Planning an office?",
    ctaBody: "Send the floor plan or photos. We will reply with a plan and a quote.",
    ctaPrimary: "Request a quote",
    ctaSecondary: "Send plans on WhatsApp",
    ctaPrimaryHref: "/request-a-quote",
  },
  {
    slug: "hotel-restaurant-lighting-nairobi",
    path: "/hotel-restaurant-lighting-nairobi",
    breadcrumb: "Spaces / Hotels & Restaurants",
    title: "Hotel & Restaurant Lighting in Nairobi | Sparklights",
    h1: "Hotel & Restaurant Lighting in Nairobi",
    description: "Lighting that sets the mood before the first plate arrives.",
    cardsTitle: "Lighting for every part of the guest journey",
    cardsSubtitle: "By space",
    cards: [
      {
        title: "Lobby & dining room",
        body: "Chandeliers and layered light that make a room feel special.",
        tag: "Statement",
      },
      {
        title: "Bars, lounges & corridors",
        body: "Warm wall lights that create intimacy and guide guests.",
        tag: "Ambiance",
      },
      {
        title: "Terraces & entrances",
        body: "Weather-ready wall lights that welcome guests after dark.",
        tag: "Outdoor",
      },
    ],
    guideEyebrow: "Atmosphere guide",
    guideTitle: "What makes a room feel right",
    guideHeaders: ["Space", "Goal", "Light style"],
    guideRows: [
      ["Fine dining", "Intimate, unhurried", "Low, warm, dimmable"],
      ["Casual restaurant", "Lively, welcoming", "Warm pendants"],
      ["Hotel rooms", "Restful, flexible", "Layered, with bedside control"],
      ["Lobby", "Memorable first impression", "Large statement fixture"],
    ],
    process: {
      title: "Brief to opening night",
      steps: [
        { n: "1", title: "Visit", body: "We see the space and hear your vision." },
        { n: "2", title: "Design", body: "A layout with fixtures and finishes." },
        { n: "3", title: "Quote", body: "Clear costs and timelines." },
        { n: "4", title: "Install", body: "On site, to your schedule." },
      ],
    },
    productsTitle: "Hospitality favourites",
    productSlugs: pick(
      "aurelia-tiered-chandelier",
      "meridian-black-gold-chandelier",
      "trefoil-pendant",
      "cadence-wall-light"
    ),
    faqs: [
      { q: "Do you work to a hospitality budget?", a: "Yes, we price to the project." },
      {
        q: "Can you meet opening deadlines?",
        a: "Tell us your date — we plan supply and install around it.",
      },
      { q: "Do you supply outside Nairobi?", a: "Yes, countrywide on request." },
      { q: "Do you work with designers?", a: "Yes — trade access is available on the quote page." },
    ],
    ctaTitle: "Opening a restaurant or hotel?",
    ctaBody: "Tell us about the space. We will visit, design and quote.",
    ctaPrimary: "Request a site visit",
    ctaSecondary: "Send plans on WhatsApp",
    ctaPrimaryHref: "/request-a-quote",
  },
  {
    slug: "walkway-corridor-lights-nairobi",
    path: "/walkway-corridor-lights-nairobi",
    breadcrumb: "Spaces / Walkways & Corridors",
    title: "Walkway & Corridor Lights in Nairobi | Sparklights",
    h1: "Walkway & Corridor Lights in Nairobi",
    description:
      "Safe, welcoming light for corridors, stairs, driveways and garden paths. Indoors and out.",
    cardsTitle: "From front gate to back door",
    cardsSubtitle: "By place",
    cards: [
      {
        title: "Indoor corridors",
        body: "Flush crystal or ceiling lights that make narrow halls feel wider.",
        tag: "Indoor",
      },
      {
        title: "Entrances & stairs",
        body: "Warm, glare-free light that is safe for every step.",
        tag: "Safety",
      },
      {
        title: "Gates & garden paths",
        body: "Weatherproof wall lights that light the way and look good.",
        tag: "Outdoor",
      },
    ],
    guideEyebrow: "Path guide",
    guideTitle: "Planning a pathway",
    guideHeaders: ["Question", "Simple answer", "Note"],
    guideRows: [
      ["Mains or solar?", "Solar is good for power cuts", "[Confirm stock]"],
      ["How far apart?", "Light overlaps so there are no dark patches", "Depends on brightness"],
      ["Weatherproof?", "Look for a high IP rating outdoors", "Ask us"],
      ["Security?", "Pair path lights with gate lights", "See wall lights"],
    ],
    productsTitle: "For corridors and walkways",
    productSlugs: pick(
      "lumen-flush-ceiling",
      "nairobi-crystal-flush",
      "onyx-up-down-wall-light",
      "cadence-wall-light"
    ),
    faqs: [
      { q: "Do you install outdoor lights?", a: "Yes, quoted by site." },
      { q: "Do you stock solar?", a: "Ask on WhatsApp for current outdoor and solar options." },
      {
        q: "Can you light a long driveway?",
        a: "Yes — send the length and a photo and we will propose spacing.",
      },
    ],
    ctaTitle: "Lighting a path or corridor?",
    ctaBody: "Send a photo and the length. We will suggest the lights.",
    ctaPrimary: "Send a photo",
    ctaSecondary: "Chat on WhatsApp",
  },
  {
    slug: "accent-display-lighting-nairobi",
    path: "/accent-display-lighting-nairobi",
    breadcrumb: "Spaces / Accent & Display",
    title: "Accent & Display Lighting in Nairobi | Sparklights",
    h1: "Accent & Display Lighting in Nairobi",
    description:
      "Show off what matters. Light for artwork, shelves, feature walls and shop displays, and for tasks where detail matters.",
    cardsTitle: "Make it stand out",
    cardsSubtitle: "Choose your feature",
    cards: [
      {
        title: "Feature walls & art",
        body: "Up-down wall lights wash a wall or frame a painting with soft light.",
        tag: "Home",
      },
      {
        title: "Shelves & alcoves",
        body: "Slim LED lines that make shelves and niches glow.",
        tag: "Home",
      },
      {
        title: "Shop & showroom displays",
        body: "Focused light that draws the eye to products and signs.",
        tag: "Business",
      },
    ],
    guideEyebrow: "Detail guide",
    guideTitle: "Light that shows detail",
    guideHeaders: ["Task", "Light needed", "Note"],
    guideRows: [
      ["Artwork", "Soft, angled light", "Avoid glare on glass"],
      ["Shop displays", "Focused, bright light", "Match colours accurately"],
      ["Reading & craft", "Neutral white task light", "Place to the side"],
      ["Make-up", "Even light from both sides", "See bathroom page"],
    ],
    productsTitle: "For accent and display",
    productSlugs: pick(
      "aurum-up-down-wall-light",
      "onyx-up-down-wall-light",
      "opal-globe-wall-light",
      "cadence-wall-light"
    ),
    faqs: [
      { q: "Can you light a painting?", a: "Yes. Send a photo of the wall." },
      { q: "Do you supply for shops?", a: "Yes — request a quote for retail and showroom display." },
      {
        q: "Do you do track lighting?",
        a: "Ask on WhatsApp for current track and accent options.",
      },
    ],
    ctaTitle: "Have something to show off?",
    ctaBody: "Send a photo of the wall, shelf or display. We will suggest the light.",
    ctaPrimary: "Send a photo",
    ctaSecondary: "Request a quote",
    ctaPrimaryHref: "/request-a-quote",
  },
  {
    slug: "restaurant-lighting-nairobi",
    path: "/restaurant-lighting-nairobi",
    breadcrumb: "Spaces / Restaurants",
    title: "Restaurant Lighting Nairobi | Pendants & Wall Lights",
    h1: "Restaurant Lighting in Nairobi",
    description:
      "Warm, welcoming restaurant lighting in Nairobi. Pendants, wall lights and chandeliers, supplied and installed.",
    cardsTitle: "Set the mood for every service",
    cards: [
      { title: "Dining room", body: "Warm pendants and dimmable layers for intimate tables.", tag: "Core" },
      { title: "Bar & lounge", body: "Wall wash and accent glow that guides guests.", tag: "Ambiance" },
      { title: "Entrance", body: "A statement piece that says welcome before the menu arrives.", tag: "First look" },
    ],
    guideEyebrow: "Atmosphere",
    guideTitle: "Restaurant lighting basics",
    guideHeaders: ["Space", "Goal", "Style"],
    guideRows: [
      ["Fine dining", "Intimate", "Low warm dimmable"],
      ["Casual", "Lively", "Warm pendants"],
      ["Bar", "Guide & glow", "Wall lights"],
    ],
    productsTitle: "Restaurant favourites",
    productSlugs: pick("trefoil-pendant", "clarity-glass-pendant", "cadence-wall-light", "aurelia-tiered-chandelier"),
    faqs: [
      { q: "Do you install in restaurants?", a: "Yes — scheduled around your service hours." },
      { q: "Can you meet opening deadlines?", a: "Tell us the date and we plan supply and install." },
      { q: "Do you work with designers?", a: "Yes — see the trade programme on the quote page." },
    ],
    ctaTitle: "Opening a restaurant?",
    ctaBody: "Tell us about the space. We will visit, design and quote.",
    ctaPrimary: "Request a quote",
    ctaSecondary: "Send plans on WhatsApp",
    ctaPrimaryHref: "/request-a-quote",
  },
  {
    slug: "hotel-lighting-kenya",
    path: "/hotel-lighting-kenya",
    breadcrumb: "Spaces / Hotels",
    title: "Hotel Lighting Kenya | Lobby, Rooms & Restaurants",
    h1: "Hotel Lighting in Kenya",
    description:
      "Lobby chandeliers, bedside lights and corridor lighting for hotels and lodges. Supplied and installed countrywide.",
    cardsTitle: "Guest journey lighting",
    cards: [
      { title: "Lobby", body: "Memorable statement lighting for first impressions.", tag: "Arrival" },
      { title: "Guest rooms", body: "Restful layered light with bedside control.", tag: "Rest" },
      { title: "Corridors", body: "Safe, continuous flush lighting overnight.", tag: "Circulate" },
    ],
    guideEyebrow: "Hotel guide",
    guideTitle: "What guests notice",
    guideHeaders: ["Area", "Goal", "Choice"],
    guideRows: [
      ["Lobby", "Memorable", "Statement chandelier"],
      ["Rooms", "Restful", "Layered bedside"],
      ["Corridors", "Safe", "Flush ceilings"],
    ],
    productsTitle: "Hotel favourites",
    productSlugs: pick("meridian-black-gold-chandelier", "opal-globe-wall-light", "halo-ring-ceiling-light", "lumen-flush-ceiling"),
    faqs: [
      { q: "Do you supply outside Nairobi?", a: "Yes, countrywide on request." },
      { q: "Can you meet opening deadlines?", a: "Yes — we plan to your schedule." },
      { q: "Do you work with designers?", a: "Yes — trade access available." },
    ],
    ctaTitle: "Lighting a hotel or lodge?",
    ctaBody: "Request a site visit and we will design and quote.",
    ctaPrimary: "Request a site visit",
    ctaSecondary: "Send plans on WhatsApp",
    ctaPrimaryHref: "/request-a-quote",
  },
  {
    slug: "outdoor-path-lights-nairobi",
    path: "/outdoor-path-lights-nairobi",
    breadcrumb: "Spaces / Outdoor paths",
    title: "Outdoor Path & Gate Lights Nairobi | Weatherproof",
    h1: "Outdoor Path & Gate Lights",
    description:
      "Weatherproof wall lights and path lights for gates, gardens and driveways. Delivered across Kenya.",
    cardsTitle: "Light the way home",
    cards: [
      { title: "Gate", body: "Weatherproof wall lights that welcome guests after dark.", tag: "Entry" },
      { title: "Garden path", body: "Even path light without dark patches.", tag: "Path" },
      { title: "Driveway", body: "Long runs planned for overlap and security.", tag: "Drive" },
    ],
    guideEyebrow: "Outdoor guide",
    guideTitle: "Path planning",
    guideHeaders: ["Question", "Answer", "Note"],
    guideRows: [
      ["Mains or solar?", "Solar helps in power cuts", "[Confirm stock]"],
      ["Spacing?", "Overlap beams", "Ask us"],
      ["IP rating?", "High outdoors", "Confirm zone"],
    ],
    productsTitle: "Outdoor picks",
    productSlugs: pick("gate-wall-lantern", "solar-path-light", "courtyard-bulkhead", "onyx-up-down-wall-light"),
    faqs: [
      { q: "Do you install outdoor lights?", a: "Yes, quoted by site." },
      { q: "Do you stock solar?", a: "Ask on WhatsApp for current options." },
      { q: "Can you light a long driveway?", a: "Yes — send length and photos." },
    ],
    ctaTitle: "Lighting a path or gate?",
    ctaBody: "Send a photo and the length. We will suggest the lights.",
    ctaPrimary: "Send a photo",
    ctaSecondary: "Chat on WhatsApp",
  },
  {
    slug: "shop-display-lighting-nairobi",
    path: "/shop-display-lighting-nairobi",
    breadcrumb: "Spaces / Shop display",
    title: "Shop Display Lighting Nairobi | Retail & Showroom",
    h1: "Shop & Showroom Display Lighting",
    description:
      "Focused, accurate lighting for shops and showrooms in Nairobi. Supplied and installed. Request a quote.",
    cardsTitle: "Draw the eye to what sells",
    cards: [
      { title: "Product displays", body: "Focused bright light that shows true colour.", tag: "Retail" },
      { title: "Feature walls", body: "Wash and frame key collections.", tag: "Feature" },
      { title: "Counters", body: "Even task light for sales and detail work.", tag: "Service" },
    ],
    guideEyebrow: "Display guide",
    guideTitle: "Retail lighting basics",
    guideHeaders: ["Task", "Need", "Note"],
    guideRows: [
      ["Displays", "Focused bright", "True colour"],
      ["Art / feature", "Soft angled", "No glare"],
      ["Counters", "Even task", "Neutral white"],
    ],
    productsTitle: "Display lights",
    productSlugs: pick("aurum-up-down-wall-light", "cadence-wall-light", "studio-linear-ceiling", "orbit-glow-pendant"),
    faqs: [
      { q: "Do you supply for shops?", a: "Yes — request a quote." },
      { q: "Can you light a painting?", a: "Yes. Send a photo of the wall." },
      { q: "Do you do track lighting?", a: "Ask on WhatsApp for current options." },
    ],
    ctaTitle: "Lighting a shop or showroom?",
    ctaBody: "Send photos of the displays. We will suggest and quote.",
    ctaPrimary: "Request a quote",
    ctaSecondary: "Send a photo",
    ctaPrimaryHref: "/request-a-quote",
  },
];

export function getAudience(slug: string) {
  return audiences.find((a) => a.slug === slug);
}

export function audienceProducts(page: AudiencePage): Product[] {
  return page.productSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];
}
