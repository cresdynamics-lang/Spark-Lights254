import Link from "next/link";
import { whatsappUrl } from "@/lib/constants";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink/90 border border-ink",
  secondary: "bg-transparent text-ink border border-ink hover:bg-mist",
  whatsapp: "bg-ink text-paper hover:bg-ink/90 border border-ink",
  ghost: "bg-transparent text-ink border border-transparent hover:border-line",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const cls = `inline-flex items-center justify-center px-5 sm:px-6 py-3 text-[0.65rem] sm:text-[0.6875rem] tracking-[0.14em] sm:tracking-[0.16em] uppercase rounded-full transition-colors duration-300 ${styles[variant]} ${className}`;

  if (external || href.startsWith("http") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={cls}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function WhatsAppButton({
  message,
  label = "Order on WhatsApp",
  className = "",
}: {
  message?: string;
  label?: string;
  className?: string;
}) {
  return (
    <Button href={whatsappUrl(message)} variant="whatsapp" className={className} external>
      {label}
    </Button>
  );
}
