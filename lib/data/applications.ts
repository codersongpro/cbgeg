import "server-only";
import { getFirestoreDb } from "@/lib/firebase-admin";
import type { SubGroupApplication } from "@/types";

export interface CreateApplicationInput {
  affiliation: string;
  name: string;
  contact: string;
  message: string;
}

export async function createApplication(
  subgroupId: string,
  input: CreateApplicationInput
): Promise<void> {
  await getFirestoreDb()
    .collection("subgroups")
    .doc(subgroupId)
    .collection("applications")
    .add({
      affiliation: input.affiliation.trim(),
      name: input.name.trim(),
      contact: input.contact.trim(),
      message: input.message.trim(),
      createdAt: new Date(),
    });
}

export async function listApplications(subgroupId: string): Promise<SubGroupApplication[]> {
  const snapshot = await getFirestoreDb()
    .collection("subgroups")
    .doc(subgroupId)
    .collection("applications")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      subgroupId,
      affiliation: data.affiliation,
      name: data.name,
      contact: data.contact,
      message: data.message,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
    };
  });
}
