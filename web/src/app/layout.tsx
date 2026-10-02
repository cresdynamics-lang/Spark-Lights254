import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from "@/components/seo/JsonLd";
import { SITE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Lighting Shop Nairobi | Chandeliers & Ceiling Lights",
    template: "%s",
  },
  description:
    "Chandeliers, wall lights and statement ceiling lights for homes across Kenya. Same-day delivery across Nairobi. Installed properly.",
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: SITE.fullName,
    url: SITE.url,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
      </body>
    </html>
  );
}
