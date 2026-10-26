import Link from "next/link";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/data";
import { deleteEnquiry, updateEnquiryStatus } from "./actions";

export const metadata = { title: "Admin · Enquiries & Orders" };
export const dynamic = "force-dynamic";

const STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "quoted", label: "Quoted" },
  { value: "ordered", label: "Ordered" },
  { value: "closed", label: "Closed" },
] as const;

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string }>;
}) {
  const sp = await searchParams;
  const status = sp.status?.trim() || undefined;
  const type = sp.type?.trim() || undefined;

  const where = {
    ...(status ? { status } : {}),
    ...(type ? { type } : {}),
  };

  const [rows, counts] = await Promise.all([
    prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.enquiry.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
  ]);

  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count._all]));
  const total = counts.reduce((s, c) => s + c._count._all, 0);

  return (
    <AdminChrome title="Enquiries & Orders">
      <div className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl mb-2">Enquiries & Orders</h1>
        <p className="text-mute max-w-2xl">
          Every WhatsApp order click and website message is logged here so you can follow up and
          update status.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <FilterChip href="/admin/enquiries" active={!status && !type} label={`All (${total})`} />
        {STATUSES.map((s) => (
          <FilterChip
            key={s.value}
            href={`/admin/enquiries?status=${s.value}`}
            active={status === s.value}
            label={`${s.label} (${countMap[s.value] || 0})`}
          />
        ))}
        <FilterChip
          href="/admin/enquiries?type=order"
          active={type === "order"}
          label="Orders"
        />
        <FilterChip
          href="/admin/enquiries?type=message"
          active={type === "message"}
          label="Messages"
        />
        <FilterChip
          href="/admin/enquiries?type=quote"
          active={type === "quote"}
          label="Quotes"
        />
      </div>

      {!rows.length ? (
        <div className="border border-line bg-paper rounded-md p-8 text-mute">
          No leads yet. When a shopper taps WhatsApp Order or sends a contact/quote message, it
          appears here.
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((e) => (
            <article
              key={e.id}
              className="border border-line bg-paper rounded-md overflow-hidden grid md:grid-cols-[112px_1fr] gap-0"
            >
              <div className="relative bg-mist min-h-[112px] border-b md:border-b-0 md:border-r border-line">
                {e.productImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={e.productImage}
                    alt={e.productName || "Product"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center label text-mute">
                    {e.type}
                  </div>
                )}
              </div>
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="label mb-1">
                      {e.type.toUpperCase()} · {e.source} ·{" "}
                      {new Date(e.createdAt).toLocaleString("en-KE", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                    <h2 className="font-serif text-xl text-ink">
                      {e.productName || e.name || "Website lead"}
                    </h2>
                    {e.productPrice != null ? (
                      <p className="text-sm text-mute mt-0.5">{formatPrice(e.productPrice)}</p>
                    ) : null}
                  </div>
                  <StatusBadge status={e.status} />
                </div>

                {(e.name || e.phone || e.email || e.area) && (
                  <p className="text-sm text-mute">
                    {[e.name, e.phone, e.email, e.area].filter(Boolean).join(" · ")}
                  </p>
                )}

                <pre className="text-xs sm:text-sm text-ink/80 whitespace-pre-wrap bg-mist border border-line rounded-md p-3 max-h-40 overflow-auto font-sans">
                  {e.message}
                </pre>

                <div className="flex flex-wrap gap-3 items-center">
                  {e.productSlug ? (
                    <Link
                      href={`/products/${e.productSlug}`}
                      className="label border-b border-ink/30 pb-0.5"
                      target="_blank"
                    >
                      Open product
                    </Link>
                  ) : null}
                  {e.productUrl ? (
                    <a
                      href={e.productUrl}
                      className="label border-b border-ink/30 pb-0.5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Product URL
                    </a>
                  ) : null}
                  {e.productImage ? (
                    <a
                      href={
                        e.productImage.startsWith("http")
                          ? e.productImage
                          : e.productImage
                      }
                      className="label border-b border-ink/30 pb-0.5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Product photo
                    </a>
                  ) : null}
                </div>

                <form
                  action={updateEnquiryStatus.bind(null, e.id)}
                  className="grid sm:grid-cols-[160px_1fr_auto] gap-2 items-end pt-2 border-t border-line"
                >
                  <div>
                    <label className="label block mb-1" htmlFor={`status-${e.id}`}>
                      Status
                    </label>
                    <select
                      id={`status-${e.id}`}
                      name="status"
                      defaultValue={e.status}
                      className="w-full border border-line px-3 py-2 rounded-md text-sm bg-paper"
                    >
                      {STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label block mb-1" htmlFor={`notes-${e.id}`}>
                      Admin notes / message update
                    </label>
                    <input
                      id={`notes-${e.id}`}
                      name="notes"
                      defaultValue={e.notes || ""}
                      placeholder="e.g. Called — waiting deposit"
                      className="w-full border border-line px-3 py-2 rounded-md text-sm bg-paper"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-ink text-paper px-4 py-2 label rounded-full h-[38px]"
                  >
                    Save
                  </button>
                </form>

                <form action={deleteEnquiry.bind(null, e.id)}>
                  <button type="submit" className="text-xs text-red-700/80 hover:text-red-700">
                    Delete lead
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminChrome>
  );
}

function FilterChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`label px-3 py-1.5 rounded-full border ${
        active ? "bg-ink text-paper border-ink" : "border-line text-mute hover:bg-paper"
      }`}
    >
      {label}
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "new"
      ? "bg-amber-50 text-amber-900 border-amber-200"
      : status === "ordered"
        ? "bg-emerald-50 text-emerald-900 border-emerald-200"
        : status === "closed"
          ? "bg-mist text-mute border-line"
          : "bg-paper text-ink border-line";
  return (
    <span className={`label px-2.5 py-1 rounded-full border ${tone}`}>{status}</span>
  );
}
