"use client";

import { whatsappUrl } from "@/lib/constants";
import { logLead } from "@/lib/leads";
import { trackMeta } from "@/lib/meta-pixel";

export function ContactForm() {
  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const name = String(fd.get("name") || "").trim();
        const phone = String(fd.get("phone") || "").trim();
        const area = String(fd.get("area") || "").trim();
        const what = String(fd.get("what") || "").trim();
        const messageBody = String(fd.get("message") || "").trim();
        const msg = [
          "Hi Sparklights — website message",
          name && `Name: ${name}`,
          phone && `Phone: ${phone}`,
          area && `Area: ${area}`,
          what && `Lighting: ${what}`,
          messageBody && `Message: ${messageBody}`,
        ]
          .filter(Boolean)
          .join("\n");

        void logLead({
          type: "message",
          source: "contact",
          name,
          phone,
          area,
          message: msg,
        });
        trackMeta("Contact", { currency: "KES", content_name: "contact-form" });
        window.open(whatsappUrl(msg || "Hi Sparklights — I’d like to send a message."), "_blank", "noopener,noreferrer");
      }}
    >
      {[
        { id: "name", label: "Your name", type: "text" },
        { id: "phone", label: "Phone", type: "tel" },
        { id: "area", label: "Area (e.g. Kilimani)", type: "text" },
        { id: "what", label: "What are you lighting?", type: "text" },
      ].map((f) => (
        <div key={f.id}>
          <label htmlFor={f.id} className="label block mb-2">
            {f.label}
          </label>
          <input
            id={f.id}
            name={f.id}
            type={f.type}
            className="w-full border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-ink transition-colors"
          />
        </div>
      ))}
      <div>
        <label htmlFor="message" className="label block mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-ink transition-colors resize-y"
        />
      </div>
      <div className="flex flex-row gap-2 sm:gap-3">
        <button
          type="submit"
          className="flex-1 sm:flex-none justify-center px-5 py-3 bg-ink text-paper label tracking-[0.14em] rounded-full"
        >
          Send message
        </button>
        <button
          type="button"
          className="flex-1 sm:flex-none justify-center px-5 py-3 border border-ink label tracking-[0.14em] rounded-full"
          onClick={() => {
            const msg = "Hi Sparklights — I’m attaching a photo of my room.";
            void logLead({ type: "message", source: "contact-photo", message: msg });
            trackMeta("Contact", { currency: "KES", content_name: "contact-photo" });
            window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
          }}
        >
          Attach a photo
        </button>
      </div>
    </form>
  );
}
