export type Product = {
  slug: string;
  name: string;
  type: string;
  category: string;
  price: number;
  image: string;
  hoverImage?: string;
  badge?: "New" | "Popular" | "Signature";
  styles: string[];
  rooms: string[];
  finish?: string[];
  sizes?: string[];
  description: string;
  specs: { label: string; value: string }[];
  signature?: boolean;
};

export type Category = {
  slug: string;
  name: string;
  shortName?: string;
  subtitle: string;
  description: string;
  mosaicLabel?: string;
  image: string;
  featured?: boolean;
};

export type Room = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  image: string;
  tips: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  chooseBy?: { title: string; body: string }[];
};

export const categories: Category[] = [
  {
    slug: "chandeliers",
    name: "Chandeliers",
    subtitle: "Crystal · Gold · Modern",
    description:
      "Crystal, gold and modern chandeliers for dining rooms, living rooms and entrances. Delivered across Kenya and installed by our team.",
    mosaicLabel: "Crystal · Gold · Modern",
    image: "/images/products/7500.jpeg",
    featured: true,
  },
  {
    slug: "wall-lights",
    name: "Wall Lights",
    description:
      "Up-down wall lights, crystal sconces and glowing accents for hallways, bedrooms and dining rooms across Nairobi.",
    subtitle: "Sconces & accents",
    image: "/images/products/2500.jpeg",
  },
  {
    slug: "ceiling-lights",
    name: "Ceiling Lights",
    description:
      "Flush and semi-flush ceiling lights for living rooms, bedrooms and apartments with lower ceilings.",
    subtitle: "Flush & semi-flush",
    image: "/images/products/6000..jpeg",
  },
  {
    slug: "pendant-lights",
    name: "Pendant Lights",
    description:
      "Single pendants and clusters for islands, dining tables and double-height spaces.",
    subtitle: "Singles & clusters",
    image: "/images/products/5500.jpeg",
  },
  {
    slug: "table-floor-lamps",
    name: "Table & Floor Lamps",
    shortName: "Lamps",
    description:
      "Portable glow for reading corners, console tables and layered living rooms.",
    subtitle: "Portable glow",
    image: "/images/products/3500.jpeg",
  },
  {
    slug: "gypsum-downlights",
    name: "Gypsum & Downlights",
    description:
      "Recessed and gypsum-ready fixtures for clean, even light across open-plan homes.",
    subtitle: "Recessed & gypsum",
    image: "/images/products/3000.jpeg",
  },
  {
    slug: "outdoor-solar",
    name: "Outdoor & Solar",
    description:
      "Weatherproof wall lights and solar options for gates, gardens and outdoor living.",
    subtitle: "Gate & garden",
    image: "/images/products/3999.jpeg",
  },
  {
    slug: "led-glow",
    name: "LED & Glow Lights",
    shortName: "Glowing LED",
    description:
      "Soft glowing rings, strips and sculptural LED pieces for modern Nairobi interiors.",
    subtitle: "Soft sculptural glow",
    image: "/images/products/round1.jpg",
  },
];

