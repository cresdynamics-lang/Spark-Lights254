"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import { WhatsAppButton } from "@/components/ui/Button";
import { productGalleryImages, productOrderMessage, productPageUrl, absoluteAssetUrl } from "@/lib/whatsapp-order";
import { logLead } from "@/lib/leads";

export function ProductBuyPanel({ product }: { product: Product }) {
  /** Only this product's own images — never a shared room filler. */
  const images = productGalleryImages(product);
  const [active, setActive] = useState(0);
  const [finish, setFinish] = useState(product.finish?.[0]);
  const [size, setSize] = useState(product.sizes?.[0]);

  const activeSrc = images[active] || product.image;
  const message = productOrderMessage(product, { finish, size, image: activeSrc });

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
      <div>
        <div className="relative aspect-[4/5] bg-mist border border-line overflow-hidden mb-3">
          <Image
            src={activeSrc}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        {images.length > 1 ? (
          <div className="grid grid-cols-4 gap-2 mb-3">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                className={`relative aspect-square border overflow-hidden ${
                  active === i ? "border-ink" : "border-line"
                }`}
              >
                <Image
                  src={src}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}
        <p className="label">Exact photo for this product listing</p>
      </div>

      <div>
        <p className="label mb-2">
          {product.type}
          {product.signature || product.badge === "Signature" ? " · Signature" : ""}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-3">
          {product.name}
        </h1>
        <p className="text-xl text-ink mb-1">{formatPrice(product.price)}</p>
        <p className="text-sm text-mute mb-6">Price includes VAT · Order on WhatsApp</p>
        <p className="text-mute leading-relaxed mb-8 max-w-md">{product.description}</p>

        {product.finish?.length ? (
          <div className="mb-6">
            <p className="label mb-3">Finish</p>
            <div className="flex flex-wrap gap-2">
              {product.finish.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFinish(f)}
                  className={`label px-4 py-2 border ${
                    finish === f ? "border-ink bg-ink text-paper" : "border-line"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {product.sizes?.length ? (
          <div className="mb-8">
            <p className="label mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`label px-4 py-2 border ${
                    size === s ? "border-ink bg-ink text-paper" : "border-line"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <WhatsAppButton
          message={message}
          className="w-full sm:w-auto mb-8"
          product={product}
          trackPurchase
          leadSource="product-page"
          onBeforeOpen={() =>
            logLead({
              type: "order",
              source: "product-page",
              message,
              productSlug: product.slug,
              productName: product.name,
              productPrice: product.price,
              productImage: activeSrc,
              productUrl: productPageUrl(product.slug),
            })
          }
        />

        <ul className="space-y-3 text-sm text-mute border-t border-line pt-6">
          <li>Same-day delivery across much of Nairobi when stock allows</li>
          <li>Installation available · quoted by site</li>
          <li>
            Exact photo for this listing:{" "}
            <a
              href={absoluteAssetUrl(product.image)}
              className="underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              open image
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
