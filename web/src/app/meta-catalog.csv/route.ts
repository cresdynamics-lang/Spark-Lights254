import { buildMetaCatalogCsv } from "@/lib/meta-catalog-feed";

/** Meta Commerce Manager scheduled feed URL (must stay public, not under /api). */
export const revalidate = 3600;

export async function GET() {
  const csv = await buildMetaCatalogCsv();

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'inline; filename="meta-catalog.csv"',
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
