/**
 * Black November sale — 30% off sitewide.
 * Ends automatically at midnight Nairobi time going into 28 Nov 2026
 * (banner and sale prices stop showing from 28 Nov). No redeploy needed.
 */
export const PROMO = {
  name: "Black November",
  percentOff: 30,
  /** ISO start/end with Nairobi offset (EAT, UTC+3). */
  startsAt: "2026-11-19T00:00:00+03:00",
  endsAt: "2026-11-28T00:00:00+03:00",
} as const;

const START_MS = Date.parse(PROMO.startsAt);
const END_MS = Date.parse(PROMO.endsAt);

export function isPromoActive(now: number = Date.now()) {
  return now >= START_MS && now < END_MS;
}

export function promoEndsInMs(now: number = Date.now()) {
  return Math.max(0, END_MS - now);
}

/** Sale price rounded to the nearest KES 10. */
export function promoPrice(price: number) {
  return Math.round((price * (100 - PROMO.percentOff)) / 100 / 10) * 10;
}

/** Price to charge right now. */
export function currentPrice(price: number, now: number = Date.now()) {
  return isPromoActive(now) ? promoPrice(price) : price;
}