export const products: Product[] = [
  {
    slug: "aurelia-tiered-chandelier",
    name: "Aurelia Tiered Chandelier",
    type: "Chandelier",
    category: "chandeliers",
    price: 7500,
    image: "/images/products/7500.jpeg",
    hoverImage: "/images/products/7000.jpeg",
    badge: "Popular",
    styles: ["Crystal", "Gold", "Modern"],
    rooms: ["dining-room", "entrance-hallway", "living-room"],
    finish: ["Gold", "Black & Gold"],
    sizes: ["60 cm", "80 cm", "100 cm"],
    description:
      "A tiered crystal chandelier with warm metalwork. Designed for dining rooms, entrances and high ceilings.",
    specs: [
      { label: "Diameter", value: "[80 cm]" },
      { label: "Height", value: "[adjustable chain]" },
      { label: "Light source", value: "[E14 · multiple bulbs]" },
      { label: "Materials", value: "Crystal glass, brushed metal" },
      { label: "Recommended room", value: "Dining room, entrance, living room" },
      { label: "Colour of light", value: "Warm white (dimmable on request)" },
    ],
    signature: true,
  },
  {
    slug: "meridian-black-gold-chandelier",
    name: "Meridian Black & Gold Chandelier",
    type: "Chandelier",
    category: "chandeliers",
    price: 7000,
    image: "/images/products/7000.jpeg",
    hoverImage: "/images/products/7000..jpeg",
    badge: "Signature",
    styles: ["Black", "Gold & Brass", "Crystal"],
    rooms: ["dining-room", "entrance-hallway", "living-room"],
    finish: ["Black & Gold", "Gold"],
    sizes: ["60 cm", "80 cm", "100 cm"],
    description:
      "A tiered crystal chandelier with brushed gold and black metalwork. Designed for dining rooms, entrances and high ceilings.",
    specs: [
      { label: "Diameter", value: "[80 cm]" },
      { label: "Height", value: "[adjustable chain]" },
      { label: "Light source", value: "[E14 · 12 bulbs]" },
      { label: "Materials", value: "Crystal glass, brushed metal" },
      { label: "Recommended room", value: "Dining room, entrance, living room" },
      { label: "Colour of light", value: "Warm white (dimmable on request)" },
    ],
    signature: true,
  },
  {
    slug: "serpentine-crystal-chandelier",
    name: "Serpentine Crystal Chandelier",
    type: "Chandelier",
    category: "chandeliers",
    price: 6500,
    image: "/images/products/6500.jpeg",
    hoverImage: "/images/products/6500..jpeg",
    styles: ["Crystal", "Gold"],
    rooms: ["dining-room", "living-room"],
    finish: ["Gold", "Chrome"],
    sizes: ["60 cm", "80 cm"],
    description:
      "A flowing crystal form that catches warm light from every angle — made for statement dining and living spaces.",
    specs: [
      { label: "Diameter", value: "[70 cm]" },
      { label: "Height", value: "[adjustable]" },
      { label: "Materials", value: "Crystal glass, metal" },
      { label: "Colour of light", value: "Warm white" },
    ],
    signature: true,
  },
  {
    slug: "seraphine-crystal-chandelier",
    name: "Seraphine Crystal Chandelier",
    type: "Chandelier",
    category: "chandeliers",
    price: 7000,
    image: "/images/products/7000..jpeg",
    styles: ["Crystal", "Modern"],
    rooms: ["dining-room", "entrance-hallway"],
    badge: "New",
    finish: ["Gold"],
    sizes: ["60 cm", "80 cm", "100 cm"],
    description:
      "Layered crystal arms with a quiet gold finish — presence without noise.",
    specs: [
      { label: "Diameter", value: "[75 cm]" },
      { label: "Materials", value: "Crystal, brushed gold metal" },
      { label: "Recommended room", value: "Dining, entrance" },
    ],
  },
  {
    slug: "trefoil-pendant",
    name: "Trefoil Pendant",
    type: "Pendant Light",
    category: "pendant-lights",
    price: 5500,
    image: "/images/products/5500.jpeg",
    hoverImage: "/images/products/5500..jpeg",
    badge: "New",
    styles: ["Modern", "Gold & Brass"],
    rooms: ["dining-room", "kitchen", "entrance-hallway"],
    finish: ["Gold", "Black"],
    sizes: ["Single", "Set of three"],
    description:
      "A sculptural three-petal pendant that works alone over a console or in a line over a dining table.",
    specs: [
      { label: "Diameter", value: "[approx. 35 cm]" },
      { label: "Materials", value: "Metal, glass diffuser" },
      { label: "Recommended room", value: "Dining, kitchen island, entrance" },
    ],
  },
  {
    slug: "clarity-glass-pendant",
    name: "Clarity Glass Pendant",
    type: "Pendant Light",
    category: "pendant-lights",
    price: 5500,
    image: "/images/products/5500...jpeg",
    styles: ["Modern", "Crystal"],
    rooms: ["dining-room", "kitchen"],
    description:
      "Clear glass pendant with a soft warm glow — ideal for round or small tables.",
    specs: [
      { label: "Materials", value: "Clear glass, metal canopy" },
      { label: "Recommended room", value: "Dining, kitchen" },
    ],
  },
  {
    slug: "raffia-pendant-set",
    name: "Raffia Pendant, Set of Three",
    type: "Pendant Light",
    category: "pendant-lights",
    price: 3999,
    image: "/images/products/3999.jpeg",
    styles: ["Natural & Timber", "Modern"],
    rooms: ["dining-room", "kitchen", "living-room"],
    description:
      "Natural-texture pendants in a set of three — for rectangular tables and kitchen islands.",
    specs: [
      { label: "Set", value: "Three pendants" },
      { label: "Materials", value: "Natural fibre, metal" },
    ],
  },
  {
    slug: "trio-gold-ceiling-light",
    name: "Trio Gold Ceiling Light",
    type: "Ceiling Light",
    category: "ceiling-lights",
    price: 6000,
    image: "/images/products/6000.jpeg",
    hoverImage: "/images/products/6000..jpeg",
    badge: "Popular",
    styles: ["Gold & Brass", "Modern"],
    rooms: ["living-room", "bedroom", "dining-room"],
    description:
      "Three warm gold forms on a flush ceiling plate — soft ambient light for living and dining.",
    specs: [
      { label: "Finish", value: "Brushed gold" },
      { label: "Mount", value: "Flush / semi-flush" },
      { label: "Colour of light", value: "Warm white" },
    ],
  },
  {
    slug: "halo-ring-ceiling-light",
    name: "Halo Ring Ceiling Light",
    type: "Ceiling Light",
    category: "ceiling-lights",
    price: 6000,
    image: "/images/products/6000..jpeg",
    hoverImage: "/images/products/round1.jpg",
    styles: ["LED & Glow", "Modern", "Black"],
    rooms: ["living-room", "bedroom", "entrance-hallway"],
    description:
      "A low-profile circular ring with soft inward glow — made for apartments and lower ceilings.",
    specs: [
      { label: "Shape", value: "Annular ring" },
      { label: "Finish", value: "Matte white / black options" },
      { label: "Light", value: "Integrated warm LED" },
    ],
  },
  {
    slug: "aurora-ring-ceiling",
    name: "Aurora Ring Ceiling Light",
    type: "Ceiling Light",
    category: "ceiling-lights",
    price: 6500,
    image: "/images/products/round2.jpg",
    hoverImage: "/images/products/round3.jpg",
    styles: ["LED & Glow", "Modern"],
    rooms: ["living-room", "bedroom"],
    badge: "New",
    description:
      "A sculptural glow ring that reads as architecture as much as lighting.",
    specs: [
      { label: "Light", value: "Integrated LED, warm white" },
      { label: "Profile", value: "Low flush mount" },
    ],
  },
  {
    slug: "aurum-up-down-wall-light",
    name: "Aurum Up-Down Wall Light",
    type: "Wall Light",
    category: "wall-lights",
    price: 2500,
    image: "/images/products/2500.jpeg",
    hoverImage: "/images/products/2500..jpeg",
    badge: "Popular",
    styles: ["Gold & Brass", "Modern"],
    rooms: ["dining-room", "hallway", "bedroom", "living-room"],
    finish: ["Gold", "Black"],
    description:
      "Up-and-down wash of warm light — layers a dining room or hallway without crowding the ceiling.",
    specs: [
      { label: "Direction", value: "Up & down" },
      { label: "Finish", value: "Brushed gold / black" },
      { label: "Recommended room", value: "Dining, hallway, bedroom" },
    ],
  },
  {
    slug: "opal-globe-wall-light",
    name: "Opal Globe Wall Light",
    type: "Wall Light",
    category: "wall-lights",
    price: 2500,
    image: "/images/products/2500..jpeg",
    styles: ["Modern", "LED & Glow"],
    rooms: ["bedroom", "bathroom-mirror", "hallway"],
    description:
      "Soft opal globe on a quiet metal arm — bedside, mirror and hallway ready.",
    specs: [
      { label: "Diffuser", value: "Opal glass" },
      { label: "Recommended room", value: "Bedroom, bathroom, hallway" },
    ],
  },
  {
    slug: "cadence-wall-light",
    name: "Cadence Wall Light",
    type: "Wall Light",
    category: "wall-lights",
    price: 3000,
    image: "/images/products/3000.jpeg",
    hoverImage: "/images/products/3000..jpeg",
    badge: "Signature",
    styles: ["Modern", "Black", "Gold & Brass"],
    rooms: ["living-room", "hallway", "dining-room"],
    description:
      "A signature wall piece with quiet geometry — the glow that carries a room.",
    specs: [
      { label: "Finish", value: "Black / gold options" },
      { label: "Recommended room", value: "Living, hallway, dining" },
    ],
    signature: true,
  },
  {
    slug: "regent-crystal-wall-light",
    name: "Regent Crystal Wall Light",
    type: "Wall Light",
    category: "wall-lights",
    price: 3500,
    image: "/images/products/3500.jpeg",
    hoverImage: "/images/products/3500..jpeg",
    styles: ["Crystal", "Gold"],
    rooms: ["dining-room", "entrance-hallway", "living-room"],
    description:
      "Crystal wall light that pairs with statement chandeliers for a finished room.",
    specs: [
      { label: "Materials", value: "Crystal, metal" },
      { label: "Pair with", value: "Dining chandeliers, entrance lights" },
    ],
  },
  {
    slug: "onyx-up-down-wall-light",
    name: "Onyx Up-Down Wall Light",
    type: "Wall Light",
    category: "wall-lights",
    price: 2999,
    image: "/images/products/2999.jpeg",
    styles: ["Black", "Modern"],
    rooms: ["hallway", "bedroom", "living-room"],
    description:
      "Matte black up-down wall light for corridors and contemporary living spaces.",
    specs: [
      { label: "Finish", value: "Matte black" },
      { label: "Direction", value: "Up & down" },
    ],
  },
  {
    slug: "lumen-flush-ceiling",
    name: "Lumen Flush Ceiling Light",
    type: "Ceiling Light",
    category: "ceiling-lights",
    price: 3500,
    image: "/images/products/3500...jpeg",
    styles: ["Modern", "LED & Glow"],
    rooms: ["bedroom", "kitchen", "bathroom-mirror"],
    description:
      "Clean flush mount for bedrooms and kitchens where clearance is tight.",
    specs: [
      { label: "Mount", value: "Flush" },
      { label: "Light", value: "Warm white LED" },
    ],
  },
  {
    slug: "orbit-glow-pendant",
    name: "Orbit Glow Pendant",
    type: "LED & Glow",
    category: "led-glow",
    price: 5500,
    image: "/images/products/Screenshot_20251008_134753_1.jpg",
    hoverImage: "/images/products/Screenshot_20251008_135838_2.jpg",
    styles: ["LED & Glow", "Modern"],
    rooms: ["living-room", "bedroom"],
    badge: "New",
    description:
      "A glowing orbital form — soft, modern presence for living rooms and suites.",
    specs: [
      { label: "Light", value: "Integrated LED" },
      { label: "Mood", value: "Ambient / dimmable on request" },
    ],
  },
  {
    slug: "velvet-glow-sconce",
    name: "Velvet Glow Sconce",
    type: "Wall Light",
    category: "wall-lights",
    price: 3500,
    image: "/images/products/Screenshot_20251008_134500_1.jpg",
    hoverImage: "/images/products/Screenshot_20251008_134652_1.jpg",
    styles: ["LED & Glow", "Modern"],
    rooms: ["bedroom", "hallway"],
    description: "Soft wall glow for bedrooms and quiet corridors.",
    specs: [{ label: "Light", value: "Warm diffused LED" }],
  },
  {
    slug: "studio-linear-ceiling",
    name: "Studio Linear Ceiling Light",
    type: "Ceiling Light",
    category: "ceiling-lights",
    price: 5500,
    image: "/images/products/Screenshot_20251008_134810_1.jpg",
    styles: ["Modern", "Black"],
    rooms: ["kitchen", "living-room"],
    description: "Linear ceiling light for open-plan living and kitchen zones.",
    specs: [{ label: "Form", value: "Linear flush" }],
  },
  {
    slug: "nairobi-crystal-flush",
    name: "Nairobi Crystal Flush",
    type: "Ceiling Light",
    category: "ceiling-lights",
    price: 4500,
    image: "/images/products/Screenshot_20251008_134900_1.jpg",
    styles: ["Crystal", "Modern"],
    rooms: ["bedroom", "entrance-hallway"],
    description: "Compact crystal flush light for apartments and guest rooms.",
    specs: [{ label: "Materials", value: "Crystal, metal" }],
  },
  {
    slug: "arcadia-floor-lamp",
    name: "Arcadia Floor Lamp",
    type: "Floor Lamp",
    category: "table-floor-lamps",
    price: 6500,
    image: "/images/products/Screenshot_20251008_135854_1.jpg",
    hoverImage: "/images/products/3500..jpeg",
    badge: "New",
    styles: ["Modern", "Gold & Brass"],
    rooms: ["living-room", "bedroom"],
    description: "A tall warm floor lamp for reading corners and layered living rooms.",
    specs: [
      { label: "Type", value: "Floor lamp" },
      { label: "Finish", value: "Brushed metal" },
      { label: "Recommended room", value: "Living room, bedroom" },
    ],
  },
  {
    slug: "luna-table-lamp",
    name: "Luna Table Lamp",
    type: "Table Lamp",
    category: "table-floor-lamps",
    price: 3500,
    image: "/images/products/3500..jpeg",
    styles: ["Modern", "LED & Glow"],
    rooms: ["bedroom", "living-room"],
    description: "Soft table glow for consoles, desks and bedside surfaces.",
    specs: [
      { label: "Type", value: "Table lamp" },
      { label: "Light", value: "Warm white" },
    ],
  },
  {
    slug: "pillar-accent-lamp",
    name: "Pillar Accent Lamp",
    type: "Table Lamp",
    category: "table-floor-lamps",
    price: 2999,
    image: "/images/products/Screenshot_20251008_142223_1.jpg",
    styles: ["Modern", "Black"],
    rooms: ["living-room", "entrance-hallway"],
    description: "Compact accent lamp for shelves, sideboards and entry tables.",
    specs: [{ label: "Type", value: "Table / accent lamp" }],
  },
  {
    slug: "recessed-spot-set",
    name: "Recessed Spot Set",
    type: "Downlight",
    category: "gypsum-downlights",
    price: 3000,
    image: "/images/products/3000..jpeg",
    hoverImage: "/images/products/Screenshot_20251008_142229_1.jpg",
    badge: "Popular",
    styles: ["Modern", "LED & Glow"],
    rooms: ["kitchen", "living-room", "hallway"],
    description: "Gypsum-ready recessed spots for even, clean ceiling light.",
    specs: [
      { label: "Mount", value: "Recessed / gypsum" },
      { label: "Light", value: "Warm or neutral LED" },
    ],
  },
  {
    slug: "slimline-gypsum-washer",
    name: "Slimline Gypsum Washer",
    type: "Downlight",
    category: "gypsum-downlights",
    price: 3500,
    image: "/images/products/Screenshot_20251008_142229_1.jpg",
    styles: ["Modern", "Black"],
    rooms: ["living-room", "kitchen"],
    description: "Low-glare washer for open-plan ceilings and corridors.",
    specs: [
      { label: "Profile", value: "Slim recessed" },
      { label: "Finish", value: "White / black trim" },
    ],
  },
  {
    slug: "grid-panel-downlight",
    name: "Grid Panel Downlight",
    type: "Downlight",
    category: "gypsum-downlights",
    price: 4500,
    image: "/images/products/Screenshot_20251008_134652_1.jpg",
    styles: ["Modern", "LED & Glow"],
    rooms: ["kitchen", "bathroom-mirror"],
    description: "Even panel light for kitchens, baths and work zones.",
    specs: [{ label: "Light", value: "Integrated LED panel" }],
  },
  {
    slug: "gate-wall-lantern",
    name: "Gate Wall Lantern",
    type: "Outdoor Light",
    category: "outdoor-solar",
    price: 3999,
    image: "/images/products/Screenshot_20251008_142202_1.jpg",
    hoverImage: "/images/products/3999.jpeg",
    badge: "Popular",
    styles: ["Black", "Modern"],
    rooms: ["entrance-hallway"],
    description: "Weatherproof wall lantern for gates, porches and outdoor living.",
    specs: [
      { label: "Rating", value: "Outdoor / weatherproof" },
      { label: "Mount", value: "Wall" },
    ],
  },
  {
    slug: "solar-path-light",
    name: "Solar Path Light",
    type: "Outdoor Light",
    category: "outdoor-solar",
    price: 2500,
    image: "/images/products/Screenshot_20251008_135838_2.jpg",
    styles: ["Modern", "Natural & Timber"],
    rooms: ["entrance-hallway"],
    description: "Solar path and garden light for driveways and borders.",
    specs: [
      { label: "Power", value: "Solar" },
      { label: "Use", value: "Path / garden" },
    ],
  },
  {
    slug: "courtyard-bulkhead",
    name: "Courtyard Bulkhead",
    type: "Outdoor Light",
    category: "outdoor-solar",
    price: 3500,
    image: "/images/products/Screenshot_20251008_134810_1.jpg",
    styles: ["Black", "Modern"],
    rooms: ["entrance-hallway"],
    description: "Durable bulkhead for courtyards, stairs and exterior walls.",
    specs: [
      { label: "Rating", value: "Outdoor" },
      { label: "Finish", value: "Matte black" },
    ],
  },
  {
    slug: "halo-glow-strip",
    name: "Halo Glow Ring",
    type: "LED & Glow",
    category: "led-glow",
    price: 6000,
    image: "/images/products/round3.jpg",
    hoverImage: "/images/products/round1.jpg",
    badge: "Signature",
    styles: ["LED & Glow", "Modern"],
    rooms: ["living-room", "bedroom"],
    description: "Sculptural LED ring with soft ambient glow for modern interiors.",
    specs: [
      { label: "Light", value: "Integrated warm LED" },
      { label: "Mood", value: "Ambient" },
    ],
    signature: true,
  },
];

