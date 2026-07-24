import "server-only";
import { getFirestoreDb } from "@/lib/firebase-admin";
import { sha256 } from "@/lib/hash";
import { nextLoginAttempt } from "@/lib/rate-limit-state";

export async function allowCreatorLogin(key: string): Promise<boolean> {
  return allowAttempt("loginRateLimits", key);
}

export async function allowBoardWrite(key: string): Promise<boolean> {
  return allowAttempt("boardWriteRateLimits", key);
}

async function allowAttempt(collection: string, key: string): Promise<boolean> {
  const firestore = getFirestoreDb();
  const ref = firestore.collection(collection).doc(sha256(key));
  return firestore.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const data = snapshot.data();
    const next = nextLoginAttempt(
      data && typeof data.count === "number" && typeof data.resetAt === "number"
        ? { count: data.count, resetAt: data.resetAt }
        : null,
      Date.now()
    );
    transaction.set(ref, { count: next.count, resetAt: next.resetAt });
    return next.allowed;
  });
}
