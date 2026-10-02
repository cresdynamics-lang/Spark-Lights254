import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatsAppButton } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/data";
import { getPublishedBlog, listPublishedBlogs, renderBlogBody } from "@/lib/blogs";
import { staticBlogPosts } from "@/lib/blog-data";
import { PRODUCT_IMAGE_POOL } from "@/lib/placeholder-images";
import { seoMetadata } from "@/lib/seo";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const rows = await listPublishedBlogs();
    if (rows.length) return rows.map((p) => ({ slug: p.slug }));
  } catch {
    /* fall through */
  }
  return staticBlogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return seoMetadata(`/journal/${slug}`);
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedBlog(slug);
  if (!post) notFound();

  const all = await listPublishedBlogs();
  const shop = products.slice(0, 1);
  const related = all.filter((p) => p.slug !== slug).slice(0, 2);
  const blocks = renderBlogBody(post.body);
  const updated = new Date().toISOString().slice(0, 10);
  const heroImage = post.image || PRODUCT_IMAGE_POOL[0];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: post.title, path: `/journal/${post.slug}` },
          ]),
          articleSchema({
            headline: post.title,
            description: post.excerpt,
            path: `/journal/${post.slug}`,
            datePublished: updated,
            dateModified: updated,
            authorName: post.author,
            image: heroImage,
          }),
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
            By {post.author} · Updated {updated} · {post.minutes} min read
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
            {blocks.map((b) =>
              b.type === "h2" ? (
                <h2 key={b.key} className="font-serif text-3xl text-ink">
                  {b.text}
                </h2>
              ) : (
                <p key={b.key}>{b.text}</p>
              )
            )}
          </div>

          {shop[0] ? (
            <div className="border border-line rounded-md p-5 mb-10 grid sm:grid-cols-[1fr_160px] gap-4 items-center">
              <div>
                <p className="label mb-2">Shop this guide</p>
                <p className="font-serif text-2xl mb-3">{shop[0].name}</p>
                <Link href={`/products/${shop[0].slug}`} className="label border-b border-ink/30 pb-1">
                  View product →
                </Link>
              </div>
              <div className="max-w-[160px]">
                <ProductCard product={shop[0]} />
              </div>
            </div>
          ) : null}

          <div className="border border-line bg-mist rounded-md p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-serif text-2xl mb-1">Need help choosing?</p>
              <p className="text-mute text-sm">Send a photo of your space.</p>
            </div>
            <WhatsAppButton label="WhatsApp" />
          </div>

          <div className="mt-12">
            <p className="label mb-4">Related</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map((r, i) => (
                <Link
                  key={r.slug}
                  href={`/journal/${r.slug}`}
                  className="border border-line rounded-md overflow-hidden hover:bg-mist"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={r.image || PRODUCT_IMAGE_POOL[(i + 1) % PRODUCT_IMAGE_POOL.length]}
                      alt={r.title}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="label mb-1">{r.topic}</p>
                    <p className="font-serif text-xl">{r.title}</p>
                  </div>
                </Link>
              ))}
            </div>
            {post.audienceHref ? (
              <Link href={post.audienceHref} className="label inline-block mt-6">
                Related space page →
              </Link>
            ) : null}
          </div>
        </div>
      </article>
    </>
  );
}
