import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="label mb-6 flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="hover:text-ink transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink">{item.label}</span>
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
