export function AnnouncementBar() {
  return (
    <div className="bg-ink text-paper">
      <p className="label text-center py-2 sm:py-2.5 px-3 sm:px-4 text-paper/90 tracking-[0.1em] sm:tracking-[0.14em] text-[0.55rem] sm:text-[0.6875rem] leading-relaxed">
        <span className="hidden sm:inline">
          Same-day delivery across Nairobi · Installation available · Order on WhatsApp
        </span>
        <span className="sm:hidden">Same-day Nairobi · Installation · WhatsApp</span>
      </p>
    </div>
  );
}
