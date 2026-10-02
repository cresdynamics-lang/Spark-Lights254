import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function CategoryMosaic() {
  const [hero, ...rest] = categories;
  const mosaicExtras = [
    { name: "Kitchen Lights", href: "/rooms/kitchen", image: "/images/products/5500.jpeg" },
    { name: "Bedroom Lights", href: "/rooms/bedroom", image: "/images/products/round2.jpg" },
    {
      name: "Hallway & Entrance",
      href: "/rooms/entrance-hallway",
      image: "/images/products/Screenshot_20251008_135721_1.jpg",
    },
    {
      name: "Table & Floor Lamps",
      href: "/shop/table-floor-lamps",
      image: "/images/products/3500.jpeg",
    },
  ];

  return (
    <section className="border-t border-line bg-mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <Reveal>
          <p className="label mb-2 sm:mb-3">Shop by type</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink mb-8 sm:mb-10">
            Every kind of light
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-2.5 sm:gap-3">
          <Link
            href={`/shop/${hero.slug}`}
            className="col-span-2 md:col-span-7 relative min-h-[240px] sm:min-h-[360px] md:min-h-[480px] overflow-hidden group border border-line rounded-md"
          >
            <Image
              src={hero.image}
              alt={hero.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8">
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-paper mb-1">
                {hero.name}
              </h3>
              <p className="label text-paper/70 text-[0.6rem] sm:text-[0.6875rem]">
                {hero.mosaicLabel}
              </p>
            </div>
          </Link>

          <div className="col-span-2 md:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-3">
            {rest.slice(0, 4).map((c) => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                className="relative min-h-[130px] sm:min-h-[170px] md:min-h-[234px] overflow-hidden group border border-line bg-paper rounded-md"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-ink/25 group-hover:bg-ink/35 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 p-2.5 sm:p-4">
                  <h3 className="font-serif text-sm sm:text-xl text-paper leading-tight">
                    {c.shortName || c.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mt-2.5 sm:mt-3">
          {mosaicExtras.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative min-h-[110px] sm:min-h-[140px] overflow-hidden group border border-line rounded-md"
            >
              <Image src={item.image} alt={item.name} fill className="object-cover opacity-90" />
              <div className="absolute inset-0 bg-ink/40" />
              <div className="absolute inset-0 flex items-end p-2.5 sm:p-4">
                <span className="font-serif text-sm sm:text-lg text-paper leading-tight">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
