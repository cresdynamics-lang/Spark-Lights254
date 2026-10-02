import { SITE } from "@/lib/constants";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.fullName,
    url: SITE.url,
    logo: `${SITE.url}/images/products/7500.jpeg`,
    email: SITE.email,
    telephone: SITE.phoneTel,
    sameAs: [
      // PLACEHOLDER — add real GBP / Instagram / Facebook URLs when confirmed
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.streetAddress,
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.fullName,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LightingStore",
    name: SITE.fullName,
    image: `${SITE.url}/images/products/7500.jpeg`,
    url: SITE.url,
    telephone: SITE.phoneTel,
    email: SITE.email,
    priceRange: "KES",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.streetAddress,
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      // PLACEHOLDER — confirm exact showroom coordinates to 5 decimals
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: SITE.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function collectionPageSchema(opts: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: `${SITE.url}${opts.path}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: opts.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.url}${item.path}`,
        name: item.name,
      })),
    },
  };
}

export function productSchema(opts: {
  name: string;
  description: string;
  path: string;
  image: string;
  price: number;
  sku: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    image: opts.image.startsWith("http") ? opts.image : `${SITE.url}${opts.image}`,
    sku: opts.sku,
    brand: { "@type": "Brand", name: SITE.fullName },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}${opts.path}`,
      priceCurrency: "KES",
      price: opts.price,
      availability: "https://schema.org/InStock",
      // PLACEHOLDER stock — confirm real availability before marking OutOfStock
    },
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { "@type": "Person", name: opts.authorName },
    publisher: {
      "@type": "Organization",
      name: SITE.fullName,
      logo: { "@type": "ImageObject", url: `${SITE.url}/images/products/7500.jpeg` },
    },
    mainEntityOfPage: `${SITE.url}${opts.path}`,
    ...(opts.image
      ? { image: opts.image.startsWith("http") ? opts.image : `${SITE.url}${opts.image}` }
      : {}),
  };
}
