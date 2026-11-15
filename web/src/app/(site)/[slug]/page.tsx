import { notFound } from "next/navigation";
import { audiences, getAudience, audienceProducts } from "@/lib/audiences";
import { catalogProductsMatching } from "@/lib/catalog";
import { AudienceView } from "@/components/audience/AudienceView";
import { seoMetadata } from "@/lib/seo";
import {
  JsonLd,
  breadcrumbSchema,
  collectionPageSchema,
  faqPageSchema,
} from "@/components/seo/JsonLd";

/** Refresh hourly so newly added stock shows on audience pages. */
export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return audiences.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return seoMetadata(`/${slug}`);
}

export default async function AudienceSlugPage({ params }: Props) {
  const { slug } = await params;
  const page = getAudience(slug);
  if (!page) notFound();

  const live = await catalogProductsMatching({
    categories: page.productCategories,
    rooms: page.productRooms,
  });
  const items = live.length ? live : audienceProducts(page);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: page.h1, path: page.path },
          ]),
          collectionPageSchema({
            name: page.h1,
            description: page.description,
            path: page.path,
            items: items.slice(0, 8).map((p) => ({
              name: p.name,
              path: `/products/${p.slug}`,
            })),
          }),
          ...(page.faqs.length ? [faqPageSchema(page.faqs)!] : []),
        ]}
      />
      <AudienceView page={page} items={items} />
    </>
  );
}
