import Image from "next/image";
import Link from "next/link";
import { listPublishedBlogs } from "@/lib/blogs";
import { PRODUCT_IMAGE_POOL } from "@/lib/placeholder-images";
import { Reveal } from "@/components/ui/Reveal";

export async function LightingGuides() {
  const posts = await listPublishedBlogs();
  const featured = posts.slice(0, 4);

  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <Reveal>
          <p className="label mb-2">Lighting guides</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink mb-3 max-w-2xl">
            Lumens, watts and kelvin, explained for Kenyan buyers.
          </h2>
          <p className="text-mute mb-8 sm:mb-10 max-w-xl">
            Practical guides from the team who install the lights.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-8">
          {featured.map((p, i) => (
            <Link
              key={p.slug}
              href={`/journal/${p.slug}`}
              className="group border border-line rounded-md overflow-hidden hover:bg-mist transition-colors"
            >
              <div className="relative aspect-[16/10] bg-mist">
                <Image
                  src={p.image || PRODUCT_IMAGE_POOL[i % PRODUCT_IMAGE_POOL.length]}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width:640px) 50vw, 50vw"
                  loading="lazy"
                />
              </div>
              <div className="p-3 sm:p-5 min-h-[120px] sm:min-h-[140px] flex flex-col justify-between">
                <div>
                  <p className="label mb-1 sm:mb-2 text-[0.55rem] sm:text-[0.6875rem]">
                    {p.topic} · {p.minutes} min
                  </p>
                  <h3 className="font-serif text-base sm:text-2xl leading-snug text-ink line-clamp-3">
                    {p.title}
                  </h3>
                </div>
                <p className="text-mute text-xs sm:text-sm mt-2 sm:mt-3 line-clamp-2 hidden sm:block">
                  {p.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/journal" className="label border-b border-ink/30 pb-1">
          Open the Lighting Journal →
        </Link>
      </div>
    </section>
  );
}
