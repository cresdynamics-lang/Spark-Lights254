import { SITE, DELIVERY_AREAS } from "@/lib/constants";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const AREA_SERVED = [
  { "@type": "City", name: "Nairobi" },
  ...DELIVERY_AREAS.map((a) => ({ "@type": "Place", name: a.name })),
  { "@type": "Country", name: "Kenya" },
];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.fullName,
    alternateName: ["Sparklights", "Spark Lights 254", "Spark Lights Nairobi"],
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}${SITE.logo}`,
    },
    email: SITE.email,
    telephone: SITE.phoneTel,
    description: SITE.brandDescription,
    sameAs: Object.values(SITE.sameAs).filter(Boolean),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.streetAddress,
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      addressCountry: "KE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phoneTel,
        contactType: "customer service",
        areaServed: "KE",
        availableLanguage: ["English", "Swahili"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.fullName,
    url: SITE.url,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-KE",
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
    "@id": `${SITE.url}/#localbusiness`,
    name: SITE.fullName,
    image: `${SITE.url}${SITE.logo}`,
    url: SITE.url,
    telephone: SITE.phoneTel,
    email: SITE.email,
    description: SITE.brandDescription,
    priceRange: "KES 550–40500",
    currenciesAccepted: "KES",
    paymentAccepted: "Cash, M-Pesa, Visa, Mastercard",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.streetAddress,
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    hasMap: SITE.mapsUrl,
    areaServed: AREA_SERVED,
    openingHoursSpecification: SITE.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    parentOrganization: { "@id": `${SITE.url}/#organization` },
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
    isPartOf: { "@id": `${SITE.url}/#website` },
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
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    image: opts.image.startsWith("http") ? opts.image : `${SITE.url}${opts.image}`,
    sku: opts.sku,
    category: opts.category,
    brand: { "@type": "Brand", name: SITE.fullName },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}${opts.path}`,
      priceCurrency: "KES",
      price: opts.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE.url}/#localbusiness` },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "KE",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 3,
            unitCode: "DAY",
          },
        },
      },
    },
  };
}

/** Prefer BlogPosting for journal / blog articles (GEO + Google). */
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
    "@type": "BlogPosting",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: {
      "@type": "Organization",
      name: opts.authorName,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.fullName,
      logo: { "@type": "ImageObject", url: `${SITE.url}${SITE.logo}` },
      "@id": `${SITE.url}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}${opts.path}`,
    },
    inLanguage: "en-KE",
    ...(opts.image
      ? { image: opts.image.startsWith("http") ? opts.image : `${SITE.url}${opts.image}` }
      : {}),
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
