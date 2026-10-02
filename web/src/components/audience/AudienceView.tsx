import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/ui/ProductCard";
import { FAQ } from "@/components/ui/FAQ";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import { WhatsAppButton, Button } from "@/components/ui/Button";
import {
  type AudiencePage,
  audienceProducts,
} from "@/lib/audiences";

export function AudienceView({ page }: { page: AudiencePage }) {
  const items = audienceProducts(page);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: page.breadcrumb },
            ]}
          />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink leading-tight mb-4 max-w-3xl">
            {page.h1}
          </h1>
          <p className="text-mute text-base sm:text-lg max-w-2xl leading-relaxed">
            {page.description}
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          {page.cardsSubtitle ? <p className="label mb-2">{page.cardsSubtitle}</p> : null}
          <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-8 max-w-2xl">
            {page.cardsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border border-line">
            {page.cards.map((c) => (
              <div key={c.title} className="bg-paper p-6 sm:p-8 min-h-[180px] flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl mb-3">{c.title}</h3>
                  <p className="text-mute text-sm sm:text-base leading-relaxed">{c.body}</p>
                </div>
                {c.tag ? <p className="label mt-6">{c.tag}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 grid lg:grid-cols-2 gap-10">
          <div>
            <p className="label mb-2">{page.guideEyebrow}</p>
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">{page.guideTitle}</h2>
            {page.guideIntro ? (
              <p className="text-mute leading-relaxed">{page.guideIntro}</p>
            ) : null}
          </div>
          <div className="border border-line rounded-md overflow-hidden bg-paper">
            <div className="grid grid-cols-3 label border-b border-line px-4 py-3 bg-mist">
              <span>{page.guideHeaders[0]}</span>
              <span>{page.guideHeaders[1]}</span>
              <span>{page.guideHeaders[2]}</span>
            </div>
            {page.guideRows.map((r) => (
              <div
                key={r[0]}
                className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-3 px-4 py-4 border-b border-line last:border-0 text-sm"
              >
                <p className="font-medium text-ink">{r[0]}</p>
                <p className="text-mute">{r[1]}</p>
                <p className="text-mute">{r[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.packages ? (
        <section className="border-b border-line bg-mist">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
            <p className="label mb-2">{page.packages.eyebrow}</p>
            <h2 className="font-serif text-3xl sm:text-4xl mb-8">{page.packages.title}</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {page.packages.items.map((pkg) => (
                <div key={pkg.tier} className="border border-line bg-paper p-6 rounded-md flex flex-col">
                  <p className="label mb-2">{pkg.tier}</p>
                  <h3 className="font-serif text-2xl mb-1">{pkg.name}</h3>
                  <p className="text-mute mb-5">{pkg.price}</p>
                  <ul className="space-y-2 text-sm text-mute mb-6 flex-1">
                    {pkg.bullets.map((b) => (
                      <li key={b} className="border-b border-line pb-2">
                        {b}
                      </li>
                    ))}
                  </ul>
                  <WhatsAppButton
                    label="Ask on WhatsApp"
                    message={`Hi Sparklights — I’m interested in the ${pkg.name} package (${pkg.tier}).`}
                    className="w-full justify-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.process ? (
        <section className="border-b border-line bg-paper">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
            <p className="label mb-2">Our process</p>
            <h2 className="font-serif text-3xl sm:text-4xl mb-10">{page.process.title}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {page.process.steps.map((s) => (
                <div key={s.n} className="border-t border-line pt-5">
                  <p className="label mb-2">{s.n}</p>
                  <h3 className="font-serif text-xl mb-2">{s.title}</h3>
                  <p className="text-mute text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {items.length ? (
        <section className="border-b border-line bg-mist">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
            <h2 className="font-serif text-3xl sm:text-4xl mb-8">{page.productsTitle}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {items.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FAQ items={page.faqs} eyebrow={`${page.h1.split(" ")[0]} FAQ`} title="Questions we hear" />

      <ClosingCTA
        title={page.ctaTitle}
        body={page.ctaBody}
        primaryLabel={page.ctaPrimary}
        secondaryLabel={page.ctaSecondary}
      />

      {page.ctaPrimaryHref ? (
        <div className="sr-only">
          <Button href={page.ctaPrimaryHref}>{page.ctaPrimary}</Button>
          <Link href={page.ctaPrimaryHref}>quote</Link>
        </div>
      ) : null}
    </>
  );
}
