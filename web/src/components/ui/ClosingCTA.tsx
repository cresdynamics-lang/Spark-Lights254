import { WhatsAppButton, Button } from "./Button";
import { whatsappUrl } from "@/lib/constants";

export function ClosingCTA({
  title = "Tell us about your room. We'll suggest the light.",
  body = "Send a photo and the room size on WhatsApp. We reply with options and prices.",
  primaryLabel = "Order on WhatsApp",
  secondaryLabel = "Send a photo of your room",
  message,
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  message?: string;
}) {
  const photoMessage =
    message ||
    "Hi Sparklights — here’s a photo of my room. Can you suggest lights and sizes?";

  return (
    <section className="bg-mist border-t border-line">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 py-16 sm:py-24 text-center">
        <p className="label mb-3 sm:mb-4">Let&apos;s light your space</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight mb-4 sm:mb-5 px-1">
          {title}
        </h2>
        <p className="text-mute text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          {body}
        </p>
        <div className="flex flex-row gap-2 sm:gap-3 justify-center items-center">
          <WhatsAppButton
            message={message}
            label={primaryLabel}
            className="flex-1 sm:flex-none justify-center px-3 sm:px-6 text-[0.58rem] sm:text-[0.6875rem] whitespace-nowrap"
          />
          <Button
            href={whatsappUrl(photoMessage)}
            variant="secondary"
            external
            className="flex-1 sm:flex-none justify-center px-3 sm:px-6 text-[0.58rem] sm:text-[0.6875rem] whitespace-nowrap"
          >
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
