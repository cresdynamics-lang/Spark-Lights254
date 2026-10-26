import Image from "next/image";
import { SITE, whatsappUrl } from "@/lib/constants";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholder-images";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactWhatsAppStart } from "@/components/contact/ContactWhatsAppStart";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Chat on WhatsApp or send a message — Sparklights 254, Nairobi.",
};

export default function ContactPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight mb-4">
          Let&apos;s talk light.
        </h1>
        <p className="text-mute text-lg max-w-xl mb-10">
          The fastest way is WhatsApp. Messages you send here are also saved in our orders inbox.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <ContactWhatsAppStart href={whatsappUrl()} />
            <ContactForm />
          </div>

          <aside className="border border-line p-8 h-fit bg-mist">
            <h2 className="font-serif text-3xl mb-4">{SITE.fullName}</h2>
            <ul className="space-y-2 text-mute mb-8">
              <li>{SITE.address}</li>
              <li>Nairobi, Kenya</li>
              <li>
                <a href={`tel:${SITE.phoneTel}`} className="hover:text-ink">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-ink">
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.hours}</li>
            </ul>
            <div className="relative aspect-[4/3] border border-line overflow-hidden rounded-md">
              <Image
                src={PLACEHOLDER_IMAGES.showroom}
                alt="Sparklights showroom on Duruma Road, Nairobi"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 40vw"
              />
              <p className="absolute bottom-3 left-3 label text-paper drop-shadow">
                Showroom · Duruma Road
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
