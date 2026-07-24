import "server-only";
import { randomUUID } from "crypto";
import { firestore } from "@/lib/firebase-admin";
import { sha256 } from "@/lib/hash";
import { maskName } from "@/lib/mask";
import type { SubGroupFull, SubGroupPublic } from "@/types";

const subgroupsCollection = () => firestore.collection("subgroups");

export interface CreateSubGroupInput {
  topic: string;
  description: string;
  creatorName: string;
  creatorAffiliation: string;
  creatorContact: string;
}

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
  input: CreateSubGroupInput
): Promise<{ id: string; manageToken: string }> {
  const manageToken = randomUUID();
  const doc = {
    topic: input.topic.trim(),
    description: input.description.trim(),
    creatorName: input.creatorName.trim(),
    creatorAffiliation: input.creatorAffiliation.trim(),
    creatorContact: input.creatorContact.trim(),
    manageTokenHash: sha256(manageToken),
    createdAt: new Date(),
  };
  const ref = await subgroupsCollection().add(doc);
  return { id: ref.id, manageToken };
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
