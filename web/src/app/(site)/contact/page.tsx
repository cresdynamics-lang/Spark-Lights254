import { SITE, whatsappUrl } from "@/lib/constants";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
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
          The fastest way is WhatsApp. If you prefer, send a message below.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center bg-ink text-paper py-4 label tracking-[0.16em] mb-10"
            >
              Chat on WhatsApp
            </a>

            <form className="space-y-5" action={whatsappUrl()} method="get">
              {[
                { id: "name", label: "Your name", type: "text" },
                { id: "phone", label: "Phone", type: "tel" },
                { id: "area", label: "Area (e.g. Kilimani)", type: "text" },
                { id: "what", label: "What are you lighting?", type: "text" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="label block mb-2">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    name={f.id}
                    type={f.type}
                    className="w-full border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-ink transition-colors"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="label block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-ink transition-colors resize-y"
                />
              </div>
              <div className="flex flex-row gap-2 sm:gap-3">
                <Button
                  href={whatsappUrl("Hi Sparklights — I’d like to send a message.")}
                  external
                  className="flex-1 sm:flex-none justify-center px-3 sm:px-6 text-[0.58rem] sm:text-[0.6875rem] whitespace-nowrap"
                >
                  Send message
                </Button>
                <Button
                  href={whatsappUrl("Hi Sparklights — I’m attaching a photo of my room.")}
                  variant="secondary"
                  external
                  className="flex-1 sm:flex-none justify-center px-3 sm:px-6 text-[0.58rem] sm:text-[0.6875rem] whitespace-nowrap"
                >
                  Attach a photo
                </Button>
              </div>
            </form>
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
            <div className="aspect-[4/3] bg-paper border border-line flex items-center justify-center label">
              Map placeholder
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
