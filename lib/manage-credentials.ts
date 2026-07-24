import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

export function validateManagePassword(value: unknown): string | null {
  return typeof value === "string" && Array.from(value).length >= 4 ? value : null;
}

export function normalizeCreatorContact(value: string): string {
  return value.trim().toLocaleLowerCase("en-US");
}

export function hashCreatorContact(value: string): string {
  return createHash("sha256").update(normalizeCreatorContact(value)).digest("hex");
}

export async function hashManagePassword(value: string): Promise<string> {
  const salt = randomBytes(16);
  const derived = (await scrypt(value, salt, KEY_LENGTH)) as Buffer;
  return `scrypt:${salt.toString("hex")}:${derived.toString("hex")}`;
}

export async function verifyManagePassword(value: string, stored: string): Promise<boolean> {
  const [algorithm, saltHex, hashHex] = stored.split(":");
  if (algorithm !== "scrypt" || !saltHex || !hashHex) return false;

  try {
    const expected = Buffer.from(hashHex, "hex");
    if (expected.length !== KEY_LENGTH) return false;
    const actual = (await scrypt(value, Buffer.from(saltHex, "hex"), expected.length)) as Buffer;
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
