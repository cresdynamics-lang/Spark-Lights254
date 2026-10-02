import { notFound } from "next/navigation";
import { audiences, getAudience } from "@/lib/audiences";
import { AudienceView } from "@/components/audience/AudienceView";
import { seoMetadata } from "@/lib/seo";
import {
  JsonLd,
  breadcrumbSchema,
  collectionPageSchema,
} from "@/components/seo/JsonLd";

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
            items: page.productSlugs.slice(0, 8).map((s) => ({
              name: s,
              path: `/products/${s}`,
            })),
          }),
        ]}
      />
      <AudienceView page={page} />
    </>
  );
}
