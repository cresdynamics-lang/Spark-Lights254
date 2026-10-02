import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileBottomBar } from "./MobileBottomBar";
import { FloatingChat } from "./FloatingChat";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileBottomBar />
      <FloatingChat />
    </>
  );
}