export const rooms: Room[] = [
  {
    slug: "dining-room",
    name: "Dining Room",
    headline: "Dining Room Lighting in Nairobi",
    description:
      "The light over your table sets the mood of every meal. Chandeliers and pendants chosen for how they look and how they feel.",
    image: "/images/products/roomm3.jpg",
    chooseBy: [
      {
        title: "Round or small tables",
        body: "A single glass pendant or a small cluster.",
      },
      {
        title: "Rectangular, 6 seats",
        body: "A set of three pendants in a line.",
      },
      {
        title: "Long tables, 8+ seats",
        body: "A large tiered chandelier as the focal point.",
      },
    ],
    tips: [
      {
        title: "Hang it at the right height",
        body: "About 75 to 90 cm above the tabletop.",
      },
      {
        title: "Choose warm white",
        body: "Around 2700 – 3000K feels inviting at dinner.",
      },
      {
        title: "Add a dimmer",
        body: "The same light can serve breakfast and a late dinner.",
      },
      {
        title: "Layer the room",
        body: "Add wall lights so the table is not the only glow.",
      },
    ],
    faqs: [
      {
        q: "What size chandelier for a dining table?",
        a: "Roughly half to two-thirds of the width of the table.",
      },
      {
        q: "Can I use pendants instead?",
        a: "Yes. A single pendant or a line of three works well on rectangular tables.",
      },
      {
        q: "Do you install dining lights?",
        a: "Yes. Our team installs and tests before we leave.",
      },
      {
        q: "What light colour is best?",
        a: "Warm white around 2700–3000K for dining rooms.",
      },
    ],
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    headline: "Bedroom Lighting in Nairobi",
    description:
      "Soft ceiling light plus wall lights beside the bed — calm, layered and easy to live with.",
    image: "/images/products/round2.jpg",
    tips: [
      {
        title: "Keep the ceiling soft",
        body: "A flush or ring light gives even ambient light without glare.",
      },
      {
        title: "Add bedside wall lights",
        body: "Free the nightstands and give each side its own glow.",
      },
      {
        title: "Use warm white",
        body: "Cool light fights sleep — stay around 2700K.",
      },
      {
        title: "Dim where you can",
        body: "One circuit for ambient, one for reading.",
      },
    ],
    faqs: [
      {
        q: "What ceiling light suits a bedroom?",
        a: "Flush or low-profile ring lights work best, especially with lower ceilings.",
      },
      {
        q: "Do you have matching bedside lights?",
        a: "Yes — wall sconces and globe lights that pair with our ceiling pieces.",
      },
      {
        q: "Can you install in apartments?",
        a: "Yes. We install across Nairobi apartments and townhouses.",
      },
      {
        q: "Are dimmers available?",
        a: "Dimmable options are available on request for most LED pieces.",
      },
    ],
  },
  {
    slug: "kitchen",
    name: "Kitchen",
    headline: "Kitchen Lighting in Nairobi",
    description:
      "Pendants over the island and bright, even light on worktops — practical and beautiful.",
    image: "/images/products/5500.jpeg",
    tips: [
      {
        title: "Light the island",
        body: "Two or three pendants keep the island clear and focused.",
      },
      {
        title: "Even worktop light",
        body: "Add under-cabinet or recessed light where you prep.",
      },
      {
        title: "Avoid harsh cool white",
        body: "Neutral-warm light shows food accurately without feeling clinical.",
      },
      {
        title: "Think cleaning",
        body: "Choose finishes that wipe clean above cooking zones.",
      },
    ],
    faqs: [
      {
        q: "How many pendants over an island?",
        a: "Usually two or three, spaced evenly along the length.",
      },
      {
        q: "Do you supply gypsum and downlights?",
        a: "Yes — see our Gypsum & Downlights range.",
      },
      {
        q: "Can lights handle kitchen humidity?",
        a: "We recommend appropriate IP ratings near wet zones; ask us on WhatsApp.",
      },
      {
        q: "Same-day delivery for kitchens?",
        a: "Nairobi orders placed before [time] can arrive the same day.",
      },
    ],
  },
  {
    slug: "living-room",
    name: "Living Room",
    headline: "Living Room Lighting in Nairobi",
    description:
      "A calm ceiling presence with wall lights and lamps for evenings that stretch.",
    image: "/images/products/round3.jpg",
    tips: [
      {
        title: "Start with ambient",
        body: "A ceiling light that fills the room without glare.",
      },
      {
        title: "Layer with walls",
        body: "Wall lights soften corners and TV glare.",
      },
      {
        title: "Add a reading lamp",
        body: "Table or floor lamps make the sofa usable after dark.",
      },
      {
        title: "Dim the main light",
        body: "Living rooms need more than one mood.",
      },
    ],
    faqs: [
      {
        q: "Chandelier or flush for living rooms?",
        a: "High ceilings can take a chandelier; apartments often prefer flush or ring lights.",
      },
      {
        q: "How do I avoid TV glare?",
        a: "Use indirect wall wash and keep bright fixtures out of the screen reflection path.",
      },
      {
        q: "Do you deliver living room sets?",
        a: "Yes — ceiling plus matching wall lights as a package on WhatsApp.",
      },
      {
        q: "What colour temperature?",
        a: "Warm white 2700–3000K for evening comfort.",
      },
    ],
  },
  {
    slug: "entrance-hallway",
    name: "Entrance & Hallway",
    headline: "Entrance & Hallway Lighting in Nairobi",
    description:
      "A flush or pendant light that welcomes people in — first impression, done properly.",
    image: "/images/products/Screenshot_20251008_135721_1.jpg",
    tips: [
      {
        title: "Make a focal point",
        body: "One strong pendant or small chandelier sets the tone.",
      },
      {
        title: "Light the length",
        body: "Hallways need a line of flush or wall lights, not one lonely bulb.",
      },
      {
        title: "Mind the door swing",
        body: "Keep hanging lights clear of doors and high traffic.",
      },
      {
        title: "Warm welcome",
        body: "Warm white makes the entrance feel like home.",
      },
    ],
    faqs: [
      {
        q: "What suits a double-height entrance?",
        a: "A tiered chandelier or long pendant with adjustable drop.",
      },
      {
        q: "Apartment hallway ideas?",
        a: "Flush lights plus slim wall lights keep clearance and add glow.",
      },
      {
        q: "Do you install entrance fixtures?",
        a: "Yes — including larger pieces that need two people.",
      },
      {
        q: "Can I match outdoor gate lights?",
        a: "See Outdoor & Solar for weatherproof options that relate to your interior finish.",
      },
    ],
  },
  {
    slug: "bathroom-mirror",
    name: "Bathroom & Mirror",
    headline: "Bathroom & Mirror Lighting in Nairobi",
    description:
      "Clear, flattering light for mirrors and wet rooms — chosen for safety and softness.",
    image: "/images/products/Screenshot_20251008_142202_1.jpg",
    tips: [
      {
        title: "Light the face, not the ceiling only",
        body: "Side or mirror lights reduce shadows.",
      },
      {
        title: "Check IP ratings",
        body: "Use appropriate ratings near showers and basins.",
      },
      {
        title: "Avoid harsh cool glare",
        body: "Neutral-warm light is kinder for morning routines.",
      },
      {
        title: "Keep it simple to clean",
        body: "Smooth finishes wipe down quickly in humid rooms.",
      },
    ],
    faqs: [
      {
        q: "Are your lights bathroom-safe?",
        a: "We advise on IP-rated options for each zone — message us with a photo.",
      },
      {
        q: "Wall lights beside the mirror?",
        a: "Yes — globe and up-down sconces work well in pairs.",
      },
      {
        q: "Do you install in bathrooms?",
        a: "Yes, with care around existing wiring and moisture zones.",
      },
      {
        q: "Delivery timing?",
        a: "Same-day across Nairobi when ordered before [time].",
      },
    ],
  },
];

