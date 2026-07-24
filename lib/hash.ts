import "server-only";
import { createHash } from "crypto";

/** Deterministic hash used for exact-match lookups (access codes, manage tokens). */
export function sha256(value: string): string {
  return createHash("sha256").update(value.trim()).digest("hex");
}
