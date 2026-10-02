import { destroyAdminSession } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await destroyAdminSession();
  return NextResponse.redirect(new URL("/admin/login", req.url), { status: 303 });
}