export const guides = [
  {
    slug: "lighting-a-new-home",
    title: "Lighting a New Home in Nairobi",
    summary:
      "A room-by-room plan for people who are building, so the lights are right before the ceilings are closed.",
    intent: "new-home",
  },
  {
    slug: "upgrading-your-lighting",
    title: "Upgrading Your Lighting",
    summary:
      "Practical ways to refresh a room without a full renovation — ceiling, walls and layers.",
    intent: "upgrade",
  },
  {
    slug: "chandelier-size-guide",
    title: "Chandelier Size Guide",
    summary:
      "Simple rules for diameter, height above a table, and ceiling clearance.",
    intent: "guide",
  },
  {
    slug: "warm-vs-cool-white",
    title: "Warm vs Cool White",
    summary:
      "How colour temperature changes the feel of dining, bedrooms and kitchens.",
    intent: "guide",
  },
];

export const locations = [
  {
    slug: "kilimani",
    name: "Kilimani",
    blurb:
      "Same-day delivery, careful installation and a wide range of chandeliers, wall lights and ceiling lights for Kilimani homes and apartments.",
    homes:
      "Many Kilimani homes have lower ceilings and open-plan living. Flush ceiling lights, slim wall lights and compact pendants give you the glow without crowding the room.",
    delivery: "Same day",
    window: "[Typical time] within Kilimani",
  },
  {
    slug: "kileleshwa",
    name: "Kileleshwa",
    blurb:
      "Same-day lighting delivery and installation for Kileleshwa apartments and family homes.",
    homes:
      "Kileleshwa mixes apartments and townhouses — flush ceiling lights and layered wall lights suit most rooms.",
    delivery: "Same day",
    window: "[Typical time] within Kileleshwa",
  },
  {
    slug: "gigiri",
    name: "Gigiri",
    blurb:
      "Statement lighting delivered and installed for Gigiri homes, including double-height entrances.",
    homes:
      "Larger rooms and higher ceilings in Gigiri often call for tiered chandeliers and layered wall light.",
    delivery: "Same day",
    window: "[Typical time] within Gigiri",
  },
  {
    slug: "kitengela",
    name: "Kitengela",
    blurb:
      "Delivery and installation for Kitengela homes — confirm timing when you order.",
    homes:
      "New builds in Kitengela benefit from planning pendants and ceiling points before gypsum closes.",
    delivery: "[Confirm]",
    window: "[Confirm on WhatsApp]",
  },
  {
    slug: "rongai",
    name: "Rongai",
    blurb:
      "Lighting delivery and installation for Rongai — chat with us for today’s route.",
    homes:
      "Rongai homes often need a mix of outdoor gate lights and warm indoor ceiling pieces.",
    delivery: "[Confirm]",
    window: "[Confirm on WhatsApp]",
  },
  {
    slug: "nairobi",
    name: "Nairobi",
    blurb:
      "Same-day lighting delivery across Nairobi — Kilimani, Kileleshwa, Gigiri, Kitengela, Rongai and more.",
    homes:
      "Apartment and house lighting for Nairobi buyers: chandeliers, wall lights, ceiling lights and outdoor fixtures.",
    delivery: "Same day",
    window: "Order before [cutoff time] for same-day Nairobi routes",
  },
];

