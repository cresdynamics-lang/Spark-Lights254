"use client";

import { useSyncExternalStore } from "react";
import { isPromoActive, promoEndsInMs } from "@/lib/promo";

/**
 * True while the Black November sale is running. Checked in the browser, so
 * cached pages still hide the sale once it ends, and open tabs flip off at
 * the exact end time.
 */
function subscribe(onChange: () => void) {
  const ms = promoEndsInMs();
  if (!isPromoActive() || ms > 2_147_000_000) return () => {};
  const t = setTimeout(onChange, ms + 500);
  return () => clearTimeout(t);
}

export function usePromoActive() {
  return useSyncExternalStore(subscribe, () => isPromoActive(), () => isPromoActive());
}
