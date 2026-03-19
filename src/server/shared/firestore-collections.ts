import "server-only";

import type { Firestore } from "firebase-admin/firestore";

export type CollectionEntry<T extends object> = T & {
  id: string;
  order?: number;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export function requireSingleEntry<T>(entries: T[], collectionName: string) {
  if (entries.length !== 1) {
    throw new Error(
      `Collection '${collectionName}' must contain exactly 1 document in Firestore. Found ${entries.length}.`
    );
  }

  return entries[0];
}

export function stripCollectionMeta<T extends object>(entry: CollectionEntry<T>): T {
  const { id, order, ...data } = entry;
  return data as T;
}

export function mapCollectionData<T extends object>(entries: CollectionEntry<T>[]) {
  return entries.map(stripCollectionMeta);
}

export async function getCollectionEntries<T extends object>(
  db: Firestore,
  collectionName: string
): Promise<CollectionEntry<T>[]> {
  try {
    const snapshot = await db.collection(collectionName).get();

    return snapshot.docs
      .map(
        (doc): CollectionEntry<T> => ({
          id: doc.id,
          ...(doc.data() as T),
        })
      )
      .sort(
        (left, right) =>
          (left.order ?? Number.MAX_SAFE_INTEGER) -
          (right.order ?? Number.MAX_SAFE_INTEGER)
      );
  } catch (error) {
    throw new Error(
      `Failed to load '${collectionName}' from Firestore. ${getErrorMessage(error)}`
    );
  }
}
