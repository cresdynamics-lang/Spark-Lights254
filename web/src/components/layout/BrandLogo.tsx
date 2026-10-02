import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";

type BrandLogoProps = {
  /** Larger mark for header / footer brand presence */
  size?: "md" | "lg" | "xl";
  /** Show wordmark beside the mark */
  withWordmark?: boolean;
  /** Compact mode hides subtitle */
  compact?: boolean;
  /** Invert wordmark for dark backgrounds */
  onDark?: boolean;
  className?: string;
  priority?: boolean;
};

const SIZES = {
  md: "h-12 w-12 sm:h-14 sm:w-14",
  lg: "h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24",
  xl: "h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28",
} as const;

export function BrandLogo({
  size = "lg",
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
      className={`inline-flex items-center gap-3 sm:gap-4 min-w-0 ${className}`}
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
          sizes="(max-width:640px) 80px, 112px"
          priority={priority}
        />
      </span>
      {withWordmark ? (
        <span className="min-w-0">
          <span
            className={`font-serif tracking-[0.1em] sm:tracking-[0.12em] uppercase block leading-none ${nameCls} text-lg sm:text-xl md:text-2xl`}
          >
            {SITE.name}
          </span>
          {!compact ? (
            <span
              className={`label mt-1.5 block tracking-[0.16em] sm:tracking-[0.2em] text-[0.6rem] sm:text-[0.6875rem] ${subCls}`}
            >
              {SITE.tagline}
            </span>
          ) : null}
        </span>
      ) : null}
    </Link>
  );
}
