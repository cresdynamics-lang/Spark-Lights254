import Image from "next/image";
import Link from "next/link";
import { listPublishedBlogs } from "@/lib/blogs";
import { Reveal } from "@/components/ui/Reveal";

const FALLBACK_IMAGES = [
  "/images/products/7500.jpeg",
  "/images/products/3500.jpeg",
  "/images/products/Screenshot_2025_1008_135432.png",
];

export async function LightingGuides() {
  const posts = await listPublishedBlogs();
  const featured = posts.slice(0, 3);

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
        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          {featured.map((p, i) => (
            <Link
              key={p.slug}
              href={`/journal/${p.slug}`}
              className="group border border-line rounded-md overflow-hidden hover:bg-mist transition-colors"
            >
              <div className="relative aspect-[16/10] bg-mist">
                <Image
                  src={p.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width:640px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="p-5 min-h-[140px] flex flex-col justify-between">
                <div>
                  <p className="label mb-2">
                    {p.topic} · {p.minutes} min
                  </p>
                  <h3 className="font-serif text-2xl leading-snug text-ink">{p.title}</h3>
                </div>
                <p className="text-mute text-sm mt-3 line-clamp-2">{p.excerpt}</p>
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
