"use client";

import { useRef, useState } from "react";
import type { ProductSuggestion } from "@/lib/product-ai";

const field =
  "w-full border border-line px-4 py-3 rounded-md outline-none focus:border-ink bg-paper text-sm";

type Status =
  | { kind: "idle" }
  | { kind: "working" }
  | { kind: "done"; message: string }
  | { kind: "error"; message: string };

function setField(form: HTMLFormElement, name: string, value: string) {
  const el = form.elements.namedItem(name);
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
    el.value = value;
  }
}

function setChecks(form: HTMLFormElement, name: string, values: string[]) {
  if (!values.length) return;
  const wanted = new Set(values);
  form.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][name="${name}"]`).forEach((box) => {
    box.checked = wanted.has(box.value);
  });
}

/** Fill the surrounding product form with the AI suggestion; the owner then sets the price. */
function applySuggestion(form: HTMLFormElement, s: ProductSuggestion) {
  if (s.name) setField(form, "name", s.name);
  if (s.type) setField(form, "type", s.type);
  if (s.description) setField(form, "description", s.description);
  if (s.styles.length) setField(form, "styles", s.styles.join(", "));
  if (s.finish.length) setField(form, "finish", s.finish.join(", "));
  if (s.sizes.length) setField(form, "sizes", s.sizes.join(", "));
  if (s.specs.length) setField(form, "specs", s.specs.map((x) => `${x.label}: ${x.value}`).join("\n"));
  setChecks(form, "categories", s.categories);
  setChecks(form, "rooms", s.rooms);
}

export function ProductImageAI({
  initialImage,
  autofillDefault,
}: {
  initialImage?: string;
  autofillDefault: boolean;
}) {
  const [image, setImage] = useState(initialImage || "");
  const [preview, setPreview] = useState(initialImage || "");
  const [autofill, setAutofill] = useState(autofillDefault);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const fileRef = useRef<HTMLInputElement>(null);
  const [lastFile, setLastFile] = useState<File | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  async function send(file: File, analyze: boolean) {
    setStatus({ kind: "working" });
    const body = new FormData();
    body.append("file", file);
    if (analyze) body.append("analyze", "1");
    try {
      const res = await fetch("/api/admin/product-image", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Upload failed (${res.status})`);

      setImage(data.path);
      setPreview(data.path);
      const form = rootRef.current?.closest("form");

      if (data.suggestion && form) {
        applySuggestion(form, data.suggestion);
        setStatus({
          kind: "done",
          message: "Photo analysed — name, description and categories filled in. Check them, set the price, then save.",
        });
        const price = form.elements.namedItem("price");
        if (price instanceof HTMLInputElement) {
          price.scrollIntoView({ behavior: "smooth", block: "center" });
          price.focus({ preventScroll: true });
        }
      } else {
        setStatus({ kind: data.aiError ? "error" : "done", message: data.aiError || "Photo uploaded." });
      }
    } catch (err) {
      setStatus({ kind: "error", message: (err as Error).message || "Upload failed" });
    }
  }

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setLastFile(file);
    setPreview(URL.createObjectURL(file));
    void send(file, autofill);
  }

  const working = status.kind === "working";

  return (
    <div ref={rootRef} className="sm:col-span-2 border border-line rounded-md p-4 sm:p-5 bg-paper">
      <p className="label block mb-2">Product photo</p>
      <p className="text-sm text-mute mb-4">
        Upload a photo and AI will name it, write the description and pick the display categories. You
        only need to set the price and publish.
      </p>

      <div className="flex flex-col sm:flex-row gap-5">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={working}
          className="relative shrink-0 w-full sm:w-48 aspect-square rounded-md border border-dashed border-line bg-mist overflow-hidden flex items-center justify-center text-sm text-mute hover:border-ink disabled:opacity-60"
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element -- blob: previews can't go through next/image
            <img src={preview} alt="Product preview" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <span>Tap to choose a photo</span>
          )}
          {working ? (
            <span className="absolute inset-0 bg-paper/80 flex items-center justify-center label text-ink">
              Analysing…
            </span>
          ) : null}
        </button>

        <div className="flex-1 space-y-4">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onPick}
            className="hidden"
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={working}
              className="bg-ink text-paper px-5 py-2.5 label rounded-full disabled:opacity-50"
            >
              {preview ? "Change photo" : "Upload photo"}
            </button>
            {lastFile ? (
              <button
                type="button"
                onClick={() => send(lastFile, true)}
                disabled={working}
                className="border border-line px-5 py-2.5 label rounded-full disabled:opacity-50"
              >
                Re-analyse with AI
              </button>
            ) : null}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autofill}
              onChange={(e) => setAutofill(e.target.checked)}
              className="accent-ink"
            />
            Fill name, description &amp; categories from the photo
          </label>

          {status.kind === "done" ? <p className="text-sm text-green-800">{status.message}</p> : null}
          {status.kind === "error" ? <p className="text-sm text-red-700">{status.message}</p> : null}

          <div>
            <label className="text-xs text-mute block mb-1" htmlFor="image">
              Image path (set automatically)
            </label>
            <input
              id="image"
              name="image"
              required
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
                setPreview(e.target.value);
              }}
              placeholder="/uploads/products/example.jpg"
              className={field}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
