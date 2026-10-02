import Link from "next/link";
import { getAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

const NAV = [
  {
    group: "Overview",
    items: [{ href: "/admin", label: "Dashboard" }],
  },
  {
    group: "Catalogue",
    items: [
      { href: "/admin/products", label: "Products" },
      { href: "/admin/categories", label: "Categories" },
      { href: "/admin/blogs", label: "Blogs" },
    ],
  },
  {
    group: "Sales",
    items: [
      { href: "/admin/enquiries", label: "Enquiries & Orders" },
      { href: "/admin/reviews", label: "Reviews" },
    ],
  },
  {
    group: "System",
    items: [
      { href: "/admin/seo", label: "SEO inventory" },
      { href: "/admin/users", label: "Users & Roles" },
      { href: "/admin/settings", label: "Settings" },
    ],
  },
];

export async function AdminChrome({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const admin = await getAdminSession();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-mist flex">
      <aside className="hidden lg:flex w-64 shrink-0 border-r border-line bg-paper flex-col">
        <div className="px-5 h-14 flex items-center border-b border-line">
          <Link href="/admin" className="font-serif text-lg tracking-[0.08em] uppercase">
            Sparklights
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {NAV.map((section) => (
            <div key={section.group}>
              <p className="label px-2 mb-2">{section.group}</p>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-2 py-2 text-sm text-ink/80 hover:text-ink hover:bg-mist rounded-md transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-line">
          <Link href="/" className="label hover:text-ink">
            View site →
          </Link>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="border-b border-line bg-paper h-14 flex items-center justify-between px-4 sm:px-6 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/admin" className="lg:hidden font-serif tracking-[0.08em] uppercase">
              Admin
            </Link>
            {title ? <p className="label truncate">{title}</p> : null}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="label hidden sm:inline truncate max-w-[180px]">{admin.email}</span>
            <Link href="/" className="label hidden sm:inline">
              View site
            </Link>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="label hover:text-ink">
                Sign out
              </button>
            </form>
          </div>
        </header>
        <main className="flex-1 px-4 sm:px-6 py-8 max-w-6xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
