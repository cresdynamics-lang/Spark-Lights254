import Link from "next/link";
import Image from "next/image";
import { formatPrice, type Product } from "@/lib/data";

export function ProductCard({
  product,
  badgeOverride,
}: {
  product: Product;
  badgeOverride?: string;
}) {
  const badge = badgeOverride ?? product.badge;

  return (
    <Link href={`/products/${product.slug}`} className="product-card group block">
      <div className="product-card-image relative aspect-[4/5] bg-mist overflow-hidden border border-line rounded-md">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 50vw, 25vw"
          loading="lazy"
        />
        {product.hoverImage ? (
          <Image
            src={product.hoverImage}
            alt=""
            fill
            className="secondary object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
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
        <p className="text-xs sm:text-sm text-mute">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
