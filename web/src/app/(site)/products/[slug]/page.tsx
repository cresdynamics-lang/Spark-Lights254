import { notFound } from "next/navigation";
import Image from "next/image";
import {
  products,
  getProduct,
  formatPrice,
  products as allProducts,
} from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductBuyPanel } from "@/components/product/ProductBuyPanel";
import type { Metadata } from "next";
import { getCategory } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { JsonLd, productSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const title = `${product.name} | Nairobi`.slice(0, 60);
  const description = product.description.slice(0, 155);
  const url = `${SITE.url}/products/${slug}`;
  const image = product.image.startsWith("http")
    ? product.image
    : `${SITE.url}${product.image}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.fullName,
      type: "website",
      locale: "en_KE",
      images: [
        {
          url: image,
          alt: product.name,
          width: 1200,
          height: 1500,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const cat = getCategory(product.category);
  const related = allProducts
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: cat?.name || product.type, path: `/shop/${product.category}` },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
          productSchema({
            name: product.name,
            description: product.description,
            path: `/products/${product.slug}`,
            image: product.image,
            price: product.price,
            sku: product.slug,
          }),
        ]}
      />
      <section className="bg-paper border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              {
                label: cat?.name || product.type,
                href: `/shop/${product.category}`,
              },
              { label: product.name },
            ]}
          />
          <ProductBuyPanel product={product} />
        </div>
      </section>

      <section id="details" className="border-b border-line bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] border border-line overflow-hidden bg-paper">
            <Image
              src={product.hoverImage || product.image}
              alt={`${product.name} — close detail of finish and form`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="label mb-3">The details</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-8">
              Made to be seen from every angle
            </h2>
            <p className="label mb-4">Specification</p>
            <div className="border border-line bg-paper">
              {product.specs.map((s) => (
                <div
                  key={s.label}
                  className="grid grid-cols-2 gap-4 px-5 py-4 border-b border-line last:border-0"
                >
                  <span className="text-sm text-mute">{s.label}</span>
                  <span className="text-sm text-ink">{s.value}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-mute mt-6">
              Policies:{" "}
              <a href="/policies/delivery" className="underline">
                Delivery
              </a>
              ,{" "}
              <a href="/policies/installation" className="underline">
                Installation
              </a>
              ,{" "}
              <a href="/policies/warranty" className="underline">
                Warranty
              </a>
              ,{" "}
              <a href="/policies/returns" className="underline">
                Returns
              </a>
              ,{" "}
              <a href="/policies/payment" className="underline">
                Payment
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="font-serif text-3xl md:text-4xl mb-10">Complete the room</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="label mb-3">Reviews</p>
          <h2 className="font-serif text-4xl mb-4">What buyers say</h2>
          <p className="text-mute mb-10 max-w-2xl">
            PLACEHOLDER — publish named, dated, verified reviews only after they are collected via
            the WhatsApp review flow. Do not mark aggregate ratings until reviews are real and
            visible here.
          </p>
          <p className="sr-only">
            {product.name} {formatPrice(product.price)}
          </p>
        </div>
      </section>
    </>
  );
}
