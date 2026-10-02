"use client";

import { useState, useTransition } from "react";
import { uploadCompressedProductImage } from "@/app/admin/media/actions";

export function MediaUploadForm() {
  const [path, setPath] = useState<string | null>(null);
  const [bytes, setBytes] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <div className="border border-line bg-paper rounded-md p-6 max-w-xl space-y-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          setError(null);
          setPath(null);
          start(async () => {
            try {
              const res = await uploadCompressedProductImage(fd);
              setPath(res.path);
              setBytes(res.bytes);
              e.currentTarget.reset();
            } catch (err) {
              setError((err as Error).message || "Upload failed");
            }
          });
        }}
        className="space-y-4"
      >
        <label className="block">
          <span className="label block mb-2">Product photo</span>
          <input
            type="file"
            name="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            required
            className="block w-full text-sm"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="label bg-ink text-paper px-5 py-2.5 rounded-full disabled:opacity-50"
        >
          {pending ? "Compressing…" : "Upload & compress"}
        </button>
      </form>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {path ? (
        <div className="text-sm border border-line bg-mist rounded-md p-4 space-y-1">
          <p className="label text-mute">Saved (compressed)</p>
          <p className="font-mono text-ink break-all">{path}</p>
          {bytes != null ? (
            <p className="text-mute">{(bytes / 1024).toFixed(0)} KB on disk</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
