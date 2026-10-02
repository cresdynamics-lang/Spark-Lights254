import { AdminStub } from "@/components/admin/AdminStub";

export default function Page() {
  return (
    <AdminStub
      title="Audience & Room pages"
      body="Edit the intro, look cards, packages and FAQs on pages like podcast, students, offices, hospitality, walkways and accent lighting."
      links={[
        { href: "/podcast-studio-lighting-nairobi", label: "Podcast" },
        { href: "/study-lamps-nairobi", label: "Students" },
        { href: "/office-lighting-nairobi", label: "Offices" },
        { href: "/request-a-quote", label: "Quote" },
      ]}
    />
  );
}
