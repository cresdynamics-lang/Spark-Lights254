import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { listPublishedBlogs } from "@/lib/blogs";
import { seoMetadata } from "@/lib/seo";

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
              className="block border border-line bg-paper p-6 sm:p-10 rounded-md hover:bg-paper/80 transition-colors"
            >
              <p className="label mb-3">Featured · {featured.topic}</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-3">{featured.title}</h2>
              <p className="text-mute max-w-2xl">{featured.excerpt}</p>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/journal/${p.slug}`}
              className="border border-line p-6 rounded-md hover:bg-mist transition-colors"
            >
              <p className="label mb-3">
                {p.topic} · {p.minutes} min
              </p>
              <h3 className="font-serif text-2xl text-ink leading-snug">{p.title}</h3>
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
