import "server-only";
import { getFirestoreDb } from "@/lib/firebase-admin";
import { hashManagePassword, verifyManagePassword } from "@/lib/manage-credentials";
import type { BoardCommentInput, BoardPostInput } from "@/lib/board-input";
import type { BoardComment, BoardPost } from "@/types";

const postsCollection = () => getFirestoreDb().collection("boardPosts");

function dateString(value: unknown): string {
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as { toDate(): Date }).toDate().toISOString();
  }
  return "";
}

async function toPost(
  id: string,
  data: FirebaseFirestore.DocumentData
): Promise<BoardPost> {
  const count = await postsCollection().doc(id).collection("comments").count().get();
  return {
    id,
    title: data.title,
    content: data.content,
    authorName: data.authorName,
    createdAt: dateString(data.createdAt),
    updatedAt: dateString(data.updatedAt),
    commentCount: count.data().count,
  };
}

export async function listBoardPosts(): Promise<BoardPost[]> {
  const snapshot = await postsCollection().orderBy("createdAt", "desc").limit(100).get();
  return Promise.all(snapshot.docs.map((doc) => toPost(doc.id, doc.data())));
}

export async function getBoardPost(id: string): Promise<BoardPost | null> {
  const snapshot = await postsCollection().doc(id).get();
  return snapshot.exists ? toPost(snapshot.id, snapshot.data()!) : null;
}

export async function createBoardPost(
  input: BoardPostInput,
  password: string
): Promise<string> {
  const now = new Date();
  const ref = await postsCollection().add({
    ...input,
    passwordHash: await hashManagePassword(password),
    createdAt: now,
    updatedAt: now,
  });
  return ref.id;
}

export async function verifyBoardPostPassword(id: string, password: string): Promise<boolean> {
  const snapshot = await postsCollection().doc(id).get();
  const stored = snapshot.data()?.passwordHash;
  return typeof stored === "string" && verifyManagePassword(password, stored);
}

export async function updateBoardPost(id: string, input: BoardPostInput): Promise<boolean> {
  const ref = postsCollection().doc(id);
  if (!(await ref.get()).exists) return false;
  await ref.update({ ...input, updatedAt: new Date() });
  return true;
}

export async function deleteBoardPost(id: string): Promise<boolean> {
  const ref = postsCollection().doc(id);
  if (!(await ref.get()).exists) return false;
  await getFirestoreDb().recursiveDelete(ref);
  return true;
}

export async function listBoardComments(postId: string): Promise<BoardComment[]> {
  const snapshot = await postsCollection()
    .doc(postId)
    .collection("comments")
    .orderBy("createdAt", "asc")
    .get();
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      postId,
      content: data.content,
      authorName: data.authorName,
      createdAt: dateString(data.createdAt),
    };
  });
}

export async function createBoardComment(
  postId: string,
  input: BoardCommentInput,
  password: string
): Promise<string | null> {
  const post = postsCollection().doc(postId);
  if (!(await post.get()).exists) return null;
  const ref = await post.collection("comments").add({
    ...input,
    passwordHash: await hashManagePassword(password),
    createdAt: new Date(),
  });
  return ref.id;
}

export async function verifyBoardCommentPassword(
  postId: string,
  commentId: string,
  password: string
): Promise<boolean> {
  const snapshot = await postsCollection().doc(postId).collection("comments").doc(commentId).get();
  const stored = snapshot.data()?.passwordHash;
  return typeof stored === "string" && verifyManagePassword(password, stored);
}

export async function deleteBoardComment(postId: string, commentId: string): Promise<boolean> {
  const ref = postsCollection().doc(postId).collection("comments").doc(commentId);
  if (!(await ref.get()).exists) return false;
  await ref.delete();
  return true;
}
