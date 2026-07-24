import "server-only";
import { randomUUID } from "crypto";
import { getFirestoreDb } from "@/lib/firebase-admin";
import { sha256 } from "@/lib/hash";
import { maskName } from "@/lib/mask";
import {
  hashCreatorContact,
  hashManagePassword,
  verifyManagePassword,
} from "@/lib/manage-credentials";
import type { SubGroupInput } from "@/lib/subgroup-input";
import type { SubGroupFull, SubGroupPublic } from "@/types";

const subgroupsCollection = () => getFirestoreDb().collection("subgroups");

export type CreateSubGroupInput = SubGroupInput;

async function applicationCount(subgroupId: string): Promise<number> {
  const snapshot = await subgroupsCollection()
    .doc(subgroupId)
    .collection("applications")
    .count()
    .get();
  return snapshot.data().count;
}

function toPublic(id: string, data: FirebaseFirestore.DocumentData, count: number): SubGroupPublic {
  return {
    id,
    topic: data.topic,
    description: data.description,
    creatorNameMasked: maskName(data.creatorName),
    createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
    applicationCount: count,
  };
}

function toFull(id: string, data: FirebaseFirestore.DocumentData, count: number): SubGroupFull {
  return {
    ...toPublic(id, data, count),
    creatorName: data.creatorName,
    creatorAffiliation: data.creatorAffiliation,
    creatorContact: data.creatorContact,
  };
}

export async function createSubGroup(
  input: CreateSubGroupInput,
  managePassword: string
): Promise<{ id: string; manageToken: string }> {
  const manageToken = randomUUID();
  const doc = {
    topic: input.topic.trim(),
    description: input.description.trim(),
    creatorName: input.creatorName.trim(),
    creatorAffiliation: input.creatorAffiliation.trim(),
    creatorContact: input.creatorContact.trim(),
    creatorContactHash: hashCreatorContact(input.creatorContact),
    managePasswordHash: await hashManagePassword(managePassword),
    manageTokenHash: sha256(manageToken),
    createdAt: new Date(),
  };
  const ref = await subgroupsCollection().add(doc);
  return { id: ref.id, manageToken };
}

export async function findCreatorSubGroups(
  contact: string,
  password: string
): Promise<SubGroupFull[]> {
  const snapshot = await subgroupsCollection()
    .where("creatorContactHash", "==", hashCreatorContact(contact))
    .get();
  const matching = [];
  for (const doc of snapshot.docs) {
    const data = doc.data();
    if (
      typeof data.managePasswordHash === "string" &&
      (await verifyManagePassword(password, data.managePasswordHash))
    ) {
      matching.push(toFull(doc.id, data, await applicationCount(doc.id)));
    }
  }
  return matching;
}

export async function listSubGroupsByIds(ids: string[]): Promise<SubGroupFull[]> {
  const groups = await Promise.all(ids.map((id) => getSubGroupFull(id)));
  return groups.filter((group): group is SubGroupFull => group !== null);
}

export async function updateSubGroup(id: string, input: CreateSubGroupInput): Promise<boolean> {
  const ref = subgroupsCollection().doc(id);
  const current = await ref.get();
  if (!current.exists) return false;
  await ref.update({
    ...input,
    creatorContactHash: hashCreatorContact(input.creatorContact),
    updatedAt: new Date(),
  });
  return true;
}

export async function deleteSubGroup(id: string): Promise<boolean> {
  const ref = subgroupsCollection().doc(id);
  if (!(await ref.get()).exists) return false;
  await getFirestoreDb().recursiveDelete(ref);
  return true;
}

export async function setManagePassword(id: string, password: string): Promise<boolean> {
  const ref = subgroupsCollection().doc(id);
  const current = await ref.get();
  if (!current.exists) return false;
  const data = current.data()!;
  await ref.update({
    managePasswordHash: await hashManagePassword(password),
    creatorContactHash: hashCreatorContact(data.creatorContact),
    updatedAt: new Date(),
  });
  return true;
}

export async function listSubGroupsPublic(): Promise<SubGroupPublic[]> {
  const snapshot = await subgroupsCollection().orderBy("createdAt", "desc").get();
  return Promise.all(
    snapshot.docs.map(async (doc) => toPublic(doc.id, doc.data(), await applicationCount(doc.id)))
  );
}

export async function listSubGroupsFull(): Promise<SubGroupFull[]> {
  const snapshot = await subgroupsCollection().orderBy("createdAt", "desc").get();
  return Promise.all(
    snapshot.docs.map(async (doc) => toFull(doc.id, doc.data(), await applicationCount(doc.id)))
  );
}

export async function getSubGroupPublic(id: string): Promise<SubGroupPublic | null> {
  const doc = await subgroupsCollection().doc(id).get();
  if (!doc.exists) return null;
  return toPublic(doc.id, doc.data()!, await applicationCount(id));
}

export async function getSubGroupFull(id: string): Promise<SubGroupFull | null> {
  const doc = await subgroupsCollection().doc(id).get();
  if (!doc.exists) return null;
  return toFull(doc.id, doc.data()!, await applicationCount(id));
}

export async function verifyManageToken(id: string, token: string): Promise<boolean> {
  if (!token) return false;
  const doc = await subgroupsCollection().doc(id).get();
  if (!doc.exists) return false;
  return doc.data()?.manageTokenHash === sha256(token);
}
