/**
 * Upsert six Sparklights Kenya-intent journal posts (/blog/* = /journal/*).
 * Publishing order: prices → chandelier → buy Nairobi → rooms → LED → new apartment.
 *
 * Note: the first four posts are fully expanded in
 * `scripts/update-four-sparklights-blogs.ts` — run that script after this
 * (or instead) so those articles keep the long teaching versions.
 *
 * Usage (from web/):
 *   npx tsx scripts/seed-sparklights-intent-blogs.ts
 *   npx tsx scripts/update-four-sparklights-blogs.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Post = {
  slug: string;
  title: string;
  topic: string;
  excerpt: string;
  body: string;
  author: string;
  minutes: number;
  featured: boolean;
  published: boolean;
  audienceHref: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  faqs: { q: string; a: string }[];
  sortOrder: number;
  publishedAt: Date;
};

const AUTHOR = "Sparklights 254";

const posts: Post[] = [
  {
    slug: "lighting-prices-nairobi",
    title:
      "How Much Do Lights Cost in Nairobi? Price Guide for Chandeliers, Ceiling, Wall and Kitchen Lights",
    topic: "Prices",
    excerpt:
      "Real Sparklights price bands for chandeliers, ceiling, wall, dining, bedroom and kitchen lights in Nairobi — plus installation and delivery costs.",
    metaTitle: "Lighting Prices Nairobi | Chandeliers & More",
    metaDescription:
      "Chandelier price in Kenya from about KES 5,500. Ceiling, wall, dining and kitchen ranges, install costs and Nairobi delivery from Sparklights 254.",
    audienceHref: "/shop/chandeliers",
    image: "/images/products/5500.jpeg",
    author: AUTHOR,
    minutes: 9,
    featured: true,
    published: true,
    sortOrder: 10,
    publishedAt: new Date("2026-10-05T09:00:00+03:00"),
    faqs: [
      {
        q: "What is a typical chandelier price in Kenya?",
        a: "At Sparklights, most home chandeliers sit between KES 5,500 and KES 25,000. Compact LED pieces start lower; large crystal or multi-tier statement fittings can reach KES 40,000+.",
      },
      {
        q: "Does the price include bulbs?",
        a: "Many modern fixtures include integrated LED. Where bulbs are separate, we list wattage and colour temperature so you buy the right set — ask on WhatsApp before you order.",
      },
      {
        q: "How much does installation cost in Nairobi?",
        a: "Standard ceiling or wall installs usually start from KES 1,500 per fixture. Chandeliers and multi-drop fittings typically run KES 3,000–8,000 depending on height, wiring and access.",
      },
      {
        q: "Is delivery free in Nairobi?",
        a: "Nairobi delivery is typically KES 500–1,500 depending on size and fragility. Larger multi-fixture orders often qualify for reduced or free delivery — confirm when you chat with us.",
      },
      {
        q: "Can you light a whole house on a budget?",
        a: "Yes. Many 2–3 bedroom apartments land between KES 45,000 and KES 120,000 for fixtures alone, before install. Send a room list on WhatsApp for a package quote.",
      },
    ],
    body: `**Chandelier price in Kenya** usually starts around **KES 5,500–8,500** for compact modern pieces, with most living and dining chandeliers landing **KES 8,500–25,000**. Ceiling lights often run **KES 2,500–15,000**, wall lights **KES 2,000–5,500**, and kitchen or dining pendants **KES 2,500–15,000** depending on size and finish. Sparklights 254 is a Nairobi lighting retailer — prices below reflect live catalogue ranges at our Duruma Road showroom.

Sparklights 254 sells [chandeliers](/shop/chandeliers), [ceiling lights](/shop/ceiling-lights), [wall lights](/shop/wall-lights), [pendant lights](/shop/pendant-lights) and [LED & glow lights](/shop/led-glow), with delivery and installation across Kenya. Also read [how to choose a chandelier](/blog/how-to-choose-a-chandelier-kenya), [where to buy lights in Nairobi](/blog/buy-lights-nairobi-delivery-installation), and our [room-by-room ideas](/blog/room-by-room-lighting-ideas-kenya).

## How much do chandeliers cost in Nairobi?

Most Sparklights chandeliers for Kenyan homes sell from about **KES 5,500 to KES 25,000**. Compact LED rings and small modern drops sit at the lower end; crystal, gold and multi-layer statement pieces climb toward **KES 40,500**. Price rises with diameter, material (crystal vs metal), number of light points, and whether LED is built in.

Browse [chandeliers](/shop/chandeliers) or send a ceiling photo on WhatsApp for a shortlist.

## How much do ceiling lights cost in Nairobi?

Ceiling lights at Sparklights typically range **KES 2,500–15,000**, with entry flush and downlight-style pieces from about **KES 550–3,500** and larger decorative discs or multi-head fittings higher. Drivers of price: size, finish (black, gold, chrome), integrated LED quality, and dimming.

Shop [ceiling lights](/shop/ceiling-lights).

## How much do wall lights cost in Kenya?

Wall lights usually sit between **KES 2,000 and KES 5,500**. Indoor sconces for corridors and living rooms cluster around **KES 2,500–3,900**; outdoor-rated or statement pieces cost more. Material, IP rating (for wet zones) and shade type move the price.

Shop [wall lights](/shop/wall-lights).

## Dining room lighting prices

Dining fittings — chandeliers or pendants over the table — commonly land **KES 3,500–18,000**. A single glass pendant can start near **KES 2,500–5,500**; a three-drop or crystal dining chandelier sits higher. Aim for a fitting about half to two-thirds of your table width.

See [pendant lights](/shop/pendant-lights) and [chandeliers](/shop/chandeliers).

## Bedroom lighting prices

Bedroom packages often combine a soft ceiling light (**KES 2,500–8,500**) with wall or bedside options (**KES 2,000–4,500** each). Warm white (about 2700–3000K) keeps the room restful. Total for a calm bedroom set is often **KES 6,000–15,000** before install.

## Kitchen lighting prices

Kitchen task lighting — bright ceiling or under-cabinet LED — typically runs **KES 2,500–12,000** depending on how many points you need. Prefer neutral white (around 4000K) on worktops. Pair with a softer dining pendant if the kitchen is open-plan.

## Price table: light type, range and best use

| Light type | Typical Sparklights range | Best for |
| --- | --- | --- |
| Chandeliers | KES 5,500 – 25,000 (up to 40,500+) | Living, dining, entrance |
| Ceiling lights | KES 2,500 – 15,000 | Bedrooms, halls, open plans |
| Wall lights | KES 2,000 – 5,500 | Corridors, feature walls, bedsides |
| Dining pendants | KES 2,500 – 15,000 | Tables, kitchen islands |
| Kitchen / task LED | KES 2,500 – 12,000 | Counters, pantries |
| Outdoor / solar | KES 550 – 15,500 | Paths, gates, gardens |

## What does installation cost?

Sparklights installs and tests before we leave. As a guide in Nairobi:

1. Standard ceiling or wall light — from about **KES 1,500** per fixture.
2. Chandelier or multi-drop fitting — typically **KES 3,000–8,000** depending on height, existing wiring and access.
3. Multi-room packages — quoted as a set; often better value than single visits.

Complex gypsum cut-outs or new circuits may add time — we confirm after a photo or site check.

## Is delivery free in Nairobi?

Nairobi delivery usually costs **KES 500–1,500** by size and fragility. Larger orders (several fixtures or a full-home package) often qualify for **reduced or free delivery** — ask when you order. We also deliver beyond Nairobi across Kenya on agreed timelines.

## How to budget the cost of lighting a house

1. List every room and the job of the light (ambient, task, accent).
2. Pick a price band per room from the table above.
3. Add installation and delivery.
4. Keep 10–15% spare for dimmers, bulbs or last-minute wall lights.

A practical 2–3 bedroom apartment often lands **KES 45,000–120,000** for fixtures before install. Chat with us on WhatsApp with your room list for a clear Sparklights package quote.`,
  },
  {
    slug: "how-to-choose-a-chandelier-kenya",
    title:
      "How to Choose a Chandelier for Your Living Room or Dining Room (Size, Height and Style)",
    topic: "Chandeliers",
    excerpt:
      "Designer sizing rules for chandeliers in Kenya — diameter, hanging height, style by room, and how Sparklights helps you pick from your measurements.",
    metaTitle: "How to Choose a Chandelier | Size & Height",
    metaDescription:
      "How to choose a chandelier: room length + width in feet ≈ diameter in inches; hang 75–90 cm above dining tables. Modern chandeliers Nairobi tips from Sparklights.",
    audienceHref: "/shop/chandeliers",
    image: "/images/products/imported/1000876126-chandelier-0-1783955455641-1000876126.jpg",
    author: AUTHOR,
    minutes: 8,
    featured: true,
    published: true,
    sortOrder: 20,
    publishedAt: new Date("2026-10-06T09:00:00+03:00"),
    faqs: [
      {
        q: "How do I size a chandelier for my room?",
        a: "Add the room’s length and width in feet; that sum in inches is a solid chandelier diameter. Example: 12 ft × 14 ft → about 26 inches (≈66 cm) across.",
      },
      {
        q: "How high should I hang a chandelier over a dining table?",
        a: "Hang so the bottom sits roughly 75–90 cm above the tabletop, and the fitting spans about half to two-thirds of the table width.",
      },
      {
        q: "What clearance do I need in a walkway?",
        a: "Keep the lowest point at least 2.1 m from the floor so people can walk under it safely.",
      },
      {
        q: "Do modern black metal chandeliers work in Nairobi apartments?",
        a: "Yes — they suit lower ceilings and open-plan living. Pair with warm white LED so the look stays inviting, not harsh.",
      },
      {
        q: "Can Sparklights recommend a size from a photo?",
        a: "Yes. Send room size, ceiling height and a photo on WhatsApp — we recommend diameter, style and a shortlist from stock.",
      },
    ],
    body: `**How to choose a chandelier:** add your room’s length and width in **feet** — that number in **inches** is a reliable chandelier diameter. Over a dining table, aim for about **half to two-thirds** of the table width, hung roughly **75–90 cm** above the tabletop. In walkways, keep the lowest point at least **2.1 m** from the floor. Always measure your own ceiling height first.

Sparklights 254 stocks [modern chandeliers in Nairobi](/shop/chandeliers) with delivery and installation. Pair this guide with our [lighting prices in Nairobi](/blog/lighting-prices-nairobi), [room-by-room ideas](/blog/room-by-room-lighting-ideas-kenya), and [new apartment checklist](/blog/new-apartment-lighting-checklist-nairobi).

## What size chandelier do I need?

1. Measure room length and width in feet.
2. Add them together — use that sum as the chandelier diameter in inches (convert to cm × 2.54 if you prefer metric).
3. For very high ceilings, you can go slightly larger; for low apartments, stay modest so the piece does not dominate.

Example: a **4 m × 5 m** living room is about **13 × 16 ft** → roughly **29 inches (≈74 cm)** diameter.

## How high should I hang a chandelier?

- **Dining table:** bottom of the fitting about **75–90 cm** above the tabletop.
- **Open living / walkway:** lowest point at least **2.1 m** from the finished floor.
- **Double-height entrance:** use a longer drop or chain so the chandelier sits in the visual middle of the void, not stuck at the ceiling.

If your ceiling is under 2.6 m, prefer flush or semi-flush modern pieces over long crystal cascades.

## Chandelier size over a dining table

Pick a diameter about **½ to ⅔** of the table width so diners are not bumping glass, and leave space at each end of a rectangular table. Round tables take a single centred pendant or compact chandelier cleanly.

## Which chandelier style suits which room?

| Style | Feel | Best rooms |
| --- | --- | --- |
| Crystal | Formal, reflective sparkle | Dining, double-height lounge |
| Modern black metal | Sharp, contemporary | Apartments, open-plan living |
| Gold / champagne | Warm luxury | Living rooms, entrances |
| Minimalist ring / disc | Quiet, architectural | Low ceilings, bedrooms adjoining lounges |

## Real Sparklights installs — what we look at

When clients in Kilimani, Kileleshwa or Gigiri send measurements, we check **room size**, **ceiling height**, **table width** (if dining), and **finish** already in the space (black taps, gold handles, warm timber). A mid-size dining room with a 1.6 m table often takes a **60–90 cm** chandelier; a compact apartment lounge may need a **40–55 cm** modern piece instead.

We photograph installs with client permission and label them by room size and ceiling height on request — ask for recent examples in your neighbourhood.

## Common mistakes to avoid

1. Buying only by photo without measuring the ceiling void.
2. Hanging too low over a table (head clashes when standing).
3. Choosing cool daylight LED under a crystal piece — it can feel clinical; warm white flatters most homes.
4. Ignoring weight and fixing type — gypsum needs the right anchor.

## Send us your room size

WhatsApp Sparklights with **length × width**, **ceiling height**, and a quick photo. We will recommend a size and style from current [chandelier](/shop/chandeliers) stock, then quote delivery and installation.`,
  },
  {
    slug: "buy-lights-nairobi-delivery-installation",
    title:
      "Where to Buy Quality Lights in Nairobi: Delivery and Installation in Kilimani, Kileleshwa, Gigiri, Kitengela, Rongai and Across Kenya",
    topic: "Buying guide",
    excerpt:
      "Sparklights 254 — Nyamakima lighting shop with delivery and installation in Kilimani, Kileleshwa, Gigiri, Kitengela, Rongai and across Kenya.",
    metaTitle: "Lighting Shop Nairobi | Delivery & Install",
    metaDescription:
      "Buy quality lights in Nairobi at Sparklights 254, Duruma Road. Chandeliers, ceiling and wall lights with delivery and installation across Kenya.",
    audienceHref: "/showroom",
    image: "/images/products/Screenshot_20251008_135721_1.jpg",
    author: AUTHOR,
    minutes: 8,
    featured: true,
    published: true,
    sortOrder: 30,
    publishedAt: new Date("2026-10-07T09:00:00+03:00"),
    faqs: [
      {
        q: "Where is the Sparklights showroom in Nairobi?",
        a: "Shop 216, 2nd Floor, New Nyamakima Electrical Point Building, Duruma Road, Nairobi. Hours Mon–Sat, 8:00 AM – 6:00 PM. WhatsApp +254 712 827 840.",
      },
      {
        q: "Do you install lights after delivery?",
        a: "Yes. We deliver, fit, and test before we leave. Standard timeline is often same-day or next-day in Nairobi once stock and access are confirmed.",
      },
      {
        q: "Which Nairobi areas do you cover?",
        a: "Kilimani, Kileleshwa, Gigiri, Kitengela, Rongai and most of Nairobi, plus delivery across Kenya on agreed timelines.",
      },
      {
        q: "Can I see lights before buying?",
        a: "Yes — visit the Duruma Road showroom, or WhatsApp photos of stock. We help match finish and size to your room.",
      },
      {
        q: "Do you supply developers and interior designers?",
        a: "Yes. We handle bulk orders, coordinated installs and package quotes — share a schedule or floor plan on WhatsApp.",
      },
    ],
    body: `**Sparklights 254** is a Nairobi lighting retailer and **lighting shop** on Duruma Road, Nyamakima, selling chandeliers, wall lights, ceiling lights, dining, bedroom and kitchen lights — with **delivery and installation** in Kilimani, Kileleshwa, Gigiri, Kitengela, Rongai and across Kenya. WhatsApp **+254 712 827 840**.

Shop [chandeliers](/shop/chandeliers), [ceiling lights](/shop/ceiling-lights) and [wall lights](/shop/wall-lights), or read [lighting prices in Nairobi](/blog/lighting-prices-nairobi) and [how to choose a chandelier](/blog/how-to-choose-a-chandelier-kenya).

## Who we are and what we sell

Sparklights 254 (Spark Lights) serves homeowners, landlords, Airbnb hosts, interior designers and contractors. You get showroom browsing, WhatsApp quoting, M-Pesa-friendly ordering, and a team that installs and tests on site.

## How installation works

1. **Site check or photo review** — send ceiling photos, room size and power points.
2. **Delivery** — scheduled to your gate or site.
3. **Fitting** — anchors, wiring check, hang and level.
4. **Testing** — we switch on, dim if applicable, and tidy before we leave.

Nairobi installs are often **same-day or next-day** once stock and access are confirmed. Outside Nairobi we agree a delivery window first.

## Kilimani lighting delivery and installation

Kilimani apartments and townhouses are a core route. Typical jobs: dining pendants, living chandeliers and warm bedroom ceilings. Low ceilings favour modern flush or compact rings — we size before we hang.

## Kileleshwa lighting delivery and installation

In Kileleshwa we regularly fit living and dining sets in family homes and apartments. Clients often pair a statement dining light with quieter wall wash in the lounge.

## Gigiri lighting delivery and installation

Gigiri homes sometimes need longer drops for higher voids and entrances. We confirm chain length and fixing type before install day.

## Kitengela lighting delivery and installation

Kitengela builds and bungalows get scheduled delivery — confirm timing when you order so fixtures arrive with the install team or just before.

## Rongai lighting delivery and installation

Rongai routes run through the week; chat for today’s schedule. Outdoor path and gate lights are a frequent add-on with indoor packages.

## Delivery across Kenya

Beyond Nairobi we ship securely packed fixtures nationwide. Installation outside our daily routes can be arranged or guided for your local electrician — ask when you quote.

## Visit the showroom (NAP)

- **Address:** Shop 216, 2nd Floor, New Nyamakima Electrical Point Building, Duruma Road, Nairobi, Kenya
- **Hours:** Mon – Sat · 8:00 AM – 6:00 PM
- **Phone / WhatsApp:** +254 712 827 840
- **Map:** [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=New+Nyamakima+Electrical+Point+Building+Duruma+Road+Nairobi)

Come see finishes in person, then we deliver and install at your home.`,
  },
  {
    slug: "room-by-room-lighting-ideas-kenya",
    title:
      "Lighting Ideas for Every Room in a Kenyan Home: Living Room, Bedroom, Dining and Kitchen",
    topic: "Room ideas",
    excerpt:
      "Layered lighting ideas for Kenyan living rooms, bedrooms, dining rooms and kitchens — fittings, brightness and mood from Sparklights installs.",
    metaTitle: "Lighting Ideas for Every Room | Kenya",
    metaDescription:
      "Lighting ideas for living room, bedroom, kitchen and dining in Kenya. Layer ambient, task and accent light with Sparklights fittings and installs.",
    audienceHref: "/rooms/living-room",
    image: "/images/products/roomm3.jpg",
    author: AUTHOR,
    minutes: 9,
    featured: false,
    published: true,
    sortOrder: 40,
    publishedAt: new Date("2026-10-08T09:00:00+03:00"),
    faqs: [
      {
        q: "What is layered lighting?",
        a: "Ambient lights the whole room, task lights the work surface, and accent lights highlight walls or objects. Most Kenyan homes feel unfinished with only one bright ceiling point.",
      },
      {
        q: "What lights work best in a Kenyan living room?",
        a: "A ceiling light or chandelier for ambient light, plus wall lights or a floor lamp for evening mood. Warm white keeps the room welcoming.",
      },
      {
        q: "Should bedrooms use warm or cool light?",
        a: "Warm white around 2700–3000K for rest. Keep bright cool light for desks or dressing only.",
      },
      {
        q: "How bright should a kitchen be?",
        a: "Kitchens need strong task light on counters (often neutral ~4000K) and softer ambient light so the room is not harsh at dinner.",
      },
      {
        q: "Can Sparklights plan a whole flat?",
        a: "Yes — send a floor plan or room list on WhatsApp and we map fittings room by room.",
      },
    ],
    body: `**Lighting ideas for a living room** in Kenya start with layered light: one ambient ceiling or chandelier, task light where you read, and accent wall light for depth. The same pattern scales to bedrooms, dining rooms and kitchens — change brightness and colour temperature, not the logic.

Sparklights 254 installs these layers in Nairobi homes. Explore [ceiling lights](/shop/ceiling-lights), [wall lights](/shop/wall-lights), [chandeliers](/shop/chandeliers) and [pendant lights](/shop/pendant-lights). Related guides: [LED warm vs cool](/blog/led-lights-warm-vs-cool-white-kenya) and [new apartment checklist](/blog/new-apartment-lighting-checklist-nairobi).

## What is layered lighting?

1. **Ambient** — general light from the ceiling.
2. **Task** — brighter light for cooking, reading or makeup.
3. **Accent** — wall wash, art light or glow that adds depth.

One bare bulb does none of this well.

## Living room lighting ideas

Use a [chandelier](/shop/chandeliers) or decorative [ceiling light](/shop/ceiling-lights) as ambient, then [wall lights](/shop/wall-lights) for evening mood. Warm white (~2700–3000K) flatters finishes. Dimmer control helps movie nights and hosting.

See our [living room](/rooms/living-room) guide.

## Bedroom lighting ideas

Keep the ceiling soft and add bedside wall or table light so you are not blasting the whole room at night. Warm white only. Avoid cool daylight over the bed.

See [bedroom](/rooms/bedroom) ideas and [bedroom lighting](/blog/bedroom-lighting-ideas-kenya).

## Dining room lighting

Make the table the focus: one chandelier or pendant cluster at **75–90 cm** above the tabletop. Warm white, dimmable if you host dinners. Sideboard wall lights optional.

See [dining room](/rooms/dining-room) and [how to choose a chandelier](/blog/how-to-choose-a-chandelier-kenya).

## Kitchen lighting ideas

Put bright **task** light on counters (neutral ~4000K works well) and softer ambient on the ceiling. Islands take pendants. Keep IP-aware choices away from direct steam if needed.

See [kitchen](/rooms/kitchen) and [kitchen lighting ideas](/blog/kitchen-lighting-ideas-kenya).

## Room-by-room cheat sheet

| Room | Main fitting | Mood / colour | Shop |
| --- | --- | --- | --- |
| Living | Ceiling or chandelier + walls | Warm, dimmable | [Chandeliers](/shop/chandeliers) |
| Bedroom | Soft ceiling + bedside | Warm 2700–3000K | [Ceiling lights](/shop/ceiling-lights) |
| Dining | Pendant / chandelier | Warm feature | [Pendants](/shop/pendant-lights) |
| Kitchen | Bright ceiling + task | Neutral on counters | [LED & glow](/shop/led-glow) |

## Before and after — why photos matter

Original install photos beat stock images for trust. When we light a Kilimani lounge or Kileleshwa dining room, the “after” usually shows warmer ambience, fewer harsh shadows and a clear focal fitting. Ask on WhatsApp for recent project examples in your area.

## Next step

Walk each room with the cheat sheet, then send Sparklights a photo set. We will map products and an install plan.`,
  },
  {
    slug: "led-lights-warm-vs-cool-white-kenya",
    title: "LED Lights in Kenya: Warm White vs Cool White and How to Cut Your Electricity Bill",
    topic: "LED",
    excerpt:
      "Warm white vs cool white explained for Kenyan homes — which rooms suit which, what to check when buying LED, and how LEDs use less power than older bulbs.",
    metaTitle: "LED Lights Kenya | Warm vs Cool White",
    metaDescription:
      "LED lights Kenya guide: warm 2700–3000K, neutral 4000K, cool 5000–6500K. Pick the right colour and cut power use vs old bulbs with Sparklights.",
    audienceHref: "/shop/led-glow",
    image: "/images/products/3500.jpeg",
    author: AUTHOR,
    minutes: 7,
    featured: false,
    published: true,
    sortOrder: 50,
    publishedAt: new Date("2026-10-09T09:00:00+03:00"),
    faqs: [
      {
        q: "What is warm white vs cool white?",
        a: "Warm white is about 2700–3000K (cosy, yellowish). Neutral is about 4000K. Cool white is about 5000–6500K (bluish, alert). Homes usually want warm living spaces and cooler task zones.",
      },
      {
        q: "Which bulb colour is best for a Kenyan living room?",
        a: "Warm white around 2700–3000K. It flatters wood, fabric and skin tones after sunset.",
      },
      {
        q: "Do LED lights really save electricity?",
        a: "Yes. LEDs use far less wattage for similar brightness than older incandescent or many halogen bulbs, and they last longer — so you replace them less often.",
      },
      {
        q: "What should I check before buying an LED bulb or fixture?",
        a: "Wattage, lumens (brightness), colour temperature (Kelvin), dimmable or not, and warranty. Match Kelvin across the room so colours do not clash.",
      },
      {
        q: "Where can I buy LED lights in Nairobi?",
        a: "Sparklights 254 stocks LED fixtures and glow lighting at Duruma Road, Nyamakima, with delivery and installation across Kenya.",
      },
    ],
    body: `**LED lights in Kenya** come in three everyday colour bands: **warm white about 2700–3000K** for living and bedrooms, **neutral about 4000K** for kitchens and desks, and **cool white about 5000–6500K** for garages, security and some offices. LEDs use far less power than older bulbs for similar brightness — that is the core electricity saving.

Sparklights 254 sells [LED & glow lights](/shop/led-glow), [ceiling lights](/shop/ceiling-lights) and full room fittings. Also see [room-by-room ideas](/blog/room-by-room-lighting-ideas-kenya) and [lighting prices](/blog/lighting-prices-nairobi).

## What is warm white vs cool white?

Colour temperature is measured in **Kelvin (K)**:

- **2700–3000K (warm)** — soft, inviting, slightly golden.
- **~4000K (neutral)** — clean white for tasks without feeling icy.
- **5000–6500K (cool)** — bright, bluish, high alertness.

Mixing warm and cool in one sightline often looks accidental. Pick a family per room.

## Which rooms suit which colour?

| Colour | Mood | Best rooms |
| --- | --- | --- |
| Warm 2700–3000K | Relaxed, welcoming | Living, dining, bedroom |
| Neutral ~4000K | Clear, practical | Kitchen counters, study, laundry |
| Cool 5000–6500K | Alert, clinical | Garage, workshop, some offices |

## How LED cuts your electricity bill

LED fixtures convert more energy into light and less into heat than older bulb types. Replacing high-wattage hot bulbs with efficient LED of similar **lumens** usually drops the watts on that circuit. Exact savings depend on how many hours you leave lights on and your tariff — we keep claims general unless we meter a site.

Tips that help most homes:

1. Use warm LEDs on dimmers in living areas so you are not at full power all evening.
2. Put brighter neutral task light only where you work.
3. Turn off ambient layers when you leave the room — LED still uses power when on.

## What to check when buying LED in Kenya

1. **Watts** — power draw.
2. **Lumens** — brightness (compare lumens, not watts alone).
3. **Kelvin** — warm / neutral / cool.
4. **Dimmable** — only if your switch supports it.
5. **Warranty** — ask us what the fixture includes.
6. **CRI** (if listed) — higher renders colours more naturally.

## Common mistakes

- Cool white in bedrooms (sleep suffers).
- Buying by watts only and ending up too dim or too bright.
- Non-dimmable bulbs on a dimmer switch.

## Shop LED with Sparklights

Browse [LED & glow](/shop/led-glow) or WhatsApp a photo of your current bulbs — we will match colour temperature and brightness for each room.`,
  },
  {
    slug: "new-apartment-lighting-checklist-nairobi",
    title:
      "Lighting a New Apartment or Home in Nairobi: A Room-by-Room Checklist for Owners, Landlords and Designers",
    topic: "Checklist",
    excerpt:
      "A practical Nairobi checklist for lighting a new apartment or home — decisions before wiring, what to order, what to install last, plus designer bulk orders.",
    metaTitle: "New Apartment Lighting Checklist Nairobi",
    metaDescription:
      "Lighting a new house Kenya checklist for Nairobi apartments: wiring decisions, orders, install order, Airbnb tips and designer bulk coordination.",
    audienceHref: "/request-a-quote",
    image: "/images/products/round3.jpg",
    author: AUTHOR,
    minutes: 8,
    featured: false,
    published: true,
    sortOrder: 60,
    publishedAt: new Date("2026-10-10T09:00:00+03:00"),
    faqs: [
      {
        q: "When should I choose lights in a new build?",
        a: "Before final wiring and gypsum closing where possible — so points, switches and cut-outs land in the right places.",
      },
      {
        q: "What order should I install lights?",
        a: "Rough-in and wiring first, paint and finishes next, then hang fixtures last so glass and metal stay clean.",
      },
      {
        q: "Do landlords and Airbnb hosts need different lighting?",
        a: "They need durable, easy-to-replace LEDs, warm living/bedroom light for reviews, and enough brightness in kitchens and bathrooms for practical stays.",
      },
      {
        q: "Can interior designers order in bulk from Sparklights?",
        a: "Yes. Share schedules, floor plans and finish boards — we coordinate supply and installation windows.",
      },
      {
        q: "How do I get a quote?",
        a: "WhatsApp +254 712 827 840 with your room list or floor plan, or use the request-a-quote form on sparklights.co.ke.",
      },
    ],
    body: `**Lighting a new house in Kenya** (or a Nairobi apartment) goes smoothly when you decide points and colour temperature **before** wiring closes, order fixtures early, and hang glass last. This checklist is for owners, landlords, Airbnb hosts and interior designers working with Sparklights 254.

Use it with [lighting prices](/blog/lighting-prices-nairobi), [room-by-room ideas](/blog/room-by-room-lighting-ideas-kenya) and [buy lights in Nairobi](/blog/buy-lights-nairobi-delivery-installation). Shop [ceiling lights](/shop/ceiling-lights), [chandeliers](/shop/chandeliers) and [wall lights](/shop/wall-lights).

## Before wiring — decide these first

1. Which rooms need **ambient / task / accent** layers.
2. Switch positions (door side, dimmers for living/dining).
3. Colour temperature plan (warm living/sleep; neutral kitchen/desk).
4. Chandelier or pendant points over dining and island — confirm junction boxes can take the weight.
5. Bathroom IP needs near showers.

## What to order

1. One main ceiling or chandelier per primary room.
2. Wall lights for corridors and bedsides where planned.
3. Kitchen task LED and dining feature light.
4. Outdoor entry or path light if you control the gate area.
5. Spare LED lamps that match Kelvin across the home.

## What to install last

Hang decorative fixtures **after** painting and major dust work. Test every point, then dimmers. Keep packaging until you confirm no transit damage.

## Room-by-room mini checklist

| Room | Must-have | Nice-to-have |
| --- | --- | --- |
| Living | Ceiling / chandelier + warm LED | Wall lights, dimmer |
| Dining | Feature pendant / chandelier | Sideboard wall light |
| Bedroom | Soft ceiling + bedside | Wardrobe strip |
| Kitchen | Bright task + ambient | Island pendants |
| Bath | Safe IP-rated mirror / ceiling | Night glow |
| Corridor | Even spaced ceiling or walls | Motion where useful |

## For interior designers and developers

Sparklights supports **bulk orders**, staged deliveries and install coordination. Send:

- Floor plans or reflected ceiling plans
- Finish schedule (black / gold / chrome)
- Programme dates for each block or floor
- Who signs off on site

We quote supply and installation clearly so your client sees one path from sample to handover.

## Airbnb and landlord notes

Prioritise durable LED, warm living/bedroom light for guest photos, bright kitchens, and fittings that are easy to replace. Avoid fragile statement glass in high-turnover units unless the budget covers careful guests.

## Copyable checklist

- [ ] Room list with ambient / task / accent marked
- [ ] Colour temperature plan per room
- [ ] Switch and dimmer positions confirmed
- [ ] Fixture shortlist with sizes (see [chandelier guide](/blog/how-to-choose-a-chandelier-kenya))
- [ ] Order placed with delivery window
- [ ] Install after paint / gypsum dust
- [ ] Final test and walkthrough

## Get a Sparklights quote

WhatsApp **+254 712 827 840** with your checklist or floor plan, or use [request a quote](/request-a-quote). We will map products, delivery and installation for your Nairobi apartment or Kenya-wide project.`,
  },
];

async function upsertSeo(path: string, title: string, description: string, h1: string) {
  await prisma.seoPage.upsert({
    where: { path },
    create: {
      path,
      title,
      description,
      h1,
      canonical: `https://sparklights.co.ke${path}`,
      family: "journal",
      schemaType: "Article",
      parentPath: "/journal",
      indexable: true,
      published: true,
      lastModified: new Date(),
    },
    update: {
      title,
      description,
      h1,
      canonical: `https://sparklights.co.ke${path}`,
      indexable: true,
      published: true,
      lastModified: new Date(),
    },
  });
}

async function main() {
  for (const post of posts) {
    const data = {
      title: post.title,
      topic: post.topic,
      excerpt: post.excerpt,
      body: post.body,
      author: post.author,
      minutes: post.minutes,
      featured: post.featured,
      published: post.published,
      audienceHref: post.audienceHref,
      image: post.image,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      faqs: post.faqs,
      sortOrder: post.sortOrder,
      publishedAt: post.publishedAt,
    };

    await prisma.blog.upsert({
      where: { slug: post.slug },
      create: { slug: post.slug, ...data },
      update: data,
    });

    await upsertSeo(`/blog/${post.slug}`, post.metaTitle, post.metaDescription, post.title);
    await upsertSeo(`/journal/${post.slug}`, post.metaTitle, post.metaDescription, post.title);

    console.log("upserted", post.slug);
  }

  console.log(`Done — ${posts.length} Sparklights intent blogs.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
