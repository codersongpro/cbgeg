import "server-only";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, MEMBER_COOKIE, signToken, verifyToken } from "@/lib/auth-tokens";

export async function createAdminSession() {
  const token = await signToken({ role: "admin" }, "7d");
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export async function isAdminSession(): Promise<boolean> {
  const store = await cookies();
  const payload = await verifyToken(store.get(ADMIN_COOKIE)?.value);
  return payload?.role === "admin";
}

export async function createMemberSession() {
  const token = await signToken({ verified: true }, "180d");
  const store = await cookies();
  store.set(MEMBER_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });
}

export async function isMemberVerified(): Promise<boolean> {
  const store = await cookies();
  const payload = await verifyToken(store.get(MEMBER_COOKIE)?.value);
  return payload?.verified === true;
}
