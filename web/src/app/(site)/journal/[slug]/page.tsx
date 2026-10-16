import { notFound } from "next/navigation";
import { JournalArticleView } from "@/components/journal/JournalArticleView";
import { getPublishedBlog, listPublishedBlogs } from "@/lib/blogs";
import { staticBlogPosts } from "@/lib/blog-data";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlog(slug);
  if (!post) return {};
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  /** Prefer /blog/ canonical for SEO intent URLs */
  const canonical = `${SITE.url}/blog/${post.slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      siteName: SITE.fullName,
    },
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedBlog(slug);
  if (!post) notFound();
  return <JournalArticleView post={post} pathPrefix="/blog" />;
}
