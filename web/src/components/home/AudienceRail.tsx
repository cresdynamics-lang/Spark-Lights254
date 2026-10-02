import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const audiences = [
  {
    title: "Podcast & studio",
    href: "/podcast-studio-lighting-nairobi",
    image: "/images/products/round1.jpg",
    line: "Soft light on the face, depth behind.",
  },
  {
    title: "Study desk",
    href: "/study-lamps-nairobi",
    image: "/images/products/3500.jpeg",
    line: "Clear light for late nights.",
  },
  {
    title: "Office",
    href: "/office-lighting-nairobi",
    image: "/images/products/3000.jpeg",
    line: "Even light for desks and meetings.",
  },
  {
    title: "Hotel & restaurant",
    href: "/hotel-restaurant-lighting-nairobi",
    image: "/images/products/7500.jpeg",
    line: "Mood that makes a room feel full.",
  },
  {
    title: "Walkway",
    href: "/walkway-corridor-lights-nairobi",
    image: "/images/products/3999.jpeg",
    line: "Safe, continuous light for paths.",
  },
  {
    title: "Accent & display",
    href: "/accent-display-lighting-nairobi",
    image: "/images/products/2500.jpeg",
    line: "Art, shelves and feature walls.",
  },
];

export function AudienceRail() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <Reveal>
          <p className="label mb-2 sm:mb-3">Who are you lighting for?</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight mb-3 max-w-3xl">
            A podcast corner. A study desk. A restaurant. A hallway. Lit properly.
          </h2>
          <p className="text-mute text-sm sm:text-lg max-w-2xl mb-8 sm:mb-10">
            Six ways people search by use — not by fixture name.
          </p>
        </Reveal>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible">
          {audiences.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group shrink-0 w-[70vw] max-w-[240px] sm:w-auto sm:max-w-none snap-start"
            >
              <div className="relative aspect-[3/4] border border-line overflow-hidden rounded-md bg-mist mb-3">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  sizes="(max-width:640px) 70vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 font-serif text-xl text-paper leading-snug">
                  {a.title}
                </p>
              </div>
              <p className="text-mute text-sm leading-relaxed">{a.line}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
