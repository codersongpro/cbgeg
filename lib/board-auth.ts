import "server-only";
import { isAdminSession, isMemberVerified } from "@/lib/session";

export async function boardAccess() {
  const isAdmin = await isAdminSession();
  return { allowed: isAdmin || (await isMemberVerified()), isAdmin };
}
