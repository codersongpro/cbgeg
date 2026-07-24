import "server-only";
import { getFirestoreDb } from "@/lib/firebase-admin";
import { sha256 } from "@/lib/hash";
import type { AccessCode } from "@/types";

const codesCollection = () => getFirestoreDb().collection("codes");

export async function verifyAccessCode(code: string): Promise<boolean> {
  const trimmed = code.trim();
  if (!trimmed) return false;

  const snapshot = await codesCollection()
    .where("codeHash", "==", sha256(trimmed))
    .where("active", "==", true)
    .limit(1)
    .get();

  return !snapshot.empty;
}

export async function listAccessCodes(): Promise<AccessCode[]> {
  const snapshot = await codesCollection().orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      code: data.code,
      label: data.label ?? "",
      active: data.active ?? true,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
    };
  });
}

export async function createAccessCode(code: string, label: string): Promise<AccessCode> {
  const trimmed = code.trim();
  const doc = {
    code: trimmed,
    codeHash: sha256(trimmed),
    label: label.trim(),
    active: true,
    createdAt: new Date(),
  };
  const ref = await codesCollection().add(doc);
  return { id: ref.id, ...doc, createdAt: doc.createdAt.toISOString() };
}

export async function setAccessCodeActive(id: string, active: boolean): Promise<void> {
  await codesCollection().doc(id).update({ active });
}

export async function deleteAccessCode(id: string): Promise<void> {
  await codesCollection().doc(id).delete();
}
