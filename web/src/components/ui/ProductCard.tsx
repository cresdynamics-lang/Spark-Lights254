"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice, type Product } from "@/lib/data";
import { whatsappUrl } from "@/lib/constants";
import { productOrderMessage } from "@/lib/whatsapp-order";
import { metaProductPayload, trackMeta } from "@/lib/meta-pixel";

function WhatsAppIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.139-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 1 00-3.48-8.413z" />
    </svg>
  );
}

export function ProductCard({
  product,
  badgeOverride,
}: {
  product: Product;
  badgeOverride?: string;
}) {
  const badge = badgeOverride ?? product.badge;
  const orderHref = whatsappUrl(productOrderMessage(product));

  const onOrder = () => {
    const payload = metaProductPayload(product);
    trackMeta("AddToCart", payload);
    trackMeta("InitiateCheckout", payload);
    trackMeta("Purchase", payload);
  };

  return (
    <article className="product-card group block">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="product-card-image relative aspect-[4/5] bg-mist overflow-hidden border border-line rounded-md">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
            loading="lazy"
            quality={70}
          />
          {product.hoverImage ? (
            <Image
              src={product.hoverImage}
              alt=""
              fill
              className="secondary object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
              loading="lazy"
              quality={70}
            />
          ) : null}
          {badge ? (
            <span className="absolute top-3 left-3 label text-ink bg-paper/90 px-2 py-1">
              {badge}
            </span>
          ) : null}
        </div>
        <div className="pt-4 space-y-1">
          <p className="label">{product.type}</p>
          <h3 className="font-serif text-base sm:text-xl leading-snug text-ink">{product.name}</h3>
        </div>
      </Link>

      <div className="mt-2 flex items-center justify-between gap-2">
        <p className="text-xs sm:text-sm text-mute shrink-0">{formatPrice(product.price)}</p>
        <a
          href={orderHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOrder}
          className="inline-flex items-center gap-1.5 shrink-0 bg-[#25D366] text-white px-2.5 sm:px-3 py-1.5 rounded-full text-[0.55rem] sm:text-[0.625rem] tracking-[0.12em] uppercase font-medium hover:bg-[#1ebe57] transition-colors"
          aria-label={`Order ${product.name} on WhatsApp`}
        >
          <WhatsAppIcon />
          <span className="hidden xs:inline sm:inline">WhatsApp</span>
        </a>
      </div>
    </article>
  );
}
