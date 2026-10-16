import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatsAppButton } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import type { BlogPostFull } from "@/lib/blogs";
import { listPublishedBlogs, renderBlogBody } from "@/lib/blogs";
import { PRODUCT_IMAGE_POOL } from "@/lib/placeholder-images";
import { SITE } from "@/lib/constants";
import { JsonLd, articleSchema, breadcrumbSchema, faqPageSchema } from "@/components/seo/JsonLd";

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function JournalArticleView({
  post,
  pathPrefix = "/blog",
}: {
  post: BlogPostFull;
  pathPrefix?: "/blog" | "/journal";
}) {
  const all = await listPublishedBlogs();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 3);
  const blocks = renderBlogBody(post.body);
  const published = formatDate(post.publishedAt) || formatDate(post.updatedAt) || "recently";
  const updated = formatDate(post.updatedAt) || published;
  const heroImage = post.image || PRODUCT_IMAGE_POOL[0];
  const path = `${pathPrefix}/${post.slug}`;
  const waMessage = `Hi Sparklights — I read “${post.title}” and need a lighting quote / size recommendation.`;
  const faqLd = post.faqs?.length ? faqPageSchema(post.faqs) : null;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: post.title, path },
          ]),
          articleSchema({
            headline: post.title,
            description: post.metaDescription || post.excerpt,
            path,
            datePublished: post.publishedAt || post.updatedAt || new Date().toISOString(),
            dateModified: post.updatedAt || post.publishedAt || new Date().toISOString(),
            authorName: post.author,
            image: heroImage,
          }),
          ...(faqLd ? [faqLd] : []),
        ]}
      />
      <article className="bg-paper border-b border-line">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Journal", href: "/journal" },
              { label: post.topic },
            ]}
          />
          <h1 className="font-serif text-4xl sm:text-5xl text-ink leading-tight mb-4">
            {post.title}
          </h1>
          <p className="label mb-8">
            By {post.author} · Published {published} · Updated {updated} · {post.minutes} min read
          </p>

          <div className="relative aspect-[16/10] border border-line overflow-hidden rounded-md mb-10">
            <Image
              src={heroImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 768px"
              priority
            />
          </div>

          <div className="space-y-6 text-mute leading-relaxed text-base sm:text-lg mb-12">
            {blocks.map((b) => {
              if (b.type === "h2") {
                return (
                  <h2 key={b.key} className="font-serif text-3xl text-ink pt-2">
                    {b.text}
                  </h2>
                );
              }
              if (b.type === "h3") {
                return (
                  <h3 key={b.key} className="font-serif text-2xl text-ink">
                    {b.text}
                  </h3>
                );
              }
              if (b.type === "ul") {
                return (
                  <ul key={b.key} className="list-disc pl-5 space-y-2">
                    {b.items.map((item, idx) => (
                      <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                );
              }
              if (b.type === "ol") {
                return (
                  <ol key={b.key} className="list-decimal pl-5 space-y-2">
                    {b.items.map((item, idx) => (
                      <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ol>
                );
              }
              if (b.type === "table") {
                return (
                  <div key={b.key} className="overflow-x-auto border border-line rounded-md">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-mist">
                        <tr>
                          {b.headers.map((h) => (
                            <th key={h} className="px-3 py-2.5 font-medium text-ink border-b border-line">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {b.rows.map((row, ri) => (
                          <tr key={ri} className="border-b border-line last:border-0">
                            {row.map((cell, ci) => (
                              <td
                                key={ci}
                                className="px-3 py-2.5 align-top"
                                dangerouslySetInnerHTML={{ __html: cell }}
                              />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              return (
                <p key={b.key} dangerouslySetInnerHTML={{ __html: b.html }} />
              );
            })}
          </div>

          {post.faqs?.length ? (
            <div className="mb-12">
              <h2 className="font-serif text-3xl text-ink mb-4">Frequently asked questions</h2>
              <FAQ items={post.faqs} />
            </div>
          ) : null}

          <div className="border border-line bg-mist rounded-md p-6 mb-10">
            <p className="label mb-2">About the author</p>
            <p className="font-serif text-2xl text-ink mb-2">{post.author}</p>
            <p className="text-mute text-sm leading-relaxed">
              {SITE.fullName} is a Nairobi lighting retailer selling chandeliers, wall lights, ceiling
              lights, dining, bedroom and kitchen lights, with delivery and installation across Kenya.
              Showroom: {SITE.address}. Hours: {SITE.hours}. WhatsApp {SITE.whatsappDisplay}.
            </p>
            <p className="text-xs text-mute mt-3">Last updated {updated}</p>
          </div>

          <div className="border border-line bg-paper rounded-md p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div>
              <p className="font-serif text-2xl mb-1">Need a size or quote?</p>
              <p className="text-mute text-sm">
                Send your room size or a photo — we reply on WhatsApp with options.
              </p>
            </div>
            <WhatsAppButton label="Chat with us on WhatsApp" message={waMessage} />
          </div>

          <div>
            <p className="label mb-4">Related guides</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {related.map((r, i) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="border border-line rounded-md overflow-hidden hover:bg-mist"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={r.image || PRODUCT_IMAGE_POOL[(i + 1) % PRODUCT_IMAGE_POOL.length]}
                      alt={r.title}
                      fill
                      className="object-cover"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-3">
                    <p className="label mb-1">{r.topic}</p>
                    <p className="font-serif text-lg leading-snug">{r.title}</p>
                  </div>
                </Link>
              ))}
            </div>
            {post.audienceHref ? (
              <Link href={post.audienceHref} className="label inline-block mt-6">
                Shop related lights →
              </Link>
            ) : null}
          </div>
        </div>
      </article>
    </>
  );
}
