"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { categories, rooms } from "@/lib/data";
import { SITE } from "@/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setShopOpen(false);
    setRoomsOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const shopActive = pathname.startsWith("/shop") || pathname.startsWith("/products");
  const roomsActive = pathname.startsWith("/rooms");
  const deliveryActive = pathname.startsWith("/delivery");
  const projectsActive = pathname.startsWith("/projects");
  const aboutActive = pathname.startsWith("/about");
  const signatureActive = pathname.startsWith("/signature");
  const saleActive = pathname.startsWith("/sale");
  const newActive = pathname.startsWith("/new-arrivals");

  const navBtn = (active: boolean, open?: boolean) =>
    `relative text-[0.6875rem] tracking-[0.16em] uppercase px-3 py-2 rounded-full transition-all duration-300 ${
      active || open
        ? "text-ink bg-mist"
        : "text-ink/80 hover:text-ink hover:bg-mist"
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-line transition-all duration-500 ${
          compact ? "shadow-[0_1px_0_0_var(--line)]" : ""
        }`}
      >
        <div
          className={`mx-auto max-w-7xl px-4 sm:px-5 md:px-8 flex items-center justify-between gap-3 transition-all duration-500 ${
            compact ? "h-14 sm:h-16" : "h-16 sm:h-[4.75rem] md:h-20"
          }`}
        >
          <Link href="/" className="shrink-0 min-w-0">
            <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.1em] sm:tracking-[0.12em] uppercase text-ink block leading-none">
              Sparklights
            </span>
            {!compact ? (
              <span className="label mt-1 hidden xs:block sm:block tracking-[0.16em] sm:tracking-[0.2em] text-[0.6rem] sm:text-[0.6875rem]">
                254 · Lighting · Nairobi
              </span>
            ) : null}
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => {
                setShopOpen(true);
                setRoomsOpen(false);
              }}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button
                type="button"
                className={navBtn(shopActive, shopOpen)}
                aria-expanded={shopOpen}
              >
                Shop
              </button>
            </div>
            <div
              className="relative"
              onMouseEnter={() => {
                setRoomsOpen(true);
                setShopOpen(false);
              }}
              onMouseLeave={() => setRoomsOpen(false)}
            >
              <button
                type="button"
                className={navBtn(roomsActive, roomsOpen)}
                aria-expanded={roomsOpen}
              >
                Rooms
              </button>
            </div>
            <Link href="/signature" className={navBtn(signatureActive)}>
              Signature
            </Link>
            <Link href="/new-arrivals" className={navBtn(newActive)}>
              New
            </Link>
            <Link href="/sale" className={navBtn(saleActive)}>
              Sale
            </Link>
            <Link href="/projects" className={navBtn(projectsActive)}>
              Projects
            </Link>
            <Link href="/delivery" className={navBtn(deliveryActive)}>
              Delivery
            </Link>
            <Link href="/about" className={navBtn(aboutActive)}>
              About
            </Link>
          </nav>

          {/* Mobile: Search + hamburger · Desktop: Search only on the right */}
          <div className="flex items-center gap-1 shrink-0">
            <Link
              href="/search"
              className={`${navBtn(pathname.startsWith("/search"))} !px-2.5 sm:!px-3`}
              aria-label="Search"
            >
              Search
            </Link>
            <button
              type="button"
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-mist transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">Menu</span>
              <span className="flex flex-col gap-[5px] w-5">
                <span
                  className={`block h-[1.5px] w-full bg-ink transition-transform duration-300 origin-center ${
                    mobileOpen ? "translate-y-[6.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-ink transition-opacity duration-300 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-ink transition-transform duration-300 origin-center ${
                    mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Shop mega menu — image cards like Rooms / Signature */}
        <div
          className={`mega-menu absolute left-0 right-0 bg-paper border-b border-line hidden lg:block ${
            shopOpen ? "open" : ""
          }`}
          onMouseEnter={() => setShopOpen(true)}
          onMouseLeave={() => setShopOpen(false)}
        >
          <div className="mx-auto max-w-7xl px-8 py-10">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8">
                <p className="label mb-4">By type</p>
                <div className="grid grid-cols-5 gap-3">
                  {categories.slice(0, 5).map((c) => (
                    <Link key={c.slug} href={`/shop/${c.slug}`} className="group">
                      <div className="relative aspect-[3/4] bg-mist border border-line overflow-hidden mb-2 rounded-md">
                        <Image
                          src={c.image}
                          alt={c.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25 transition-colors duration-500" />
                      </div>
                      <p className="text-sm text-ink group-hover:text-mute transition-colors">
                        {c.shortName || c.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/signature"
                className="col-span-4 relative min-h-[280px] bg-ink overflow-hidden group rounded-md"
              >
                <Image
                  src="/images/products/7500.jpeg"
                  alt="Signature Collection"
                  fill
                  className="object-cover opacity-70 transition-opacity duration-600 group-hover:opacity-90"
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="label text-paper/70 mb-1">Signature Collection</p>
                  <p className="font-serif text-3xl text-paper">Explore</p>
                </div>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-line grid grid-cols-12 gap-8">
              <div className="col-span-7">
                <p className="label mb-4">By room</p>
                <div className="grid grid-cols-5 gap-3">
                  {rooms.slice(0, 5).map((r) => (
                    <Link key={r.slug} href={`/rooms/${r.slug}`} className="group">
                      <div className="relative aspect-[4/5] bg-mist border border-line overflow-hidden mb-2 rounded-md">
                        <Image
                          src={r.image}
                          alt={r.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                      <p className="text-xs text-ink">
                        {r.name.replace(" & Hallway", "").replace(" & Mirror", "")}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="col-span-5">
                <p className="label mb-4">Quick shop</p>
                <div className="grid grid-cols-2 gap-2 text-sm mb-6">
                  <Link href="/sale" className="font-serif text-xl text-ink hover:text-mute py-1">
                    Sale
                  </Link>
                  <Link href="/new-arrivals" className="font-serif text-xl text-ink hover:text-mute py-1">
                    New arrivals
                  </Link>
                </div>
                <p className="label mb-4">By space / audience</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    ["Podcast & studio", "/podcast-studio-lighting-nairobi"],
                    ["Students", "/study-lamps-nairobi"],
                    ["Offices", "/office-lighting-nairobi"],
                    ["Hotels & restaurants", "/hotel-restaurant-lighting-nairobi"],
                    ["Walkways", "/walkway-corridor-lights-nairobi"],
                    ["Accent & display", "/accent-display-lighting-nairobi"],
                    ["Request a quote", "/request-a-quote"],
                    ["Journal", "/journal"],
                  ].map(([label, href]) => (
                    <Link key={href} href={href} className="text-ink hover:text-mute py-1">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-line px-8 py-3 flex justify-between items-center">
            <Link href="/shop/chandeliers" className="label hover:text-ink transition-colors">
              View everything →
            </Link>
            <Link href="/showroom" className="label hover:text-ink transition-colors">
              Visit showroom →
            </Link>
          </div>
        </div>

        {/* Rooms mega menu */}
        <div
          className={`mega-menu absolute left-0 right-0 bg-paper border-b border-line hidden lg:block ${
            roomsOpen ? "open" : ""
          }`}
          onMouseEnter={() => setRoomsOpen(true)}
          onMouseLeave={() => setRoomsOpen(false)}
        >
          <div className="mx-auto max-w-7xl px-8 py-10 grid grid-cols-6 gap-5">
            {rooms.map((r) => (
              <Link key={r.slug} href={`/rooms/${r.slug}`} className="group">
                <div className="relative aspect-[3/4] bg-mist border border-line overflow-hidden mb-3 rounded-md">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute bottom-3 left-3 label text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Shop
                  </span>
                </div>
                <p className="text-sm text-ink group-hover:text-mute transition-colors">{r.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] bg-paper flex flex-col lg:hidden">
          <div className="flex items-center justify-between px-4 h-16 border-b border-line">
            <span className="font-serif text-lg tracking-[0.1em] uppercase">{SITE.name}</span>
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-mist"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <span className="relative w-5 h-5">
                <span className="absolute left-0 top-1/2 w-full h-[1.5px] bg-ink rotate-45" />
                <span className="absolute left-0 top-1/2 w-full h-[1.5px] bg-ink -rotate-45" />
              </span>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
            {[
              { href: "/search", label: "Search" },
              { href: "/shop/chandeliers", label: "Shop" },
              { href: "/rooms/dining-room", label: "Rooms" },
              { href: "/signature", label: "Signature" },
              { href: "/new-arrivals", label: "New arrivals" },
              { href: "/sale", label: "Sale" },
              { href: "/projects", label: "Projects" },
              { href: "/delivery", label: "Delivery" },
              { href: "/about", label: "About" },
              { href: "/journal", label: "Journal" },
              { href: "/request-a-quote", label: "Request a quote" },
              { href: "/showroom", label: "Showroom" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block font-serif text-2xl sm:text-3xl text-ink py-3 border-b border-line/80"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-line pb-24">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="block border border-ink text-ink text-center py-3.5 label tracking-[0.14em] rounded-full"
            >
              Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
