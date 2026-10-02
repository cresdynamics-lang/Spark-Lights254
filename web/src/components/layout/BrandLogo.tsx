import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";

type BrandLogoProps = {
  /** Fixed display size — never changes on scroll */
  size?: "sm" | "md";
  /** Show wordmark beside the mark */
  withWordmark?: boolean;
  /** Compact mode hides subtitle */
  compact?: boolean;
  /** Invert wordmark for dark backgrounds */
  onDark?: boolean;
  className?: string;
  priority?: boolean;
};

/** Consistent small mark everywhere — no enlarge/shrink on scroll. */
const SIZES = {
  sm: "h-9 w-9",
  md: "h-10 w-10 sm:h-11 sm:w-11",
} as const;

export function BrandLogo({
  size = "md",
  withWordmark = true,
  compact = false,
  onDark = false,
  className = "",
  priority = false,
}: BrandLogoProps) {
  const box = SIZES[size];
  const nameCls = onDark ? "text-paper" : "text-ink";
  const subCls = onDark ? "text-paper/55" : "";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 sm:gap-3 min-w-0 ${className}`}
      aria-label={`${SITE.fullName} home`}
    >
      <span
        className={`relative ${box} shrink-0 overflow-hidden rounded-full bg-paper shadow-sm ${
          onDark ? "border border-paper/25" : "border border-line"
        }`}
      >
        <Image
          src={SITE.logo}
          alt={`${SITE.fullName} logo`}
          fill
          className="object-cover"
          sizes="44px"
          priority={priority}
        />
      </span>
      {withWordmark ? (
        <span className="min-w-0">
          <span
            className={`font-serif tracking-[0.1em] sm:tracking-[0.12em] uppercase block leading-none ${nameCls} text-base sm:text-lg`}
          >
            {SITE.name}
          </span>
          {!compact ? (
            <span
              className={`label mt-1 block tracking-[0.16em] text-[0.55rem] sm:text-[0.6rem] ${subCls}`}
            >
              {SITE.tagline}
            </span>
          ) : null}
        </span>
      ) : null}
    </Link>
  );
}
