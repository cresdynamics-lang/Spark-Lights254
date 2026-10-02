import Link from "next/link";
import { SITE, DELIVERY_AREAS } from "@/lib/constants";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { MetaWhatsAppLink } from "@/components/analytics/MetaWhatsAppLink";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 grid gap-10 md:grid-cols-[1.2fr_1.8fr] lg:grid-cols-[1.1fr_2fr_1fr]">
        <div className="space-y-5">
          <BrandLogo size="xl" onDark />
          <p className="text-sm text-paper/70 leading-relaxed">
            Chandeliers, wall lights and statement ceiling lights for homes across Kenya. Delivered
            fast. Installed properly.
          </p>
          <MetaWhatsAppLink className="inline-flex border border-paper/30 px-4 py-2.5 label text-paper tracking-[0.14em] rounded-full hover:bg-paper hover:text-ink transition-colors duration-300">
            Order on WhatsApp
          </MetaWhatsAppLink>
          <p className="text-sm text-paper/60">{SITE.whatsappDisplay}</p>
        </div>

        {/* Shop · Rooms · Company — three columns, one row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 min-w-0">
          <div className="min-w-0">
            <p className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.14em] uppercase text-paper/50 mb-3">
              Shop
            </p>
            <ul className="space-y-1.5 sm:space-y-2 text-[0.7rem] sm:text-xs text-paper/80 leading-snug">
              {[
                ["Chandeliers", "/shop/chandeliers"],
                ["Wall Lights", "/shop/wall-lights"],
                ["Ceiling Lights", "/shop/ceiling-lights"],
                ["Pendant Lights", "/shop/pendant-lights"],
                ["Table & Floor", "/shop/table-floor-lamps"],
                ["Outdoor Lights", "/shop/outdoor-solar"],
                ["Shop all", "/shop"],
                ["New arrivals", "/new-arrivals"],
                ["Sale", "/sale"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-paper transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.14em] uppercase text-paper/50 mb-3">
              Rooms
            </p>
            <ul className="space-y-1.5 sm:space-y-2 text-[0.7rem] sm:text-xs text-paper/80 leading-snug">
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

          <div className="min-w-0">
            <p className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.14em] uppercase text-paper/50 mb-3">
              Company
            </p>
            <ul className="space-y-1.5 sm:space-y-2 text-[0.7rem] sm:text-xs text-paper/80 leading-snug">
              {[
                ["Signature", "/signature"],
                ["Projects", "/projects"],
                ["Delivery", "/delivery"],
                ["Journal", "/journal"],
                ["Request a quote", "/request-a-quote"],
                ["About", "/about"],
                ["Contact", "/contact"],
                ["Staff", "/admin"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-paper transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.14em] uppercase text-paper/50 mb-3">
            Visit & Contact
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-paper/80">
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
          <div className="flex gap-4 mt-5 text-[0.55rem] sm:text-[0.65rem] tracking-[0.14em] uppercase text-paper/50">
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-wrap gap-x-5 gap-y-2 items-center text-[0.55rem] sm:text-[0.65rem] tracking-[0.12em] uppercase text-paper/45">
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[0.6rem] tracking-[0.12em] uppercase text-paper/40">
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