export const homeFaqs = [
  {
    q: "Do you deliver outside Nairobi?",
    a: "Yes. We deliver countrywide. Nairobi orders can arrive the same day; other towns depend on the courier route.",
  },
  {
    q: "Can you install the light for me?",
    a: "Yes. Installation is done by our team, quoted by site, and checked before we leave.",
  },
  {
    q: "How do I know what size to choose?",
    a: "Send a room photo and rough measurements on WhatsApp — we’ll confirm size before you buy. See also our Chandelier Size Guide.",
  },
  {
    q: "What payment methods do you accept?",
    a: "M-Pesa, Visa, Mastercard and bank transfer.",
  },
  {
    q: "What if it arrives damaged?",
    a: "Contact us immediately with photos. Damaged goods are replaced according to our Returns and Warranty policies.",
  },
];

export const testimonials = [
  {
    quote:
      "Delivered the same afternoon and fitted perfectly. The room looks completely different.",
    name: "James",
    area: "Kilimani",
  },
  {
    quote:
      "They helped us choose the right size for our double-height entrance.",
    name: "Kimani",
    area: "Gigiri",
  },
  {
    quote:
      "Consistent, quick and no mess left behind. Easy from start to finish.",
    name: "Dan",
    area: "Kitengela",
  },
  {
    quote:
      "Ordered on WhatsApp in the morning and the chandelier was up by evening.",
    name: "Wickliffe",
    area: "Kileleshwa",
  },
  {
    quote:
      "Clear advice on warm versus cool light. The bedroom feel is exactly what we wanted.",
    name: "Nelson",
    area: "Rongai",
  },
  {
    quote:
      "Professional installers. They tested every fixture before they left.",
    name: "John",
    area: "Kilimani",
  },
  {
    quote:
      "Beautiful wall lights for the hallway. Guests always ask where we got them.",
    name: "Margaret",
    area: "Kileleshwa",
  },
  {
    quote:
      "From quote to install, everything was straightforward. Highly recommend.",
    name: "Vera",
    area: "Gigiri",
  },
  {
    quote:
      "Great range and honest sizing help for our dining room. Looks premium.",
    name: "Kabugi",
    area: "Kitengela",
  },
];

