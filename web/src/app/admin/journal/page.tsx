import { AdminStub } from "@/components/admin/AdminStub";

export default function Page() {
  return (
    <AdminStub
      title="Journal"
      body="Write and schedule lighting guides with a search checklist. Links each article up to its audience page."
      links={[{ href: "/journal", label: "View journal" }]}
    />
  );
}
