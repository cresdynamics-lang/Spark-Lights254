import { Hero } from "@/components/home/Hero";
import { IntentCards } from "@/components/home/IntentCards";
import { AudienceRail } from "@/components/home/AudienceRail";
import { CategoryMosaic } from "@/components/home/CategoryMosaic";
import { LightFinder } from "@/components/home/LightFinder";
import { SignatureSection } from "@/components/home/SignatureSection";
import { ShopByStyle } from "@/components/home/ShopByStyle";
import { RoomsSection } from "@/components/home/RoomsSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WarmOrCool } from "@/components/home/WarmOrCool";
import { DeliverySection } from "@/components/home/DeliverySection";
import { AreaTicker } from "@/components/home/AreaTicker";
import { SeenInNairobi } from "@/components/home/SeenInNairobi";
import { Testimonials } from "@/components/home/Testimonials";
import { LightingGuides } from "@/components/home/LightingGuides";
import { MapShowroom } from "@/components/home/MapShowroom";
import { DesignersBuilders } from "@/components/home/DesignersBuilders";
import { FAQ } from "@/components/ui/FAQ";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import { homeFaqs } from "@/lib/data";
import { seoMetadata } from "@/lib/seo";
import { JsonLd, localBusinessSchema } from "@/components/seo/JsonLd";

export async function generateMetadata() {
  return seoMetadata("/");
}

/** Cache the heavy homepage HTML; refresh catalogue snippets periodically. */
export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Hero />
      <IntentCards />
      <AudienceRail />
      <CategoryMosaic />
      <LightFinder />
      <SignatureSection />
      <ShopByStyle />
      <RoomsSection />
      <FeaturedProducts />
      <WarmOrCool />
      <DeliverySection />
      <AreaTicker />
      <SeenInNairobi />
      <Testimonials />
      <LightingGuides />
      <MapShowroom />
      <DesignersBuilders />
      <FAQ items={homeFaqs} />
      <ClosingCTA />
    </>
  );
}
