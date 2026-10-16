/**
 * Backfill metaTitle, metaDescription and basic FAQs for published blogs missing them.
 * Usage: npx tsx scripts/backfill-blog-seo.ts
 */
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function clip(s: string, n: number) {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= n) return t;
  return `${t.slice(0, n - 1).trim()}…`;
}

async function main() {
  const blogs = await prisma.blog.findMany({ where: { published: true } });
  let updated = 0;

  for (const b of blogs) {
    const data: {
      metaTitle?: string;
      metaDescription?: string;
      faqs?: { q: string; a: string }[];
    } = {};

    if (!b.metaTitle) {
      data.metaTitle = clip(`${b.title} | Sparklights`, 60);
    }
    if (!b.metaDescription) {
      data.metaDescription = clip(b.excerpt || b.title, 155);
    }

    const faqs = Array.isArray(b.faqs) ? (b.faqs as { q?: string; a?: string }[]) : [];
    if (faqs.length < 3) {
      data.faqs = [
        {
          q: `What is this Sparklights guide about?`,
          a: clip(b.excerpt || b.title, 220),
        },
        {
          q: "Does Sparklights deliver and install in Nairobi?",
          a: "Yes. Sparklights 254 delivers across Nairobi neighbourhoods and installs fixtures, with countrywide delivery on request. WhatsApp +254 712 827 840.",
        },
        {
          q: "Where is the Sparklights showroom?",
          a: "Shop 216, 2nd Floor, New Nyamakima Electrical Point Building, Duruma Road, Nairobi. Hours Mon–Sat, 8:00 AM – 6:00 PM.",
        },
        {
          q: "How do I get a lighting quote?",
          a: "Send a room photo or measurements on WhatsApp — we recommend size, style and a clear price including delivery or installation when needed.",
        },
      ];
    }

    if (Object.keys(data).length) {
      await prisma.blog.update({
        where: { id: b.id },
        data: {
          ...data,
          ...(data.faqs
            ? { faqs: data.faqs as unknown as Prisma.InputJsonValue }
            : {}),
        },
      });
      await prisma.seoPage.upsert({
        where: { path: `/blog/${b.slug}` },
        create: {
          path: `/blog/${b.slug}`,
          title: data.metaTitle || b.metaTitle || b.title,
          description: data.metaDescription || b.metaDescription || b.excerpt,
          h1: b.title,
          canonical: `https://sparklights.co.ke/blog/${b.slug}`,
          family: "journal",
          schemaType: "Article",
          parentPath: "/journal",
          indexable: true,
          published: true,
        },
        update: {
          title: data.metaTitle || b.metaTitle || undefined,
          description: data.metaDescription || b.metaDescription || undefined,
          lastModified: new Date(),
        },
      });
      updated += 1;
      console.log("updated", b.slug);
    }
  }

  // Fix weak product descriptions that hurt product SEO snippets
  const weak = await prisma.product.findMany({
    where: {
      published: true,
      description: { contains: "Premium lighting for homes and offices in Nairobi." },
    },
  });
  for (const p of weak) {
    const desc = `${p.name} from Sparklights 254 in Nairobi — ${p.type.toLowerCase()} priced at KES ${p.price.toLocaleString("en-KE")}. Delivery and installation available across Kenya. WhatsApp +254 712 827 840 to confirm size and finish.`;
    await prisma.product.update({ where: { id: p.id }, data: { description: desc } });
    console.log("product desc", p.slug);
  }

  console.log("blogs touched", updated, "products fixed", weak.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
