import { AdminStub } from "@/components/admin/AdminStub";

export default function Page() {
  return (
    <AdminStub
      title="Pages & Layout"
      body="Change hero text, images, section order and visibility. Preview desktop and mobile before publishing. Brand colours and fonts stay locked."
      links={[{ href: "/", label: "Preview home" }]}
    />
  );
}
