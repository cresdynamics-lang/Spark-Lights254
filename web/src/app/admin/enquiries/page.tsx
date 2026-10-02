import { AdminStub } from "@/components/admin/AdminStub";

export default function Page() {
  return (
    <AdminStub
      title="Enquiries & Orders"
      body="WhatsApp leads, quote requests, orders, payments and deliveries in one place."
      links={[{ href: "/request-a-quote", label: "View quote form" }]}
    />
  );
}