export const projects = [
  {
    slug: "entrance-pendant-kilimani",
    title: "Entrance pendant",
    area: "Kilimani",
    room: "entrance",
    image: "/images/products/Screenshot_20251008_135721_1.jpg",
  },
  {
    slug: "hallway-flush-kileleshwa",
    title: "Hallway flush lights",
    area: "Kileleshwa",
    room: "entrance",
    image: "/images/products/3000.jpeg",
  },
  {
    slug: "bedroom-ring-gigiri",
    title: "Bedroom ring light",
    area: "Gigiri",
    room: "bedroom",
    image: "/images/products/round1.jpg",
  },
  {
    slug: "master-bedroom-gigiri",
    title: "Master bedroom",
    area: "Gigiri",
    room: "bedroom",
    image: "/images/products/round2.jpg",
  },
  {
    slug: "kitchen-pendants-kitengela",
    title: "Kitchen pendants",
    area: "Kitengela",
    room: "kitchen",
    image: "/images/products/5500.jpeg",
  },
  {
    slug: "corridor-ceiling-rongai",
    title: "Corridor ceiling light",
    area: "Rongai",
    room: "entrance",
    image: "/images/products/6000..jpeg",
  },
  {
    slug: "bedside-wall-kilimani",
    title: "Bedside wall light",
    area: "Kilimani",
    room: "bedroom",
    image: "/images/products/2500.jpeg",
  },
  {
    slug: "entrance-timber-kileleshwa",
    title: "Entrance timber light",
    area: "Kileleshwa",
    room: "entrance",
    image: "/images/products/3999.jpeg",
  },
  {
    slug: "living-room-ring-gigiri",
    title: "Living room ring",
    area: "Gigiri",
    room: "living",
    image: "/images/products/round3.jpg",
  },
];

