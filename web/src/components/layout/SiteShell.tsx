import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileBottomBar } from "./MobileBottomBar";
import { FloatingChat } from "./FloatingChat";
import { PromoBanner } from "@/components/promo/PromoBanner";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PromoBanner />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileBottomBar />
      <FloatingChat />
    </>
  );
}
