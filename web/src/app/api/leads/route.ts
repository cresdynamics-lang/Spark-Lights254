import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const type = String(body.type || "message").trim();
    const message = String(body.message || "").trim();
    if (!message || !["order", "message", "quote"].includes(type)) {
      return NextResponse.json({ ok: false, error: "Invalid lead" }, { status: 400 });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        type,
        status: "new",
        name: body.name ? String(body.name).trim().slice(0, 120) : null,
        phone: body.phone ? String(body.phone).trim().slice(0, 40) : null,
        email: body.email ? String(body.email).trim().slice(0, 120) : null,
        area: body.area ? String(body.area).trim().slice(0, 120) : null,
        message: message.slice(0, 8000),
        productSlug: body.productSlug ? String(body.productSlug).trim().slice(0, 200) : null,
        productName: body.productName ? String(body.productName).trim().slice(0, 200) : null,
        productPrice:
          body.productPrice != null && Number.isFinite(Number(body.productPrice))
            ? Math.round(Number(body.productPrice))
            : null,
        productImage: body.productImage
          ? String(body.productImage).trim().slice(0, 500)
          : null,
        productUrl: body.productUrl ? String(body.productUrl).trim().slice(0, 500) : null,
        source: body.source ? String(body.source).trim().slice(0, 60) : "other",
      },
    });

    return NextResponse.json({ ok: true, id: enquiry.id });
  } catch (err) {
    console.error("lead create failed", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
