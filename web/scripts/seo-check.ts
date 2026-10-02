/**
 * Build-time SEO inventory checks.
 * Fails if published pages violate title/meta/H1/canonical uniqueness rules.
 */
import { validateSeoInventory } from "../src/lib/seo";
import { SEO_INVENTORY } from "../src/lib/seo-inventory";

const errors = validateSeoInventory(SEO_INVENTORY);

if (errors.length) {
  console.error("\nSEO inventory check FAILED:\n");
  for (const e of errors) console.error(" -", e);
  console.error(`\n${errors.length} error(s).\n`);
  process.exit(1);
}

console.log(`SEO inventory OK — ${SEO_INVENTORY.filter((r) => r.published).length} published pages checked.`);
