import Image from "next/image";
import Link from "next/link";
import { Button, WhatsAppButton } from "@/components/ui/Button";
import { DELIVERY_AREAS } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { products as staticProducts } from "@/lib/data";
import { HeroFeaturedRotator } from "@/components/home/HeroFeaturedRotator";

const FEATURE_CATEGORY_SLUGS = [
  "ceiling-lights",
  "wall-lights",
  "chandeliers",
  "pendant-lights",
  "outdoor-solar",
];

/** Small curated set only — avoids loading the full catalogue on the homepage. */
async function featuredForHero() {
  try {
    const rows = await prisma.product.findMany({
      where: { published: true },
      select: {
        slug: true,
        name: true,
        price: true,
        image: true,
        type: true,
        rooms: true,
        category: { select: { slug: true } },
      },
      orderBy: { sortOrder: "asc" },
      take: 40,
    });

    if (rows.length) {
      const picks: typeof rows = [];
      const used = new Set<string>();
      for (const cat of FEATURE_CATEGORY_SLUGS) {
        const match = rows.find((p) => {
          if (used.has(p.slug)) return false;
          if (p.category.slug === cat) return true;
          if (cat === "ceiling-lights" && p.rooms.includes("bedroom")) return true;
          return p.type.toLowerCase().includes(cat.split("-")[0]);
        });
        if (match) {
          picks.push(match);
          used.add(match.slug);
        }
      }
      for (const p of rows) {
        if (picks.length >= 6) break;
        if (used.has(p.slug)) continue;
        picks.push(p);
        used.add(p.slug);
      }
      return picks.slice(0, 6).map((p) => ({
        slug: p.slug,
        name: p.name,
        price: p.price,
        image: p.image,
        category: p.category.slug,
        type: p.type,
      }));
    }
  } catch {
    /* fall through to static */
  }

  return staticProducts.slice(0, 6).map((p) => ({
    slug: p.slug,
    name: p.name,
    price: p.price,
    image: p.image,
    category: p.category,
    type: p.type,
  }));
}

export async function Hero() {
  const featured = await featuredForHero();

  return (
    <section className="relative bg-ink text-paper overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/products/Screenshot_2025_1008_135432.jpeg"
          alt="Sparklights featured lighting"
          fill
          priority
          quality={70}
          className="object-cover object-[center_30%] sm:object-center opacity-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/50 to-ink/85 sm:bg-gradient-to-r sm:from-ink sm:via-ink/80 sm:to-ink/25" />
      </div>

      <HeroFeaturedRotator products={featured} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-10 sm:pt-24 md:pt-32 pb-10 sm:pb-28 flex flex-col justify-start sm:justify-end min-h-[58vh] sm:min-h-[88vh]">
        <p className="label text-paper/60 mb-2.5 sm:mb-5 tracking-[0.16em] sm:tracking-[0.2em] text-[0.6rem] sm:text-[0.6875rem]">
          Lighting studio · Nairobi
        </p>
        <h1 className="font-serif text-[2.1rem] leading-[1.1] sm:text-6xl md:text-7xl lg:text-[5.25rem] sm:leading-[1.05] max-w-3xl mb-3 sm:mb-6">
          Light that makes a house feel like home.
        </h1>
        <p className="text-paper/75 text-sm sm:text-lg md:text-xl max-w-xl leading-relaxed mb-5 sm:mb-10">
          Chandeliers, wall lights and statement ceiling lights, delivered across Kenya and
          installed by people who care how it looks.
        </p>
        <div className="flex flex-row gap-2 sm:gap-3 mb-6 sm:mb-14 w-full max-w-xl">
          <Button
            href="/collection"
            className="!bg-white !text-black !border-white hover:!bg-mist flex-1 sm:flex-none justify-center px-3 sm:px-6 text-[0.58rem] sm:text-[0.6875rem] whitespace-nowrap"
          >
            Explore the collection
          </Button>
          <WhatsAppButton
            label="Order on WhatsApp"
            className="!bg-[#25D366] !text-white !border-[#25D366] hover:!bg-[#1ebe57] flex-1 sm:flex-none justify-center px-3 sm:px-6 text-[0.58rem] sm:text-[0.6875rem] whitespace-nowrap"
          />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 label text-paper/55 tracking-[0.12em] sm:tracking-[0.14em] text-[0.6rem] sm:text-[0.6875rem]">
          <span>Same-day Nairobi</span>
          <span>Installation</span>
          <span>Countrywide</span>
        </div>
      </div>

      <div className="relative border-t border-paper/10 bg-ink/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 label text-paper/50 text-[0.6rem] sm:text-[0.6875rem]">
          <span className="w-full sm:w-auto">Recently delivered & installed</span>
          {DELIVERY_AREAS.map((a) => (
            <Link
              key={a.slug}
              href={`/delivery/${a.slug}`}
              className="hover:text-paper transition-colors"
            >
              {a.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
