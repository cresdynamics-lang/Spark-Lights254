import { AdminStub } from "@/components/admin/AdminStub";

export default function Page() {
  return (
    <AdminStub
      title="Settings"
      body="Business details, delivery areas, payment keys, opening hours and announcement bar text."
      links={[{ href: "/contact", label: "View contact page" }]}
    />
  );
}
