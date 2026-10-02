import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const styles = [
  {
    name: "Crystal",
    href: "/collection/crystal",
    image: "/images/products/7500.jpeg",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    name: "Gold & brass",
    href: "/collection/gold-brass",
    image: "/images/products/7000.jpeg",
    span: "",
  },
  {
    name: "Black",
    href: "/collection/black",
    image: "/images/products/2999.jpeg",
    span: "",
  },
  {
    name: "Natural timber",
    href: "/collection/natural",
    image: "/images/products/3999.jpeg",
    span: "",
  },
  {
    name: "Glowing",
    href: "/collection/glowing",
    image: "/images/products/round1.jpg",
    span: "",
  },
];

export function ShopByStyle() {
  return (
    <section className="border-t border-line bg-mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <Reveal>
          <p className="label mb-2">Shop by style</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink mb-3">
            Know the look? Start there.
          </h2>
          <p className="text-mute max-w-xl mb-8 sm:mb-10">
            For people who know the mood before the product name.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 auto-rows-[160px] sm:auto-rows-[200px]">
          {styles.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`relative overflow-hidden border border-line rounded-md group ${s.span}`}
            >
              <Image
                src={s.image}
                alt={`${s.name} lighting look`}
                fill
                sizes="(max-width:640px) 50vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 font-serif text-2xl sm:text-3xl md:text-4xl text-paper leading-none">
                {s.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
