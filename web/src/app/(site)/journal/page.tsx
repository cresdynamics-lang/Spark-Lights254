import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { listPublishedBlogs } from "@/lib/blogs";
import { PRODUCT_IMAGE_POOL } from "@/lib/placeholder-images";
import { seoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return seoMetadata("/journal");
}

const topics = [
  "All",
  "Podcast",
  "Study",
  "Office",
  "Hospitality",
  "Bedroom",
  "Bathroom",
  "Kitchen",
  "Outdoor",
  "Display",
];

export default async function JournalPage() {
  const journalPosts = await listPublishedBlogs();
  const featured = journalPosts.find((p) => p.featured) || journalPosts[0];
  const rest = journalPosts.filter((p) => p.slug !== featured?.slug);
  const featuredImage =
    featured?.image || PRODUCT_IMAGE_POOL[0];

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Journal" }]} />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink mb-4">
            The Lighting Journal
          </h1>
          <p className="text-mute text-lg max-w-2xl mb-8">
            Practical guides for lighting every space in Kenya, written by the people who install it.
          </p>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <span
                key={t}
                className={`label px-3 py-2 border rounded-full ${
                  t === "All" ? "bg-ink text-paper border-ink" : "border-line text-mute"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {featured ? (
        <section className="bg-mist border-b border-line">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
            <Link
              href={`/journal/${featured.slug}`}
              className="grid lg:grid-cols-2 border border-line bg-paper rounded-md overflow-hidden hover:bg-paper/80 transition-colors"
            >
              <div className="relative aspect-[16/11] lg:aspect-auto lg:min-h-[320px]">
                <Image
                  src={featuredImage}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-6 sm:p-10 flex flex-col justify-center">
                <p className="label mb-3">Featured · {featured.topic}</p>
                <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-3">{featured.title}</h2>
                <p className="text-mute max-w-2xl">{featured.excerpt}</p>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {rest.map((p, i) => (
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
                  sizes="(max-width:640px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="label mb-3">
                  {p.topic} · {p.minutes} min
                </p>
                <h3 className="font-serif text-2xl text-ink leading-snug">{p.title}</h3>
              </div>
            </Link>
          ))}
          {journalPosts.length === 0 ? (
            <p className="text-mute col-span-full">Journal posts will appear here soon.</p>
          ) : null}
        </div>
      </section>
    </>
  );
}
