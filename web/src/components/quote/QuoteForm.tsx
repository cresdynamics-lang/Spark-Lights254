"use client";

import { useState } from "react";
import { WhatsAppButton } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/constants";

const TYPES = ["Office", "Hotel", "Restaurant", "Shop", "Designer / Contractor"];

export function QuoteForm() {
  const [type, setType] = useState("Office");

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const msg = [
          "Hi Sparklights — quote request",
          `Type: ${type}`,
          `Name: ${fd.get("name")}`,
          `Business: ${fd.get("business")}`,
          `Phone: ${fd.get("phone")}`,
          `Location: ${fd.get("location")}`,
          `Rooms/areas: ${fd.get("rooms")}`,
          `Target date: ${fd.get("date")}`,
          `Budget: ${fd.get("budget") || "not specified"}`,
        ].join("\n");
        window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
      }}
    >
      <div>
        <p className="label mb-3">Project type</p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`label px-3 py-2 border rounded-full ${
                type === t ? "bg-ink text-paper border-ink" : "border-line text-mute"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      {[
        ["name", "Your name"],
        ["business", "Business name"],
        ["phone", "Phone / WhatsApp"],
        ["location", "Location (area in Nairobi or town)"],
        ["rooms", "Number of rooms or areas"],
        ["date", "Target date"],
        ["budget", "Budget range (optional)"],
      ].map(([id, label]) => (
        <div key={id}>
          <label htmlFor={id} className="label block mb-2">
            {label}
          </label>
          <input
            id={id}
            name={id}
            required={id !== "budget"}
            className="w-full border border-line px-4 py-3 rounded-md outline-none focus:border-ink"
          />
        </div>
      ))}
      <p className="text-sm text-mute">
        Upload plans, photos or a mood board on WhatsApp after you send.
      </p>
      <div className="flex flex-row gap-2">
        <button
          type="submit"
          className="flex-1 bg-ink text-paper py-3 label tracking-[0.14em] rounded-full"
        >
          Request my quote
        </button>
        <WhatsAppButton label="WhatsApp" className="flex-1 justify-center" />
      </div>
    </form>
  );
}
