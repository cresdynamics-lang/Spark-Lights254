import Link from "next/link";
import { SITE, DELIVERY_AREAS, whatsappUrl } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1 space-y-5">
          <div>
            <p className="font-serif text-2xl tracking-[0.12em] uppercase">Sparklights</p>
            <p className="label text-paper/50 mt-1 tracking-[0.18em]">254 · Lighting · Nairobi</p>
          </div>
          <p className="text-sm text-paper/70 leading-relaxed">
            Chandeliers, wall lights and statement ceiling lights for homes across Kenya. Delivered
            fast. Installed properly.
          </p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex border border-paper/30 px-4 py-2.5 label text-paper tracking-[0.14em] rounded-full hover:bg-paper hover:text-ink transition-colors duration-300"
          >
            Order on WhatsApp
          </a>
          <p className="text-sm text-paper/60">{SITE.whatsappDisplay}</p>
        </div>

        <div>
          <p className="label text-paper/50 mb-4">Shop</p>
          <ul className="space-y-2.5 text-sm text-paper/80">
            {[
              ["Chandeliers", "/shop/chandeliers"],
              ["Wall Lights", "/shop/wall-lights"],
              ["Ceiling Lights", "/shop/ceiling-lights"],
              ["Pendant Lights", "/shop/pendant-lights"],
              ["Table & Floor Lamps", "/shop/table-floor-lamps"],
              ["Outdoor Lights", "/shop/outdoor-solar"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-paper transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label text-paper/50 mb-4">Rooms</p>
          <ul className="space-y-2.5 text-sm text-paper/80">
            {[
              ["Dining Room", "/rooms/dining-room"],
              ["Bedroom", "/rooms/bedroom"],
              ["Kitchen", "/rooms/kitchen"],
              ["Living Room", "/rooms/living-room"],
              ["Entrance & Hallway", "/rooms/entrance-hallway"],
              ["Bathroom & Mirror", "/rooms/bathroom-mirror"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-paper transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label text-paper/50 mb-4">Company</p>
          <ul className="space-y-2.5 text-sm text-paper/80">
            {[
              ["Signature Collection", "/signature"],
              ["Projects", "/projects"],
              ["Delivery & Installation", "/delivery"],
              ["Lighting Journal", "/journal"],
              ["Request a quote", "/request-a-quote"],
              ["Spaces: Podcast", "/podcast-studio-lighting-nairobi"],
              ["Spaces: Students", "/study-lamps-nairobi"],
              ["Spaces: Offices", "/office-lighting-nairobi"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-paper transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label text-paper/50 mb-4">Visit & Contact</p>
          <ul className="space-y-2.5 text-sm text-paper/80">
            <li>{SITE.address}</li>
            <li>{SITE.hours}</li>
            <li>
              <a href={`tel:${SITE.phoneTel}`} className="hover:text-paper">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-paper">
                {SITE.email}
              </a>
            </li>
          </ul>
          <div className="flex gap-4 mt-5 label text-paper/50">
            <a href="#" className="hover:text-paper">
              Instagram
            </a>
            <a href="#" className="hover:text-paper">
              Facebook
            </a>
            <a href="#" className="hover:text-paper">
              TikTok
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap gap-x-5 gap-y-2 items-center label text-paper/45">
          <span>We deliver & install in</span>
          <Link href="/delivery/nairobi" className="hover:text-paper">
            Nairobi
          </Link>
          {DELIVERY_AREAS.map((a) => (
            <Link key={a.slug} href={`/delivery/${a.slug}`} className="hover:text-paper">
              {a.name}
            </Link>
          ))}
          <span>Countrywide</span>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[0.65rem] tracking-[0.12em] uppercase text-paper/40">
          <p>© 2026 Sparklights 254. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            <span>M-Pesa · Visa · Mastercard</span>
            <span>|</span>
            <Link href="/policies/delivery" className="hover:text-paper">
              Delivery Policy
            </Link>
            <Link href="/policies/installation" className="hover:text-paper">
              Installation
            </Link>
            <Link href="/policies/payment" className="hover:text-paper">
              Payment
            </Link>
            <Link href="/policies/returns" className="hover:text-paper">
              Returns
            </Link>
            <Link href="/policies/warranty" className="hover:text-paper">
              Warranty
            </Link>
            <Link href="/policies/privacy" className="hover:text-paper">
              Privacy
            </Link>
            <Link href="/policies/terms" className="hover:text-paper">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
