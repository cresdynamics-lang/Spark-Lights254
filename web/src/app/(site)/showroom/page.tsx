import { SITE, whatsappUrl } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { seoMetadata } from "@/lib/seo";
import { JsonLd, localBusinessSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

export async function generateMetadata() {
  return seoMetadata("/showroom");
}

export default function ShowroomPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Showroom", path: "/showroom" },
          ]),
        ]}
      />
      <section className="bg-paper border-b border-line">
        <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Showroom" }]} />
          <p className="label mb-4">Showroom</p>
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight mb-6">
            Come and see the lights
          </h1>
          <p className="text-mute text-lg mb-2">{SITE.address}</p>
          <p className="text-mute mb-2">{SITE.hours}</p>
          <p className="text-mute mb-2">
            <a href={`tel:${SITE.phoneTel}`} className="hover:text-ink">
              {SITE.phoneDisplay}
            </a>
          </p>
          <p className="text-mute mb-8">
            <a href={`mailto:${SITE.email}`} className="hover:text-ink">
              {SITE.email}
            </a>
          </p>
          <p className="text-sm text-mute mb-10 border border-line bg-mist p-4 rounded-md">
            PLACEHOLDER — embed Google Map pin once coordinates are confirmed to 5 decimals.
            Parking / directions note: TODO from client. Interior showroom photos: TODO.
          </p>
          <div className="flex flex-row gap-2 sm:gap-3">
            <Button
              href={whatsappUrl("Hi Sparklights — I’d like to book a showroom visit.")}
              external
              className="!bg-[#25D366] !text-white !border-[#25D366] flex-1 sm:flex-none justify-center"
            >
              Book on WhatsApp
            </Button>
            <Button
              href={`tel:${SITE.phoneTel}`}
              variant="secondary"
              external
              className="flex-1 sm:flex-none justify-center"
            >
              Call
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
