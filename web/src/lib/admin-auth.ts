import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

const COOKIE = "sl_admin_session";

function secret() {
  return process.env.ADMIN_SESSION_SECRET || "sparklights-dev-session-change-me";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export async function createAdminSession(adminId: string) {
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 7;
  const payload = `${adminId}.${exp}`;
  const token = `${payload}.${sign(payload)}`;
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroyAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getAdminSession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [adminId, expStr, sig] = parts;
  const payload = `${adminId}.${expStr}`;
  const expected = sign(payload);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  if (Number(expStr) < Date.now()) return null;
  const admin = await prisma.adminUser.findUnique({ where: { id: adminId } });
  return admin;
}

export async function requireAdmin() {
  const admin = await getAdminSession();
  if (!admin) return null;
  return admin;
}

export async function verifyAdminLogin(email: string, password: string) {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) return null;
  const ok = await bcrypt.compare(password, admin.passwordHash);
  return ok ? admin : null;
}
