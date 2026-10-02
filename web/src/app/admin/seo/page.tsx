import { AdminChrome } from "@/components/admin/AdminChrome";
import { prisma } from "@/lib/db";
import { SEO_INVENTORY } from "@/lib/seo-inventory";
import Link from "next/link";

export const metadata = { title: "Admin · SEO inventory" };

export default async function AdminSeoPage() {
  let rows = SEO_INVENTORY;
  try {
    const db = await prisma.seoPage.findMany({ orderBy: [{ family: "asc" }, { path: "asc" }] });
    if (db.length) {
      rows = db.map((r) => ({
        path: r.path,
        title: r.title,
        description: r.description,
        h1: r.h1,
        family: r.family as (typeof SEO_INVENTORY)[number]["family"],
        schemaType: r.schemaType as (typeof SEO_INVENTORY)[number]["schemaType"],
        parentPath: r.parentPath,
        indexable: r.indexable,
        published: r.published,
        phase: (r.phase as 1 | 2 | 3 | undefined) ?? undefined,
      }));
    }
  } catch {
    /* inventory file fallback */
  }

  const published = rows.filter((r) => r.published).length;
  const drafts = rows.filter((r) => !r.published).length;

  return (
    <AdminChrome title="SEO & Redirects">
      <div className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl mb-2">SEO inventory</h1>
        <p className="text-mute">
          {published} published · {drafts} draft (phase 2/3 areas). Source: Preview 2 search map.
          Build fails if titles &gt;60, metas &gt;155, or duplicate H1/title.
        </p>
        <p className="text-sm text-mute mt-2">
          Sitemap: <Link href="/sitemap.xml">/sitemap.xml</Link> · Robots:{" "}
          <Link href="/robots.txt">/robots.txt</Link>
        </p>
      </div>

      <div className="border border-line bg-paper rounded-md overflow-hidden">
        <div className="hidden lg:grid grid-cols-[1.2fr_1.4fr_80px_80px_70px] gap-3 px-4 py-3 label border-b border-line bg-mist">
          <span>Path</span>
          <span>Title ({"{"}chars{"}"})</span>
          <span>Family</span>
          <span>Index</span>
          <span>Live</span>
        </div>
        <ul className="divide-y divide-line max-h-[70vh] overflow-y-auto">
          {rows.map((r) => (
            <li key={r.path} className="px-4 py-3 grid lg:grid-cols-[1.2fr_1.4fr_80px_80px_70px] gap-2 text-sm">
              <Link href={r.path} className="font-medium text-ink hover:underline truncate">
                {r.path}
              </Link>
              <div className="min-w-0">
                <p className="truncate">{r.title}</p>
                <p className="label mt-0.5">
                  {r.title.length}/60 · meta {r.description.length}/155
                </p>
              </div>
              <p className="label">{r.family}</p>
              <p className="label">{r.indexable ? "index" : "noindex"}</p>
              <p className="label">{r.published ? "yes" : "draft"}</p>
            </li>
          ))}
        </ul>
      </div>
    </AdminChrome>
  );
}
