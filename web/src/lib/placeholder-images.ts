/**
 * Product photos used wherever real shoot/map imagery is not yet supplied.
 * Prefer these over empty boxes so the UI never looks unfinished.
 */
export const PLACEHOLDER_IMAGES = {
  showroom: "/images/products/Screenshot_2025_1008_135432.png",
  dining: "/images/products/7500.jpeg",
  bedroom: "/images/products/round2.jpg",
  kitchen: "/images/products/5500.jpeg",
  entrance: "/images/products/7000.jpeg",
  outdoor: "/images/products/3999.jpeg",
  wall: "/images/products/2500.jpeg",
  ceiling: "/images/products/6000.jpeg",
  pendant: "/images/products/3500.jpeg",
  crystal: "/images/products/6500.jpeg",
  black: "/images/products/2999.jpeg",
  glow: "/images/products/round1.jpg",
  room: "/images/products/roomm3.png",
  office: "/images/products/3000.jpeg",
  map: "/images/products/Screenshot_20251008_135721_1.jpg",
} as const;

/** Cycle of product images for journal / gallery fills. */
export const PRODUCT_IMAGE_POOL = [
  PLACEHOLDER_IMAGES.dining,
  PLACEHOLDER_IMAGES.pendant,
  PLACEHOLDER_IMAGES.wall,
  PLACEHOLDER_IMAGES.bedroom,
  PLACEHOLDER_IMAGES.kitchen,
  PLACEHOLDER_IMAGES.glow,
  PLACEHOLDER_IMAGES.entrance,
  PLACEHOLDER_IMAGES.ceiling,
  PLACEHOLDER_IMAGES.outdoor,
  PLACEHOLDER_IMAGES.crystal,
  PLACEHOLDER_IMAGES.black,
  PLACEHOLDER_IMAGES.office,
  PLACEHOLDER_IMAGES.room,
] as const;
