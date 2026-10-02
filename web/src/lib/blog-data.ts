export type BlogPost = {
  slug: string;
  title: string;
  topic: string;
  excerpt: string;
  body: string;
  author: string;
  minutes: number;
  featured: boolean;
  audienceHref?: string;
  image?: string;
};

/** Static fallback when the database is offline. */
export const staticBlogPosts: BlogPost[] = [
  {
    slug: "podcast-lighting-setup-kenya",
    topic: "Podcast",
    title: "How to Light a Podcast Set in Nairobi",
    minutes: 6,
    featured: true,
    audienceHref: "/podcast-studio-lighting-nairobi",
    image: "/images/products/7500.jpeg",
    excerpt: "Soft main light, backdrop depth and control — a creator-ready setup.",
    author: "Sparklights 254",
    body: `A soft main light, a backdrop light and a way to control them is all most shows need.

## The three layers

Start with even light on the face, add depth behind the subject, then one accent that reads on camera. Keep colour temperature consistent across every fixture.

## Warm or neutral?

Warm light (around 3000K) feels inviting for talk shows; neutral (around 4000K) keeps you sharp on camera. Confirm stock and CRI with our team on WhatsApp.`,
  },
  {
    slug: "best-lighting-for-studying-kenya",
    topic: "Study",
    title: "The best lighting for studying at night",
    minutes: 5,
    audienceHref: "/study-lamps-nairobi",
    image: "/images/products/3500.jpeg",
    excerpt: "Neutral light, placement and budget options for hostels and bedsitters.",
    author: "Sparklights 254",
    featured: false,
    body: `Studying under warm yellow light makes you sleepy. Aim for neutral white at the desk and a softer ambient light in the room.

## Placement

Put the lamp on the opposite side of your writing hand to reduce shadows. Keep glare off screens.

## Budget options

A good desk lamp plus a simple ceiling light covers most hostel and bedsitter rooms.`,
  },
  {
    slug: "bathroom-lighting-ip-rating-guide",
    topic: "Bathroom",
    title: "What IP rating does a bathroom light need?",
    minutes: 6,
    audienceHref: "/category/bathroom-lights",
    image: "/images/products/2500.jpeg",
    excerpt: "Safe lighting near water, explained without the jargon.",
    author: "Sparklights 254",
    featured: false,
    body: `IP ratings tell you how well a light resists water and dust. Near showers and baths you need higher protection.

## Zones in brief

Closer to water means a higher IP. Mirror lights outside the splash zone can be lower. Ask us with a photo of your bathroom and we will confirm.`,
  },
  {
    slug: "corridor-lighting-ideas",
    topic: "Outdoor",
    title: "How to light a long corridor",
    minutes: 4,
    audienceHref: "/walkway-corridor-lights-nairobi",
    image: "/images/products/round2.jpg",
    excerpt: "Spacing, flush lights and outdoor path options.",
    author: "Sparklights 254",
    featured: false,
    body: `Long corridors work best with even spacing and a mix of ceiling and wall light so the path feels continuous, not spotty.`,
  },
  {
    slug: "restaurant-lighting-ideas-kenya",
    topic: "Hospitality",
    title: "Restaurant lighting ideas for warm, welcoming rooms",
    minutes: 7,
    audienceHref: "/hotel-restaurant-lighting-nairobi",
    image: "/images/products/5500.jpeg",
    excerpt: "Atmosphere first — pendants, wall wash and dimmers.",
    author: "Sparklights 254",
    featured: false,
    body: `Guests remember how a room felt. Warm pendants over tables, soft wall wash and dimmers let you shift from lunch to dinner.`,
  },
  {
    slug: "bedroom-lighting-ideas-kenya",
    topic: "Bedroom",
    title: "Warm or cool? Choosing bedroom light",
    minutes: 5,
    audienceHref: "/category/bedroom-lights",
    image: "/images/products/round1.jpg",
    excerpt: "Restful colour temperature and layered bedside lighting.",
    author: "Sparklights 254",
    featured: false,
    body: `Bedrooms want warm light for rest. Layer a soft ceiling light with bedside lamps you can dim independently.`,
  },
  {
    slug: "kitchen-lighting-ideas-kenya",
    topic: "Kitchen",
    title: "Kitchen lighting in three simple layers",
    minutes: 5,
    audienceHref: "/category/kitchen-lights",
    image: "/images/products/7000.jpeg",
    excerpt: "Island pendants, worktop light and ambient glow.",
    author: "Sparklights 254",
    featured: false,
    body: `Task light on the worktop, ambient light for the whole room, and a pendant or two over the island for character.`,
  },
  {
    slug: "how-to-light-artwork-at-home",
    topic: "Display",
    title: "How to light artwork and shelves at home",
    minutes: 5,
    audienceHref: "/accent-display-lighting-nairobi",
    image: "/images/products/6000.jpeg",
    excerpt: "Avoid glare and make the piece you love stand out.",
    author: "Sparklights 254",
    featured: false,
    body: `Aim light at about 30 degrees to reduce glare. Keep colour rendering high so art looks true.`,
  },
  {
    slug: "office-lighting-guide-kenya",
    topic: "Office",
    title: "Office lighting guide: how bright should your workspace be?",
    minutes: 7,
    audienceHref: "/office-lighting-nairobi",
    image: "/images/products/3999.jpeg",
    excerpt: "Brightness, colour temperature and fixture picks for Kenyan offices.",
    author: "Sparklights 254",
    featured: false,
    body: `Desks need even, glare-free light. Reception can be warmer. Meeting rooms need dimmable control.

## How bright?

Aim for task-level light on desks and softer ambient light for the whole room. Confirm lux targets with your contractor for open-plan floors.

## Next step

Send a floor plan on WhatsApp or request a quote for supply and installation.`,
  },
  {
    slug: "solar-vs-mains-outdoor-lights-kenya",
    topic: "Outdoor",
    title: "Solar or mains? Choosing outdoor lights in Kenya",
    minutes: 6,
    audienceHref: "/outdoor-path-lights-nairobi",
    image: "/images/products/6500.jpeg",
    excerpt: "When solar path lights make sense — and when wired fixtures are better.",
    author: "Sparklights 254",
    featured: false,
    body: `Solar suits gates and paths with good sun. Mains suits bright, reliable driveway and facade light.

## PLACEHOLDER

Confirm stock of solar vs IP-rated mains fixtures with the showroom before publishing final recommendations.`,
  },
  {
    slug: "lumens-watts-kelvin-explained",
    topic: "Buying",
    title: "Lumens, watts and kelvin explained for Kenyan buyers",
    minutes: 6,
    audienceHref: "/journal",
    image: "/images/products/2999.jpeg",
    excerpt: "The three numbers that decide how bright and how warm a light feels.",
    author: "Sparklights 254",
    featured: false,
    body: `Lumens = brightness. Watts = power draw. Kelvin = warm vs cool colour.

## Warm or cool?

Around 2700–3000K feels restful at home. Around 4000K feels alert for desks and kitchens.`,
  },
  {
    slug: "gypsum-ceiling-lighting-guide-kenya",
    topic: "Buying",
    title: "Gypsum ceiling lighting: where to place every light",
    minutes: 7,
    audienceHref: "/shop/ceiling-lights",
    image: "/images/products/3000.jpeg",
    excerpt: "Plan points before the board closes — downlights, washers and statement pieces.",
    author: "Sparklights 254",
    featured: false,
    body: `Mark downlight grids early. Leave a centre point for a chandelier or flush light. Add wall lights so the ceiling is not the only glow.

## PLACEHOLDER

Confirm recommended spacing with the installation team for each room type.`,
  },
  {
    slug: "cost-of-lighting-a-house-nairobi",
    topic: "Cost",
    title: "What does it cost to light a 3-bedroom house in Nairobi?",
    minutes: 8,
    audienceHref: "/delivery/nairobi",
    image: "/images/products/roomm3.jpeg",
    excerpt: "A practical budget range for fixtures, delivery and installation.",
    author: "Sparklights 254",
    featured: false,
    body: `Budgets vary by fixture quality and how many rooms you light at once.

## PLACEHOLDER pricing

Replace with a real Sparklights package range (KES) once the team confirms typical 3-bedroom bundles.

Send a floor plan on WhatsApp for a tailored quote.`,
  },
];
