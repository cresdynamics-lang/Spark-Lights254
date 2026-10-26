import sharp from "sharp";

export type ProductSuggestion = {
  name: string;
  type: string;
  description: string;
  categories: string[];
  rooms: string[];
  styles: string[];
  finish: string[];
  sizes: string[];
  specs: { label: string; value: string }[];
};

type Option = { slug: string; name: string };

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

function strings(value: unknown, max = 6): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => String(v ?? "").trim())
    .filter(Boolean)
    .slice(0, max);
}

/**
 * Ask Groq's vision model to name and describe a lighting product photo and
 * pick where it should be displayed. Category/room picks are limited to the
 * slugs that exist in the catalogue.
 */
export async function analyzeProductPhoto(
  image: Buffer,
  options: { categories: Option[]; rooms: Option[] },
): Promise<ProductSuggestion> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not set");

  // Small JPEG keeps the request well under Groq's base64 image limit
  const small = await sharp(image).resize(800, 800, { fit: "inside" }).jpeg({ quality: 75 }).toBuffer();

  const prompt = `You are cataloguing products for Sparklights, a premium lighting shop in Nairobi, Kenya.
Look at the product photo and return JSON with exactly these keys:
- "name": short retail product name, 2-6 words, Title Case, no brand names (e.g. "Gold Crystal Ring Chandelier").
- "type": one product type, e.g. Chandelier, Pendant Light, Wall Light, Floor Lamp, Table Lamp, Ceiling Light, Spotlight, Outdoor Light, Ceiling Fan Light.
- "description": 2-3 warm, specific sentences for shoppers: shape, materials, finish, the light it gives, and where it suits. No price, no invented measurements.
- "categories": 1-3 slugs chosen ONLY from: ${options.categories.map((c) => `${c.slug} (${c.name})`).join(", ")}. Put the best match first.
- "rooms": 1-4 slugs chosen ONLY from: ${options.rooms.map((r) => `${r.slug} (${r.name})`).join(", ")}.
- "styles": 2-4 style tags, e.g. Crystal, Modern, Gold, Minimalist, Industrial, Classic.
- "finish": 1-3 visible finishes, e.g. Gold, Black, Chrome, Brass, Black & Gold.
- "sizes": [] unless a size is clearly visible in the photo.
- "specs": array of {"label","value"} for 2-4 facts you can see (e.g. Shape, Material, Shade, Light colour). Do not guess bulb counts or dimensions.`;

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: process.env.GROQ_VISION_MODEL || "qwen/qwen3.8-27b",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${small.toString("base64")}` } },
          ],
        },
      ],
    }),
    signal: AbortSignal.timeout(45_000),
  });

  if (!res.ok) {
    const detail = (await res.text()).slice(0, 300);
    throw new Error(`Groq request failed (${res.status}): ${detail}`);
  }

  const data = await res.json();
  const content: string = data?.choices?.[0]?.message?.content || "{}";
  const raw = JSON.parse(content.replace(/^[\s\S]*?(\{[\s\S]*\})[\s\S]*$/, "$1"));

  const categorySlugs = new Set(options.categories.map((c) => c.slug));
  const roomSlugs = new Set(options.rooms.map((r) => r.slug));

  return {
    name: String(raw.name || "").trim(),
    type: String(raw.type || "").trim(),
    description: String(raw.description || "").trim(),
    categories: strings(raw.categories).filter((s) => categorySlugs.has(s)),
    rooms: strings(raw.rooms).filter((s) => roomSlugs.has(s)),
    styles: strings(raw.styles),
    finish: strings(raw.finish),
    sizes: strings(raw.sizes),
    specs: (Array.isArray(raw.specs) ? raw.specs : [])
      .map((s: { label?: unknown; value?: unknown }) => ({
        label: String(s?.label ?? "").trim(),
        value: String(s?.value ?? "").trim(),
      }))
      .filter((s: { label: string; value: string }) => s.label && s.value)
      .slice(0, 6),
  };
}