export function formatPrice(price: number) {
  return `KES ${price.toLocaleString("en-KE")}`;
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getRoom(slug: string) {
  return rooms.find((r) => r.slug === slug);
}

export function productsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function productsByRoom(roomSlug: string) {
  return products.filter((p) => p.rooms.includes(roomSlug));
}

/** Style lookbook collections used by /collection/[style]. */
export const STYLE_COLLECTIONS = [
  {
    slug: "crystal",
    name: "Crystal",
    headline: "Crystal lighting in Nairobi",
    description:
      "Faceted glass and crystal that catches light in dining rooms and entrances.",
    match: ["crystal"],
    image: "/images/products/7500.jpeg",
  },
  {
    slug: "gold-brass",
    name: "Gold & brass",
    headline: "Gold and brass lighting in Nairobi",
    description:
      "Warm metal finishes for dining rooms, bedrooms and feature walls.",
    match: ["gold", "brass"],
    image: "/images/products/7000.jpeg",
  },
  {
    slug: "black",
    name: "Black",
    headline: "Black lighting in Nairobi",
    description: "Matte and polished black fixtures for modern rooms.",
    match: ["black"],
    image: "/images/products/2999.jpeg",
  },
  {
    slug: "natural",
    name: "Natural timber",
    headline: "Natural timber and rattan lighting",
    description: "Wood, rattan and natural textures for softer rooms.",
    match: ["natural", "timber", "rattan"],
    image: "/images/products/3999.jpeg",
  },
  {
    slug: "glowing",
    name: "Glowing",
    headline: "Glowing LED lighting in Nairobi",
    description: "Soft-glow and LED pieces that read as light sculpture.",
    match: ["glow", "led"],
    image: "/images/products/round1.jpg",
  },
] as const;

export function getStyleCollection(slug: string) {
  return STYLE_COLLECTIONS.find((s) => s.slug === slug);
}

export function productsByStyle(styleSlug: string) {
  const style = getStyleCollection(styleSlug);
  if (!style) return [];
  return products.filter((p) =>
    p.styles.some((s) => {
      const lower = s.toLowerCase();
      return style.match.some((m) => lower.includes(m));
    }),
  );
}

export function signatureProducts() {
  return products.filter((p) => p.signature || p.badge === "Signature");
}

/** Best sellers — shown on /sale */
export function saleProducts() {
  return products.filter((p) => p.badge === "Popular");
}

/** New arrivals — shown on /new-arrivals */
export function newArrivalProducts() {
  return products.filter((p) => p.badge === "New");
}

export function featuredProducts() {
  return products.filter((p) => p.badge === "New" || p.badge === "Popular").slice(0, 4);
}
