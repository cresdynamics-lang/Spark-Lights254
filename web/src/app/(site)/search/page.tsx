import { Suspense } from "react";
import SearchClient from "./SearchClient";

export const metadata = {
  title: "Search",
  description: "Search Sparklights products, rooms and styles.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-mute">Loading search…</div>}>
      <SearchClient />
    </Suspense>
  );
}
