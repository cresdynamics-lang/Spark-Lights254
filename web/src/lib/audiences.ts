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
  /** Pull live in-stock products from these categories / rooms (falls back to productSlugs). */
  productCategories?: string[];
  productRooms?: string[];
  /** Short intro paragraph under the hero, written for the searcher. */
  intro?: string;
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
    productCategories: ["chandeliers", "pendant-lights", "wall-lights"],
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
      "Warm, welcoming restaurant lighting in Nairobi. Pendants, wall lights and chandeliers in stock, supplied and installed.",
    intro:
      "The right light fills seats in the evening: warm pendants over tables, glowing walls and a statement piece at the entrance. Opening or refreshing a restaurant, café or bar? Start with the pieces below.",
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
    productCategories: ["pendant-lights", "wall-lights", "chandeliers", "led-glow"],
    productSlugs: pick("trefoil-pendant", "clarity-glass-pendant", "cadence-wall-light", "aurelia-tiered-chandelier"),
    faqs: [
      { q: "Do you install in restaurants?", a: "Yes — scheduled around your service hours." },
      { q: "Can you meet opening deadlines?", a: "Tell us the date and we plan supply and install." },
      { q: "Do you work with designers?", a: "Yes — see the trade programme on the quote page." },
      { q: "What lighting is best for a restaurant at night?", a: "Warm 2700K light, low pendants over tables, glowing wall lights and dimmers so the room gets more intimate as the evening goes on." },
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
      "Luxury lobby chandeliers, bedside lights and corridor lighting for hotels and lodges. In stock, supplied and installed countrywide.",
    intro:
      "Guests judge a hotel in the evening: the lobby on arrival, the restaurant at dinner, the room at night. Layered warm light with one memorable statement piece gets you there.",
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
    productCategories: ["chandeliers", "wall-lights", "ceiling-lights"],
    productSlugs: pick("meridian-black-gold-chandelier", "opal-globe-wall-light", "halo-ring-ceiling-light", "lumen-flush-ceiling"),
    faqs: [
      { q: "Do you supply outside Nairobi?", a: "Yes, countrywide on request." },
      { q: "Can you meet opening deadlines?", a: "Yes — we plan to your schedule." },
      { q: "Do you work with designers?", a: "Yes — trade access available." },
      { q: "How do we give the hotel a luxurious evening look?", a: "A statement chandelier in the lobby, warm wall lights in corridors and lounges, dimmable pendants in the restaurant and outdoor lights on the facade." },
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
  {
    slug: "luxury-home-lighting-nairobi",
    path: "/luxury-home-lighting-nairobi",
    breadcrumb: "Spaces / Home owners",
    title: "Luxury Home Lighting Nairobi | Chandeliers & Pendants",
    h1: "Luxury Home Lighting in Nairobi",
    description:
      "Chandeliers, pendants and wall lights in stock for homes in Karen, Runda, Lavington and across Nairobi. Delivered and installed.",
    intro:
      "Building, renovating or finishing a new home? Light it in layers: one statement piece per room, warm wall light for the evening, and soft ceiling light for everyday living. Everything below is in stock in Nairobi.",
    cardsTitle: "Light every room the way you live in it",
    cardsSubtitle: "By room",
    cards: [
      { title: "Living room", body: "A statement chandelier with warm wall lights for a calm evening glow.", tag: "Statement" },
      { title: "Dining room", body: "A pendant or chandelier centred over the table, on a dimmer.", tag: "Entertaining" },
      { title: "Staircase & double volume", body: "Long-drop chandeliers that fill tall spaces without glare.", tag: "Height" },
      { title: "Bedroom", body: "Soft ceiling light plus bedside wall lights for winding down.", tag: "Rest" },
      { title: "Kitchen island", body: "A row of pendants for clear light on the counter.", tag: "Task" },
      { title: "Outdoor & entrance", body: "Wall and path lights that make the house look good at night.", tag: "Kerb appeal" },
    ],
    guideEyebrow: "Home lighting guide",
    guideTitle: "Choosing the right size and light",
    guideIntro: "Quick rules our team uses on site visits across Nairobi.",
    guideHeaders: ["Space", "Rule of thumb", "Our pick"],
    guideRows: [
      ["Living room", "Chandelier width (cm) ≈ room length + width (m) × 10", "Crystal or tiered chandelier"],
      ["Dining table", "About half to two-thirds of the table width, 75–85 cm above it", "Pendant or round chandelier"],
      ["Double volume", "Bottom of fixture at least 2.4 m off the floor", "Long-drop chandelier"],
      ["Bedroom", "Warm 2700–3000K, dimmable", "Flush ceiling + wall lights"],
      ["Exterior", "Warm light, aimed down and along paths", "Outdoor wall & solar lights"],
    ],
    productsTitle: "In stock for Nairobi homes",
    productSlugs: pick("aurelia-tiered-chandelier", "meridian-black-gold-chandelier", "opal-globe-wall-light", "halo-ring-ceiling-light"),
    productCategories: ["chandeliers", "pendant-lights", "wall-lights"],
    faqs: [
      { q: "Do you deliver and install in Karen, Runda and Lavington?", a: "Yes. We deliver across Nairobi and our team can install chandeliers, pendants and wall lights for you." },
      { q: "What size chandelier do I need for my living room?", a: "Add the room's length and width in metres and multiply by 10 — that is roughly the chandelier width in centimetres. Send us the room size and we will confirm." },
      { q: "Warm white or cool white for a home?", a: "Warm white (2700–3000K) for living rooms, dining and bedrooms. Neutral white (4000K) suits kitchens and studies." },
      { q: "Can I see the lights before buying?", a: "Yes — visit the showroom or ask on WhatsApp for photos and videos of any light in stock." },
      { q: "Can you light a whole new house?", a: "Yes. Send your floor plan and we will suggest lights room by room with one quote." },
    ],
    ctaTitle: "Finishing a home?",
    ctaBody: "Send your floor plan or room photos and we will suggest a light for every room.",
    ctaPrimary: "Get a home lighting quote",
    ctaSecondary: "Send photos on WhatsApp",
    ctaPrimaryHref: "/request-a-quote",
  },
  {
    slug: "interior-designer-lighting-supplier-nairobi",
    path: "/interior-designer-lighting-supplier-nairobi",
    breadcrumb: "Trade / Interior designers",
    title: "Lighting Supplier for Interior Designers Nairobi",
    h1: "Lighting for Interior Designers in Nairobi",
    description:
      "Chandeliers, pendants and wall lights in stock for residential, hotel and commercial projects. Trade pricing and fast supply in Kenya.",
    intro:
      "Specify lights your client can actually get on time. We hold stock in Nairobi, share photos and dimensions fast, and quote by project so your schedule holds.",
    cardsTitle: "Built around how designers work",
    cardsSubtitle: "Trade programme",
    cards: [
      { title: "Stock you can specify", body: "Pieces held in Nairobi, so lead times don't break your handover.", tag: "Availability" },
      { title: "Project quotes", body: "One quote per project with quantities by room or floor.", tag: "Trade pricing" },
      { title: "Fast details", body: "Dimensions, finishes and photos on WhatsApp for your mood boards.", tag: "Specs" },
      { title: "Site support", body: "Our installers work to your layout and your client's dates.", tag: "Install" },
    ],
    guideEyebrow: "Specifying",
    guideTitle: "What we send with every quote",
    guideHeaders: ["Item", "What you get", "Why it helps"],
    guideRows: [
      ["Product details", "Size, finish, lamp type, colour temperature", "Drop straight into your spec sheet"],
      ["Photos", "Real photos of the piece in stock", "Client sign-off without surprises"],
      ["Quantities", "Priced by room, floor or area", "Easy to fit a client budget"],
      ["Timeline", "Supply and install dates", "Plan around other trades"],
    ],
    productsTitle: "Designer favourites in stock",
    productSlugs: pick("meridian-black-gold-chandelier", "trefoil-pendant", "clarity-glass-pendant", "cadence-wall-light"),
    productCategories: ["chandeliers", "pendant-lights", "wall-lights"],
    faqs: [
      { q: "Do you offer trade pricing for interior designers?", a: "Yes. Request a quote with your project details and we price by project and quantity." },
      { q: "Can you share specs and photos for client presentations?", a: "Yes — dimensions, finishes and real photos of the stock, usually the same day on WhatsApp." },
      { q: "Do you supply hospitality and commercial projects?", a: "Yes — homes, hotels, restaurants, offices and shops across Kenya." },
      { q: "Can your team install to my layout?", a: "Yes. Share the lighting layout and we install to it, scheduled with your site." },
    ],
    ctaTitle: "Working on a project?",
    ctaBody: "Send the drawings or a list of spaces and we will come back with options and a trade quote.",
    ctaPrimary: "Request a trade quote",
    ctaSecondary: "Send drawings on WhatsApp",
    ctaPrimaryHref: "/request-a-quote",
  },
  {
    slug: "lighting-supplier-engineers-contractors-kenya",
    path: "/lighting-supplier-engineers-contractors-kenya",
    breadcrumb: "Trade / Engineers & contractors",
    title: "Lighting Supplier for Engineers & Contractors Kenya",
    h1: "Lighting Supply for Engineers & Contractors",
    description:
      "LED ceiling lights, wall lights and decorative fittings in bulk for engineers, contractors and architects in Kenya. Quotes from your BOQ.",
    intro:
      "Send your BOQ or lighting schedule and we will price it line by line from stock — ceiling lights, LED fittings, wall lights, outdoor and decorative pieces.",
    cardsTitle: "Supply that keeps the site moving",
    cardsSubtitle: "For MEP teams",
    cards: [
      { title: "Quote from your BOQ", body: "Line-by-line pricing against your schedule.", tag: "Tender ready" },
      { title: "Bulk stock", body: "Ceiling and LED fittings held in quantity in Nairobi.", tag: "Volume" },
      { title: "Clear specs", body: "Wattage, colour temperature, size and finish for every line.", tag: "Specs" },
      { title: "Phased delivery", body: "Deliver by floor or phase to match the programme.", tag: "Logistics" },
    ],
    guideEyebrow: "Quick reference",
    guideTitle: "Typical lighting by space",
    guideHeaders: ["Space", "Typical approach", "Fitting type"],
    guideRows: [
      ["Offices", "Even, glare-controlled light around 4000K", "Flush LED ceilings & panels"],
      ["Corridors & stairs", "Continuous light, warm or neutral", "Flush ceilings, wall lights"],
      ["Apartments", "Warm 3000K in living, 4000K in kitchens", "Ceiling lights + pendants"],
      ["Lobbies & receptions", "Decorative feature plus general light", "Chandelier + LED ceilings"],
      ["Exterior", "Low glare, weather rated", "Outdoor wall & solar lights"],
    ],
    productsTitle: "Fittings in stock for projects",
    productSlugs: pick("lumen-flush-ceiling", "halo-ring-ceiling-light", "cadence-wall-light", "opal-globe-wall-light"),
    productCategories: ["ceiling-lights", "led-glow", "wall-lights", "outdoor-solar"],
    faqs: [
      { q: "Can you price our BOQ or lighting schedule?", a: "Yes. Send it as PDF or Excel and we price each line from stock, with alternatives where needed." },
      { q: "Do you supply in bulk for apartments and offices?", a: "Yes — ceiling and LED fittings in quantity, delivered by floor or phase." },
      { q: "Do you deliver outside Nairobi?", a: "Yes, we deliver across Kenya on request." },
      { q: "Can you provide specs for approvals?", a: "Yes — wattage, colour temperature, dimensions and finish for each fitting." },
    ],
    ctaTitle: "Have a BOQ to price?",
    ctaBody: "Send the schedule and site location. We reply with a line-by-line quote.",
    ctaPrimary: "Send your BOQ",
    ctaSecondary: "Talk on WhatsApp",
    ctaPrimaryHref: "/request-a-quote",
  },
  {
    slug: "luxury-chandeliers-nairobi",
    path: "/luxury-chandeliers-nairobi",
    breadcrumb: "Spaces / Luxury lighting",
    title: "Luxury Chandeliers in Nairobi | Crystal, Gold & Modern",
    h1: "Luxury Chandeliers & Statement Lighting in Nairobi",
    description:
      "Crystal, gold and modern luxury chandeliers in stock in Nairobi for homes, hotel lobbies and restaurants. Delivered and installed across Kenya.",
    intro:
      "A good chandelier is the first thing guests see and the last thing they forget. These are the statement pieces we have in stock right now.",
    cardsTitle: "Find your statement piece",
    cardsSubtitle: "By style",
    cards: [
      { title: "Crystal", body: "Sparkle and reflected light for grand living rooms and lobbies.", tag: "Classic" },
      { title: "Black & gold", body: "Bold metal frames that suit modern and hotel interiors.", tag: "Modern luxury" },
      { title: "Tiered & long-drop", body: "Made for double-volume spaces and staircases.", tag: "Height" },
    ],
    guideEyebrow: "Buying guide",
    guideTitle: "Getting a luxury chandelier right",
    guideHeaders: ["Question", "Answer", "Tip"],
    guideRows: [
      ["How big?", "Room length + width (m) × 10 ≈ width in cm", "Go bigger in double volume"],
      ["How high?", "About 2.1–2.4 m clear above the floor", "75–85 cm above a dining table"],
      ["What light?", "Warm white 2700–3000K", "Add a dimmer for evenings"],
      ["Who installs?", "Our team, with ceiling support for heavy pieces", "Plan the ceiling point early"],
    ],
    productsTitle: "Luxury pieces in stock",
    productSlugs: pick("aurelia-tiered-chandelier", "meridian-black-gold-chandelier"),
    productCategories: ["chandeliers"],
    faqs: [
      { q: "Where can I buy a luxury chandelier in Nairobi?", a: "Shop the chandeliers in stock here, visit our showroom, or ask on WhatsApp for photos and videos." },
      { q: "Do you install heavy chandeliers?", a: "Yes. Our team installs with the right ceiling support, including double-volume spaces." },
      { q: "Do you supply chandeliers for hotels and restaurants?", a: "Yes — lobby, dining room and bar chandeliers, supplied and installed across Kenya." },
      { q: "Can the chandelier be dimmed?", a: "Most can with the right dimmer and bulbs. Ask and we will confirm for the piece you like." },
    ],
    ctaTitle: "Looking for a statement piece?",
    ctaBody: "Tell us the room size and ceiling height and we will shortlist chandeliers that fit.",
    ctaPrimary: "Get chandelier advice",
    ctaSecondary: "Ask on WhatsApp",
    ctaPrimaryHref: "/request-a-quote",
  },
  {
    slug: "evening-ambience-lighting-nairobi",
    path: "/evening-ambience-lighting-nairobi",
    breadcrumb: "Spaces / Evening ambience",
    title: "Evening Lighting for Hotels & Restaurants | Nairobi",
    h1: "Evening Ambience Lighting for Hotels & Restaurants",
    description:
      "Warm night-time lighting for hotels, restaurants, lounges and rooftops in Nairobi. Wall lights, pendants, LED glow and outdoor lights in stock.",
    intro:
      "Guests choose where to eat and stay by how a place looks after dark — and by the photos they post. Warm, layered, low light makes a space feel full, intimate and worth coming back to.",
    cardsTitle: "Make the space glow after sunset",
    cardsSubtitle: "Night look",
    cards: [
      { title: "Dining & lounge", body: "Low warm pendants over tables and dimmers for late service.", tag: "Intimate" },
      { title: "Bar & feature walls", body: "Up-down wall lights and LED glow that make walls look rich at night.", tag: "Glow" },
      { title: "Terraces & rooftops", body: "Outdoor and solar lights for evening seating and views.", tag: "Outdoor" },
      { title: "Entrance & facade", body: "Wall lights that make the building look open and inviting from the road.", tag: "Arrival" },
    ],
    guideEyebrow: "Night lighting guide",
    guideTitle: "How to get a warm evening look",
    guideHeaders: ["Layer", "What it does", "Our pick"],
    guideRows: [
      ["Warm colour", "2700K reads as cosy and flatters food and faces", "Warm-white bulbs throughout"],
      ["Low pools of light", "Light on tables, not the ceiling", "Pendants on dimmers"],
      ["Wall glow", "Makes rooms feel full and expensive", "Up-down wall lights"],
      ["Accent", "Draws the eye to bar, art and plants", "LED glow & accent lights"],
      ["Outside", "Gets you noticed from the street", "Outdoor wall & solar lights"],
    ],
    productsTitle: "Evening favourites in stock",
    productSlugs: pick("cadence-wall-light", "trefoil-pendant", "clarity-glass-pendant", "opal-globe-wall-light"),
    productCategories: ["wall-lights", "pendant-lights", "led-glow", "outdoor-solar"],
    faqs: [
      { q: "What lighting makes a restaurant look good at night?", a: "Warm 2700K light, low pendants over tables, glowing wall lights and dimmers so you can lower the light as the evening goes on." },
      { q: "How do hotels get a luxurious evening feel?", a: "Layer it: a statement chandelier in the lobby, warm wall lights in corridors and lounges, and outdoor lights on the facade and terraces." },
      { q: "Can you light terraces and rooftops?", a: "Yes — outdoor wall lights and solar lights for seating areas, paths and edges." },
      { q: "Can you install without closing the business?", a: "Yes. We schedule installation around your service hours." },
    ],
    ctaTitle: "Want your space to glow at night?",
    ctaBody: "Send evening photos of your space and we will suggest the lights to change.",
    ctaPrimary: "Request a site visit",
    ctaSecondary: "Send photos on WhatsApp",
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
