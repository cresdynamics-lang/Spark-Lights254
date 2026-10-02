import { AdminStub } from "@/components/admin/AdminStub";

export default function Page() {
  return (
    <AdminStub
      title="Area pages"
      body="Publish Nairobi and county delivery pages in phases. Only go live when you have a real job photo for that area."
      links={[{ href: "/delivery/kilimani", label: "Preview Kilimani" }]}
    />
  );
}
