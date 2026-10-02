import Link from "next/link";
import Image from "next/image";
import { rooms } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function RoomsSection() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <Reveal>
          <p className="label mb-2 sm:mb-3">Shop by room</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink mb-8 sm:mb-10">
            Light every room properly
          </h2>
        </Reveal>
        {/* 2 columns on phones, 5 on large */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {rooms.slice(0, 5).map((r) => (
            <Link key={r.slug} href={`/rooms/${r.slug}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden border border-line bg-mist mb-2 sm:mb-3 rounded-md">
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 flex items-end justify-between gap-1">
                  <h3 className="font-serif text-sm sm:text-xl text-paper leading-tight">
                    {r.name}
                  </h3>
                  <span className="label text-paper/80 hidden sm:inline">Shop</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
