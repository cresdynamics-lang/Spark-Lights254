import { AdminChrome } from "@/components/admin/AdminChrome";
import Link from "next/link";

export function AdminStub({
  title,
  body,
  links = [],
}: {
  title: string;
  body: string;
  links?: { href: string; label: string }[];
}) {
  return (
    <AdminChrome title={title}>
      <h1 className="font-serif text-3xl sm:text-4xl mb-3">{title}</h1>
      <p className="text-mute max-w-2xl mb-8 leading-relaxed">{body}</p>
      {links.length ? (
        <div className="flex flex-wrap gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="label border border-ink px-4 py-2 rounded-full"
            >
              {l.label}
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-line bg-paper rounded-md p-6 text-sm text-mute">
          Scaffold ready. Fields and Postgres models from Preview 2 will connect here next.
        </div>
      )}
    </AdminChrome>
  );
}
