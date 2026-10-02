import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  categories,
  products,
  rooms,
  locations,
  guides,
  projects,
} from "../src/lib/data";
import { staticBlogPosts } from "../src/lib/blog-data";
import { SEO_INVENTORY } from "../src/lib/seo-inventory";
import { SITE } from "../src/lib/constants";
import { absoluteUrl } from "../src/lib/seo";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Sparklights…");

  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.room.deleteMany();
  await prisma.location.deleteMany();
  await prisma.guide.deleteMany();
  await prisma.project.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.seoPage.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.adminUser.deleteMany();

  const adminEmail = process.env.ADMIN_EMAIL || "mary@sparklights.co.ke";
  const adminPassword = process.env.ADMIN_PASSWORD || "Mary254";

  await prisma.adminUser.create({
    data: {
      email: adminEmail,
      name: "Mary",
      passwordHash: await bcrypt.hash(adminPassword, 10),
    },
  });

  await prisma.siteSetting.createMany({
    data: [
      { key: "phoneDisplay", value: SITE.phoneDisplay },
      { key: "phoneTel", value: SITE.phoneTel },
      { key: "whatsapp", value: SITE.whatsapp },
      { key: "email", value: SITE.email },
      { key: "address", value: SITE.address },
      { key: "hours", value: SITE.hours },
    ],
  });

  for (const [i, c] of categories.entries()) {
    await prisma.category.create({
      data: {
        slug: c.slug,
        name: c.name,
        shortName: c.shortName ?? null,
        subtitle: c.subtitle,
        description: c.description,
        mosaicLabel: c.mosaicLabel ?? null,
        image: c.image,
        featured: Boolean(c.featured),
        sortOrder: i,
      },
    });
  }

  const categoryRows = await prisma.category.findMany();
  const categoryBySlug = Object.fromEntries(categoryRows.map((c) => [c.slug, c.id]));

  for (const [i, p] of products.entries()) {
    const categoryId = categoryBySlug[p.category];
    if (!categoryId) {
      console.warn(`Skipping product ${p.slug} — missing category ${p.category}`);
      continue;
    }
    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        type: p.type,
        price: p.price,
        image: p.image,
        hoverImage: p.hoverImage ?? null,
        badge: p.badge ?? null,
        styles: p.styles,
        rooms: p.rooms,
        finish: p.finish ?? [],
        sizes: p.sizes ?? [],
        description: p.description,
        specs: p.specs,
        signature: Boolean(p.signature),
        published: true,
        sortOrder: i,
        categoryId,
        categories: [p.category],
      },
    });
  }

  for (const [i, r] of rooms.entries()) {
    await prisma.room.create({
      data: {
        slug: r.slug,
        name: r.name,
        headline: r.headline,
        description: r.description,
        image: r.image,
        tips: r.tips,
        faqs: r.faqs,
        chooseBy: r.chooseBy ?? Prisma.DbNull,
        sortOrder: i,
      },
    });
  }

  for (const [i, l] of locations.entries()) {
    await prisma.location.create({
      data: {
        slug: l.slug,
        name: l.name,
        blurb: l.blurb,
        homes: l.homes,
        delivery: l.delivery,
        window: l.window,
        sortOrder: i,
      },
    });
  }

  for (const [i, g] of guides.entries()) {
    await prisma.guide.create({
      data: {
        slug: g.slug,
        title: g.title,
        summary: g.summary,
        intent: g.intent,
        sortOrder: i,
      },
    });
  }

  for (const [i, p] of projects.entries()) {
    await prisma.project.create({
      data: {
        slug: p.slug,
        title: p.title,
        area: p.area,
        room: p.room,
        image: p.image,
        sortOrder: i,
      },
    });
  }

  for (const [i, b] of staticBlogPosts.entries()) {
    await prisma.blog.create({
      data: {
        slug: b.slug,
        title: b.title,
        topic: b.topic,
        excerpt: b.excerpt,
        body: b.body,
        author: b.author,
        minutes: b.minutes,
        featured: b.featured,
        published: true,
        audienceHref: b.audienceHref ?? null,
        image: b.image ?? null,
        sortOrder: i,
      },
    });
  }

  for (const page of SEO_INVENTORY) {
    await prisma.seoPage.create({
      data: {
        path: page.path,
        title: page.title,
        description: page.description,
        h1: page.h1,
        canonical: absoluteUrl(page.path),
        family: page.family,
        schemaType: page.schemaType,
        parentPath: page.parentPath,
        indexable: page.indexable,
        published: page.published,
        phase: page.phase ?? null,
        audienceHref: page.audienceHref ?? null,
      },
    });
  }

  const counts = {
    categories: await prisma.category.count(),
    products: await prisma.product.count(),
    rooms: await prisma.room.count(),
    locations: await prisma.location.count(),
    guides: await prisma.guide.count(),
    projects: await prisma.project.count(),
    blogs: await prisma.blog.count(),
    seoPages: await prisma.seoPage.count(),
    admins: await prisma.adminUser.count(),
  };

  console.log("Seed complete:", counts);
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
