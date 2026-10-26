/**
 * Fully rewrite / expand four Sparklights intent blogs with clearer teaching.
 *
 * Usage: npx tsx scripts/update-four-sparklights-blogs.ts
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
      "A clear Nairobi lighting price guide: what chandeliers, ceiling, wall, dining and kitchen lights really cost in 2026 — and what drives delivery and installation fees at Sparklights 254.",
    metaTitle: "Lighting Prices Nairobi | Chandeliers & More",
    metaDescription:
      "Chandelier price in Kenya from about KES 5,500. Ceiling, wall, dining and kitchen ranges, install costs and Nairobi delivery from Sparklights 254.",
    audienceHref: "/shop/chandeliers",
    image: "/images/products/5500.jpeg",
    author: AUTHOR,
    minutes: 12,
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
      {
        q: "Why do two similar lights have very different prices?",
        a: "Diameter, material (crystal vs metal), number of light points, integrated LED quality, finish (gold/chrome/black), and how hard the piece is to pack and hang all move the price.",
      },
    ],
    body: `**Lighting prices in Nairobi** are easier to understand when you separate three numbers: the **fixture price**, **delivery**, and **installation**. At Sparklights 254, a compact modern chandelier often starts around **KES 5,500–8,500**, most living and dining pieces land **KES 8,500–25,000**, and statement crystal or multi-tier fittings can reach **KES 40,500+**. Ceiling lights commonly run **KES 2,500–15,000**, wall lights **KES 2,000–5,500**, and kitchen or dining pendants **KES 2,500–15,000**.

This guide explains *what you are paying for*, not only the sticker. Prices below reflect live catalogue ranges at our Duruma Road showroom (Nyamakima). WhatsApp **+254 712 827 840** for a shortlist against your room sizes.

Shop [chandeliers](/shop/chandeliers), [ceiling lights](/shop/ceiling-lights), [wall lights](/shop/wall-lights), [pendant lights](/shop/pendant-lights) and [LED & glow](/shop/led-glow). Also read [how to choose a chandelier](/blog/how-to-choose-a-chandelier-kenya), [where to buy lights in Nairobi](/blog/buy-lights-nairobi-delivery-installation), and [room-by-room ideas](/blog/room-by-room-lighting-ideas-kenya).

## Why lighting prices vary so much

Two fittings can look similar in a photo and still differ by tens of thousands of shillings. The price usually moves with:

1. **Size** — a 40 cm modern ring costs less than a 90 cm multi-tier piece that fills a high lounge.
2. **Material** — metal and acrylic sit lower; cut crystal, glass arms and brass-heavy frames sit higher.
3. **Light points** — more lamps (or a longer integrated LED run) means more hardware and brighter coverage.
4. **Finish quality** — consistent black, champagne or gold plating that matches taps and handles.
5. **LED quality** — warmer colour, better drivers and longer warranty cost more than a harsh cheap chip.
6. **Install difficulty** — heavy or multi-drop pieces need stronger fixing and more labour time.

If you only compare “chandelier vs chandelier” without size and finish, the market looks random. Measure first, then shop the band that fits your room.

## How much do chandeliers cost in Nairobi?

Most Sparklights chandeliers for Kenyan homes sell from about **KES 5,500 to KES 25,000**.

| Band | Typical range | What you usually get |
| --- | --- | --- |
| Entry modern | KES 5,500 – 8,500 | Compact LED rings, small drops, apartment lounges |
| Everyday home | KES 8,500 – 18,000 | Mid-size dining / living pieces, black or gold metal |
| Statement | KES 18,000 – 25,000+ | Larger diameter, richer detail, higher ceilings |
| Luxury crystal / tiered | up to KES 40,500+ | Multi-layer sparkle, double-height or formal dining |

**Worked example:** a Kilimani 3-seater dining table about 1.6 m long often pairs with a **60–80 cm** fitting in the **KES 8,500–18,000** band. A compact bedsitter lounge may be happier with a **KES 5,500–9,500** flush or small ring so the room does not feel crowded.

Browse [chandeliers](/shop/chandeliers) or send a ceiling photo on WhatsApp for a shortlist.

## How much do ceiling lights cost in Nairobi?

Ceiling lights at Sparklights typically range **KES 2,500–15,000**, with simple flush and downlight-style pieces from about **KES 550–3,500** and larger decorative discs or multi-head fittings higher.

Ceiling lights are the workhorses of Kenyan apartments: bedrooms, corridors, kitchens and open-plan living. Price rises with diameter, finish, integrated LED quality, and whether the piece is dimmable.

Shop [ceiling lights](/shop/ceiling-lights).

## How much do wall lights cost in Kenya?

Wall lights usually sit between **KES 2,000 and KES 5,500**. Indoor sconces for corridors and living rooms cluster around **KES 2,500–3,900**; outdoor-rated or statement pieces cost more.

Wall lights matter because they finish a room when the ceiling light alone looks flat. Two corridor sconces at **KES 2,500** each can change how a long hallway feels at night more than upgrading only the centre bulb.

Shop [wall lights](/shop/wall-lights).

## Dining room lighting prices — explained

Dining fittings — chandeliers or pendants over the table — commonly land **KES 3,500–18,000**.

- A single glass pendant can start near **KES 2,500–5,500**.
- A three-drop or crystal dining chandelier sits higher.
- Aim for a fitting about **half to two-thirds** of your table width so diners are not bumping glass.

See [pendant lights](/shop/pendant-lights) and [chandeliers](/shop/chandeliers). For hang height rules, read [how to choose a chandelier](/blog/how-to-choose-a-chandelier-kenya).

## Bedroom lighting prices — explained

A calm bedroom is rarely one bright centre light. Budget for:

1. Soft ceiling light — **KES 2,500–8,500**
2. Bedside wall or table light — **KES 2,000–4,500** each

Total for a simple warm set is often **KES 6,000–15,000** before install. Use warm white (**about 2700–3000K**) so the room feels restful, not like an office.

## Kitchen lighting prices — explained

Kitchen lighting has two jobs: **see the food** (task) and **feel welcoming** (ambient).

- Task / bright ceiling or under-cabinet LED: typically **KES 2,500–12,000** depending on points needed
- Prefer **neutral white (~4000K)** on worktops
- If the kitchen is open to dining, add a softer pendant so dinner does not feel clinical

Shop [LED & glow](/shop/led-glow) and [kitchen ideas](/rooms/kitchen).

## Price table: light type, range and best use

| Light type | Typical Sparklights range | Best for |
| --- | --- | --- |
| Chandeliers | KES 5,500 – 25,000 (up to 40,500+) | Living, dining, entrance |
| Ceiling lights | KES 2,500 – 15,000 | Bedrooms, halls, open plans |
| Wall lights | KES 2,000 – 5,500 | Corridors, feature walls, bedsides |
| Dining pendants | KES 2,500 – 15,000 | Tables, kitchen islands |
| Kitchen / task LED | KES 2,500 – 12,000 | Counters, pantries |
| Outdoor / solar | KES 550 – 15,500 | Paths, gates, gardens |

## What does installation cost — and why?

Sparklights installs and tests before we leave. Labour is not “extra for fun”; it covers safe fixing, wiring checks, levelling and cleanup.

As a Nairobi guide:

1. Standard ceiling or wall light — from about **KES 1,500** per fixture.
2. Chandelier or multi-drop fitting — typically **KES 3,000–8,000** depending on height, existing wiring and access.
3. Multi-room packages — quoted as a set; often better value than single visits.

Complex gypsum cut-outs, weak boxes, or new circuits may add time — we confirm after a photo or site check. Heavy crystal on a soft gypsum ceiling needs the right anchor; skipping that step is how fittings fail.

## Is delivery free in Nairobi?

Nairobi delivery usually costs **KES 500–1,500** by size and fragility. Glass and crystal need careful packing; that is part of what you pay for. Larger orders (several fixtures or a full-home package) often qualify for **reduced or free delivery** — ask when you order. We also deliver beyond Nairobi across Kenya on agreed timelines.

## How to budget the cost of lighting a house

Use this simple method instead of guessing from one Instagram photo:

1. List every room and the job of the light (ambient, task, accent).
2. Pick a price band per room from the table above.
3. Add installation and delivery.
4. Keep **10–15%** spare for dimmers, bulbs or last-minute wall lights.

**Example budget — 2–3 bedroom apartment (fixtures only, before install):**

| Zone | Rough fixture band |
| --- | --- |
| Living | KES 8,500 – 25,000 |
| Dining | KES 5,500 – 18,000 |
| 2–3 bedrooms | KES 6,000 – 12,000 each set |
| Kitchen | KES 5,000 – 15,000 |
| Corridor / walls | KES 4,000 – 12,000 |

Many Nairobi apartments land **KES 45,000–120,000** for fixtures before install. WhatsApp your room list for a Sparklights package quote that matches real stock.

## Next step

Decide your rooms and budget band, then visit the Duruma Road showroom or chat with photos. We will map products, delivery and installation so the total cost is clear before you pay.`,
  },
  {
    slug: "how-to-choose-a-chandelier-kenya",
    title:
      "How to Choose a Chandelier for Your Living Room or Dining Room (Size, Height and Style)",
    topic: "Chandeliers",
    excerpt:
      "A full Kenyan buyer’s explanation of chandelier size, hanging height and style — with worked examples for Nairobi living and dining rooms, plus what Sparklights checks before install.",
    metaTitle: "How to Choose a Chandelier | Size & Height",
    metaDescription:
      "How to choose a chandelier: room length + width in feet ≈ diameter in inches; hang 75–90 cm above dining tables. Modern chandeliers Nairobi tips from Sparklights.",
    audienceHref: "/shop/chandeliers",
    image: "/images/products/imported/1000876126-chandelier-0-1783955455641-1000876126.jpg",
    author: AUTHOR,
    minutes: 11,
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
      {
        q: "What if my ceiling is low?",
        a: "Prefer flush, semi-flush or short-drop modern rings. Long crystal cascades need height; on a 2.4–2.6 m ceiling they often hang too low.",
      },
    ],
    body: `**How to choose a chandelier** is mostly three decisions: **size**, **hanging height**, and **style** — then match LED colour so the piece looks warm in a Kenyan home, not clinical. The designer shortcut for size is: add your room’s length and width in **feet**; that number in **inches** is a reliable chandelier diameter. Over a dining table, aim for about **half to two-thirds** of the table width, hung roughly **75–90 cm** above the tabletop. In walkways, keep the lowest point at least **2.1 m** from the floor.

Sparklights 254 stocks [modern chandeliers in Nairobi](/shop/chandeliers) with delivery and installation. Pair this guide with [lighting prices in Nairobi](/blog/lighting-prices-nairobi), [room-by-room ideas](/blog/room-by-room-lighting-ideas-kenya), and the [new apartment checklist](/blog/new-apartment-lighting-checklist-nairobi).

## Why size matters more than the photo

A chandelier that looked perfect online can overwhelm a bedsitter or disappear in a double-height lounge. Size controls three things:

1. **Proportion** — does the piece sit calmly in the room or shout over the furniture?
2. **Clearance** — will people walk under it or stand up from the table without hitting glass?
3. **Light coverage** — a tiny fitting over a large dining set leaves the ends of the table in shade.

Always measure **room size**, **ceiling height**, and **table width** (if dining) before you fall in love with a photo.

## What size chandelier do I need? (step by step)

1. Measure room length and width in **feet** (or convert metres: metres × 3.28 ≈ feet).
2. Add length + width.
3. Use that sum as the chandelier diameter in **inches**.
4. Convert to cm if you prefer: inches × 2.54.
5. For very high ceilings you can go slightly larger; for low apartments, stay modest.

### Worked examples

| Room | Approx size | Suggested diameter |
| --- | --- | --- |
| Compact apartment lounge | 3.5 m × 4 m (~11.5 × 13 ft) | ~24–25 in / **60–64 cm** |
| Typical living room | 4 m × 5 m (~13 × 16 ft) | ~29 in / **≈74 cm** |
| Larger open lounge | 5 m × 6 m (~16 × 20 ft) | ~36 in / **≈90 cm** |

If the room is long but you only light the seating zone, size for the **zone**, not the whole open plan — otherwise the chandelier fights the dining pendant.

## How high should I hang a chandelier?

Height mistakes are the most common install complaints. Use these rules:

- **Dining table:** bottom of the fitting about **75–90 cm** above the tabletop. Lower feels intimate; higher feels airy. If tall guests stand to toast, stay nearer **90 cm**.
- **Open living / walkway:** lowest point at least **2.1 m** from the finished floor so people walk under safely.
- **Double-height entrance:** use a longer drop or chain so the chandelier sits in the **visual middle** of the void, not stuck at the ceiling like a leftover bulb.

### Low Nairobi ceilings

Many apartments sit around **2.4–2.7 m**. On those heights:

- Prefer **flush**, **semi-flush**, or short-drop modern rings/discs.
- Avoid long crystal cascades unless you have a void or staircase.
- Confirm the junction box / gypsum fixing can take the weight before purchase.

## Chandelier size over a dining table (explained)

1. Measure table width (short side on a rectangle).
2. Choose a fitting about **½ to ⅔** of that width.
3. Leave breathing space at each end of a rectangular table — the light should mark the place setting zone, not the whole room.
4. Round tables take a single centred pendant or compact chandelier cleanly.

**Example:** table 100 cm wide → chandelier about **50–70 cm**. Table 160 cm long × 90 cm wide → often a **55–70 cm** piece centred on the long axis.

## Which chandelier style suits which room?

| Style | Feel | Best rooms | Watch-outs |
| --- | --- | --- | --- |
| Crystal | Formal, reflective sparkle | Dining, double-height lounge | Needs warm LED; heavier install |
| Modern black metal | Sharp, contemporary | Apartments, open-plan living | Pair with warm white so it stays inviting |
| Gold / champagne | Warm luxury | Living rooms, entrances | Match existing brass/gold hardware |
| Minimalist ring / disc | Quiet, architectural | Low ceilings, bedrooms adjoining lounges | Size carefully — too small looks lost |

Style should follow **furniture and finishes** already in the room. Black taps and dark sofas often love black metal; timber and cream fabrics often love champagne gold or soft crystal with warm LED.

## Colour temperature — the detail that ruins a good chandelier

Even the right size looks wrong under harsh cool white. For living and dining:

- Prefer **warm white ~2700–3000K**
- Avoid **5000–6500K** under crystal unless you want a showroom/clinic feel
- Keep Kelvin consistent across the room so wall lights do not fight the chandelier

More on colour: [LED warm vs cool white](/blog/led-lights-warm-vs-cool-white-kenya).

## Real Sparklights installs — what we look at

When clients in Kilimani, Kileleshwa or Gigiri send measurements, we check:

1. **Room size** and whether the space is open-plan
2. **Ceiling height** and gypsum vs concrete fixing
3. **Table width** for dining pieces
4. **Finish** already in the space (black taps, gold handles, warm timber)
5. **Weight and power** at the point

A mid-size dining room with a 1.6 m table often takes a **60–90 cm** chandelier; a compact apartment lounge may need a **40–55 cm** modern piece instead. Ask for recent examples in your neighbourhood if you want visual proof before you buy.

## Common mistakes to avoid

1. Buying only by photo without measuring the ceiling void.
2. Hanging too low over a table (head clashes when standing).
3. Choosing cool daylight LED under a crystal piece — it can feel clinical.
4. Ignoring weight and fixing type — gypsum needs the right anchor.
5. Picking a huge statement light for a tiny room “because it looked expensive.”
6. Forgetting dimmers in dining rooms where you host evenings.

## Send us your room size

WhatsApp Sparklights with **length × width**, **ceiling height**, and a quick photo. We will recommend a size and style from current [chandelier](/shop/chandeliers) stock, then quote delivery and installation so you are not guessing alone.`,
  },
  {
    slug: "buy-lights-nairobi-delivery-installation",
    title:
      "Where to Buy Quality Lights in Nairobi: Delivery and Installation in Kilimani, Kileleshwa, Gigiri, Kitengela, Rongai and Across Kenya",
    topic: "Buying guide",
    excerpt:
      "Full explanation of how to buy lights in Nairobi from Sparklights 254 — showroom, WhatsApp ordering, delivery areas, installation steps, and what to prepare before our team arrives.",
    metaTitle: "Lighting Shop Nairobi | Delivery & Install",
    metaDescription:
      "Buy quality lights in Nairobi at Sparklights 254, Duruma Road. Chandeliers, ceiling and wall lights with delivery and installation across Kenya.",
    audienceHref: "/showroom",
    image: "/images/products/Screenshot_20251008_135721_1.jpg",
    author: AUTHOR,
    minutes: 11,
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
      {
        q: "What should I prepare before installation day?",
        a: "Clear access to the room, confirm power is available, share gate/parking notes, and finish painting or dusty gypsum work before decorative glass is hung.",
      },
    ],
    body: `**Where to buy quality lights in Nairobi** depends on three things most buyers forget until install day: **real stock you can see**, **safe delivery**, and **someone who can hang and test the fitting**. Sparklights 254 is a Nairobi lighting retailer and lighting shop on Duruma Road, Nyamakima. We sell chandeliers, wall lights, ceiling lights, dining, bedroom and kitchen lights — with **delivery and installation** in Kilimani, Kileleshwa, Gigiri, Kitengela, Rongai and across Kenya.

WhatsApp **+254 712 827 840**. Showroom hours: Mon–Sat, 8:00 AM – 6:00 PM.

Shop [chandeliers](/shop/chandeliers), [ceiling lights](/shop/ceiling-lights) and [wall lights](/shop/wall-lights). Also read [lighting prices in Nairobi](/blog/lighting-prices-nairobi) and [how to choose a chandelier](/blog/how-to-choose-a-chandelier-kenya).

## Who Sparklights is for

We serve:

- **Homeowners** finishing a house or upgrading one tired room
- **Landlords and Airbnb hosts** who need durable, photo-friendly lighting
- **Interior designers** who need coordinated finishes and install windows
- **Contractors / developers** ordering in bulk for units or floors

You get showroom browsing, WhatsApp quoting, M-Pesa-friendly ordering, and a team that installs and tests on site — so you are not left with a boxed chandelier and a YouTube tutorial.

## How buying works (start to finish)

1. **Browse or visit** — website, WhatsApp photos, or Duruma Road showroom.
2. **Share room facts** — size, ceiling height, photos, finish preference (black / gold / chrome).
3. **Get a shortlist** — we match size and style to the room, not only the trend photo.
4. **Confirm quote** — fixture + delivery + installation spelled out.
5. **Schedule** — delivery and install window (often same-day / next-day in Nairobi when stock allows).
6. **Fit and test** — we hang, level, switch on, and tidy before we leave.

That sequence is why “buy from a lighting shop that installs” usually costs less stress than the cheapest boxed import with no aftercare.

## How installation works — explained

Installation is more than screwing a plate into the ceiling.

1. **Site check or photo review** — ceiling photos, room size, power points, gypsum vs concrete.
2. **Delivery** — packed for glass/crystal, scheduled to your gate or site.
3. **Fitting** — correct anchors, wiring check, hang and level.
4. **Testing** — switch on, check dimmers if fitted, confirm nothing flickers or leans.
5. **Handover** — you see the light working before the team leaves.

Nairobi installs are often **same-day or next-day** once stock and access are confirmed. Outside Nairobi we agree a delivery window first. Complex gypsum cut-outs or new circuits may need an extra visit — we say so early.

### What you should prepare

- Clear furniture access under the install point
- Confirm electricity is available on site
- Share gate codes, parking notes, and estate rules
- Finish painting / dusty gypsum work **before** decorative glass goes up
- Tell us if the ceiling box is weak or missing — better before we arrive

## Kilimani lighting delivery and installation

Kilimani apartments and townhouses are a core route. Typical jobs: dining pendants, living chandeliers and warm bedroom ceilings. Low ceilings favour modern flush or compact rings — we size before we hang so the piece does not sit in walking height.

Common ask: open-plan lounge + dining with one statement light and quieter ambient layers. We plan both so the rooms do not fight.

## Kileleshwa lighting delivery and installation

In Kileleshwa we regularly fit living and dining sets in family homes and apartments. Clients often pair a statement dining light with quieter wall wash in the lounge. Family homes may need corridor wall lights so children are not walking dark halls at night.

## Gigiri lighting delivery and installation

Gigiri homes sometimes need longer drops for higher voids and entrances. We confirm chain length, weight and fixing type before install day. Outdoor entry lighting is a frequent add-on when the driveway or gate is part of the brief.

## Kitengela lighting delivery and installation

Kitengela builds and bungalows get scheduled delivery — confirm timing when you order so fixtures arrive with the install team or just before. New builds benefit from choosing points **before** gypsum closes; see our [new apartment checklist](/blog/new-apartment-lighting-checklist-nairobi).

## Rongai lighting delivery and installation

Rongai routes run through the week; chat for today’s schedule. Outdoor path and gate lights are a frequent add-on with indoor packages. Tell us about access roads and preferred delivery hours when you order.

## Delivery across Kenya

Beyond Nairobi we ship securely packed fixtures nationwide. Installation outside our daily routes can be arranged or guided for your local electrician — ask when you quote so expectations are clear on timeline and labour.

## Why Nyamakima (and why a showroom still matters)

Nyamakima remains Nairobi’s main electrical and lighting trade hub. A physical showroom lets you:

- Compare **finish** under real light (phone photos lie)
- Feel **scale** against other pieces
- Ask sizing questions before money leaves your account

**NAP — visit us**

- **Address:** Shop 216, 2nd Floor, New Nyamakima Electrical Point Building, Duruma Road, Nairobi, Kenya
- **Hours:** Mon – Sat · 8:00 AM – 6:00 PM
- **Phone / WhatsApp:** +254 712 827 840
- **Map:** [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=New+Nyamakima+Electrical+Point+Building+Duruma+Road+Nairobi)

## For designers and bulk projects

Share floor plans, finish boards and programme dates. We coordinate supply batches and install windows so units hand over consistently. Package quotes keep clients from piecing ten suppliers together.

## Next step

Visit the showroom, or WhatsApp photos of your rooms. Tell us the area (Kilimani, Kileleshwa, Gigiri, Kitengela, Rongai or elsewhere in Kenya) and whether you need **supply only** or **supply and install**. We will reply with a clear path from stock to a working light.`,
  },
  {
    slug: "room-by-room-lighting-ideas-kenya",
    title:
      "Lighting Ideas for Every Room in a Kenyan Home: Living Room, Bedroom, Dining and Kitchen",
    topic: "Room ideas",
    excerpt:
      "Fully explained lighting ideas for Kenyan living rooms, bedrooms, dining rooms and kitchens — what layered light means, which fittings to use, and how Sparklights plans each room.",
    metaTitle: "Lighting Ideas for Every Room | Kenya",
    metaDescription:
      "Lighting ideas for living room, bedroom, kitchen and dining in Kenya. Layer ambient, task and accent light with Sparklights fittings and installs.",
    audienceHref: "/rooms/living-room",
    image: "/images/products/roomm3.jpg",
    author: AUTHOR,
    minutes: 12,
    featured: true,
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
      {
        q: "Do I need a chandelier in every room?",
        a: "No. Chandeliers shine in living, dining and entrances. Bedrooms and kitchens usually want softer or more practical ceiling and task fittings.",
      },
    ],
    body: `**Lighting ideas for every room in a Kenyan home** start with one principle: do not rely on a single bare bulb. **Layered lighting** — ambient + task + accent — is why some lounges feel expensive and others feel like a waiting room. The same logic scales from a bedsitter to a Karen family home; you only change brightness, colour temperature and fitting size.

Sparklights 254 installs these layers across Nairobi. Explore [ceiling lights](/shop/ceiling-lights), [wall lights](/shop/wall-lights), [chandeliers](/shop/chandeliers) and [pendant lights](/shop/pendant-lights). Related guides: [LED warm vs cool](/blog/led-lights-warm-vs-cool-white-kenya), [chandelier sizing](/blog/how-to-choose-a-chandelier-kenya), and [new apartment checklist](/blog/new-apartment-lighting-checklist-nairobi).

## What is layered lighting? (full explanation)

Think of light as three jobs, not one switch:

1. **Ambient** — the general glow that lets you walk and talk. Usually a ceiling light or chandelier.
2. **Task** — brighter, focused light for cooking, reading, makeup or homework.
3. **Accent** — wall wash, shelf glow or art light that adds depth and “finished” polish.

### Why one ceiling point fails

A single bright centre light creates harsh shadows on faces, dark corners behind sofas, and a flat Instagram photo. Guests look tired; rooms look smaller. Adding even **two wall lights** or a dimmer often improves the room more than buying a slightly nicer centre fitting alone.

## Living room lighting ideas (explained)

**Goal:** welcoming evenings, flexible brightness, one clear focal piece.

**Practical recipe:**

1. Ambient: [chandelier](/shop/chandeliers) or decorative [ceiling light](/shop/ceiling-lights)
2. Accent / evening mood: [wall lights](/shop/wall-lights) or a floor lamp zone
3. Colour: warm white **~2700–3000K**
4. Control: dimmer if you watch TV or host

**Kenyan tips:**

- Low apartment ceilings → compact modern rings or flush discs, not long cascades
- Open-plan lounge + dining → size the living ambient for the seating zone; give dining its own pendant
- Match metal finishes to taps, TV console handles or curtain rods when you can

See our [living room](/rooms/living-room) guide.

## Bedroom lighting ideas (explained)

**Goal:** wind-down, not alertness.

**Practical recipe:**

1. Soft ceiling light (not stadium-bright)
2. Bedside wall or table light so one person can read without waking the other
3. Warm white **only** over the bed (**2700–3000K**)
4. Optional wardrobe or dressing task light on a separate switch

**Avoid:** cool daylight LEDs over the bed, single blazing centre light with no bedside option, and glossy glare into a mirror without soft fill.

See [bedroom](/rooms/bedroom) ideas and [bedroom lighting](/blog/bedroom-lighting-ideas-kenya).

## Dining room lighting (explained)

**Goal:** the table is the star; faces look good; food looks appetising.

**Practical recipe:**

1. One chandelier or pendant cluster centred on the table
2. Hang bottom of fitting **75–90 cm** above the tabletop
3. Diameter about **½–⅔** of table width
4. Warm white, dimmable if you host dinners
5. Optional sideboard wall lights for buffet nights

**Why height matters:** too low and guests hit glass when they stand; too high and the table loses its “pool” of light and the room feels disconnected.

See [dining room](/rooms/dining-room) and [how to choose a chandelier](/blog/how-to-choose-a-chandelier-kenya).

## Kitchen lighting ideas (explained)

**Goal:** safe chopping and cooking, without turning dinner into an operating theatre.

**Practical recipe:**

1. Bright **task** light on counters — often neutral **~4000K**
2. Softer **ambient** ceiling light for the whole kitchen volume
3. Island or breakfast bar: [pendants](/shop/pendant-lights) as the feature
4. Keep steam- and splash-aware choices near wet zones

Open-plan kitchens should warm up toward the dining side so guests do not sit under cool task light all evening.

See [kitchen](/rooms/kitchen) and [kitchen lighting ideas](/blog/kitchen-lighting-ideas-kenya).

## Corridors, bathrooms and outdoor (quick layer)

| Space | Priority | Notes |
| --- | --- | --- |
| Corridor | Even ambient | Wall lights or spaced flush points beat one distant bulb |
| Bathroom | Safe + mirror task | Check IP rating near showers; see [IP guide](/blog/bathroom-lighting-ip-rating-guide) |
| Entry / gate | Welcome + security | Warm entry glow; brighter path/gate as needed |

## Room-by-room cheat sheet

| Room | Main fitting | Mood / colour | Shop |
| --- | --- | --- | --- |
| Living | Ceiling or chandelier + walls | Warm, dimmable | [Chandeliers](/shop/chandeliers) |
| Bedroom | Soft ceiling + bedside | Warm 2700–3000K | [Ceiling lights](/shop/ceiling-lights) |
| Dining | Pendant / chandelier | Warm feature | [Pendants](/shop/pendant-lights) |
| Kitchen | Bright ceiling + task | Neutral on counters | [LED & glow](/shop/led-glow) |

## Sample Sparklights room plans

**Bedsitter / studio:** one decorative ceiling light + one wall or floor lamp zone; warm LED; skip oversized crystal.

**2-bedroom apartment:** living ambient + dining pendant + soft bedroom ceilings + corridor wall or flush points; kitchen task separate from dining warmth.

**Family house:** add entrance statement light, outdoor path/gate, and stronger kitchen task; keep bedrooms warm and quiet.

## Before and after — why photos matter

Original install photos beat stock images for trust. When we light a Kilimani lounge or Kileleshwa dining room, the “after” usually shows warmer ambience, fewer harsh shadows and a clear focal fitting. Ask on WhatsApp for recent project examples in your area.

## Next step

Walk each room with the cheat sheet. Note ambient / task / accent gaps, then send Sparklights a photo set or floor plan. We will map products, colour temperatures and an install plan room by room.`,
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

    console.log("updated", post.slug, "bodyChars=", post.body.length);
  }

  console.log(`Done — ${posts.length} blogs fully rewritten.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
