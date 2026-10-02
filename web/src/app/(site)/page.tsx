import { Hero } from "@/components/home/Hero";
import { IntentCards } from "@/components/home/IntentCards";
import { CategoryMosaic } from "@/components/home/CategoryMosaic";
import { SignatureSection } from "@/components/home/SignatureSection";
import { RoomsSection } from "@/components/home/RoomsSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { DeliverySection } from "@/components/home/DeliverySection";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/ui/FAQ";
import { ClosingCTA } from "@/components/ui/ClosingCTA";
import { homeFaqs } from "@/lib/data";
import { seoMetadata } from "@/lib/seo";
import { JsonLd, localBusinessSchema } from "@/components/seo/JsonLd";

export async function generateMetadata() {
  return seoMetadata("/");
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Hero />
      <IntentCards />
      <CategoryMosaic />
      <SignatureSection />
      <RoomsSection />
      <FeaturedProducts />
      <DeliverySection />
      <Testimonials />
      <FAQ items={homeFaqs} />
      <ClosingCTA />
    </>
  );
}
