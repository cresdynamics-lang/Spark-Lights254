"use client";

import { useEffect } from "react";
import { metaProductPayload, trackMeta } from "@/lib/meta-pixel";

export function MetaViewContent({
  product,
}: {
  product: {
    slug: string;
    name: string;
    price: number;
    category?: string;
    type?: string;
  };
}) {
  useEffect(() => {
    trackMeta("ViewContent", metaProductPayload(product));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- track once per product slug
  }, [product.slug, product.price, product.name]);

  return null;
}
