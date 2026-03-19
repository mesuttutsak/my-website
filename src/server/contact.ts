import "server-only";

import { FieldValue } from "firebase-admin/firestore";

import type { ContactMessageInput } from "@/src/features/portfolio/types";
import { getRequiredFirestoreDb } from "@/src/lib/firebase-admin";

const contactCollection =
  process.env.FIREBASE_CONTACT_COLLECTION ?? "contactMessages";

export async function createContactMessage(input: ContactMessageInput) {
  const db = getRequiredFirestoreDb();

  await db.collection(contactCollection).add({
    ...input,
    status: "new",
    createdAt: FieldValue.serverTimestamp(),
  });
}
