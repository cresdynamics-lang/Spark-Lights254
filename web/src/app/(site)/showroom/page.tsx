import Image from "next/image";
import { SITE, whatsappUrl } from "@/lib/constants";
import { PLACEHOLDER_IMAGES, PRODUCT_IMAGE_POOL } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { seoMetadata } from "@/lib/seo";
import { JsonLd, localBusinessSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

export async function generateMetadata() {
  return seoMetadata("/showroom");
}

const gallery = [
  PLACEHOLDER_IMAGES.showroom,
  PLACEHOLDER_IMAGES.dining,
  PLACEHOLDER_IMAGES.wall,
  ...PRODUCT_IMAGE_POOL.slice(0, 3),
];

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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Showroom" }]} />
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
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
            <div className="relative aspect-[4/5] border border-line overflow-hidden rounded-md">
              <Image
                src={PLACEHOLDER_IMAGES.showroom}
                alt="Lit fixture in the Sparklights showroom — sample product photo"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <p className="label mb-3">On the floor</p>
          <h2 className="font-serif text-3xl sm:text-4xl mb-8">Pieces you can see lit</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <div key={src + i} className="relative aspect-[4/5] border border-line overflow-hidden rounded-md bg-paper">
                <Image
                  src={src}
                  alt="Showroom sample lighting"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
