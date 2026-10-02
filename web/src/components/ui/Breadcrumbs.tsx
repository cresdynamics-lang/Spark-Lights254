import Link from "next/link";

export function Breadcrumbs({
  items,
  light = false,
}: {
  items: { label: string; href?: string }[];
  light?: boolean;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`label mb-6 flex flex-wrap gap-2 ${light ? "text-paper/55" : ""}`}
    >
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-2">
          {item.href ? (
            <Link
              href={item.href}
              className={light ? "hover:text-paper transition-colors" : "hover:text-ink transition-colors"}
            >
              {item.label}
            </Link>
          ) : (
            <span className={light ? "text-paper/80" : "text-ink"}>{item.label}</span>
          )}
          {i < items.length - 1 ? <span>/</span> : null}
        </span>
      ))}
    </nav>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="label mb-3">{children}</p>;
}
