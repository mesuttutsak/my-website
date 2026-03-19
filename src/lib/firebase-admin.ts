import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";

const firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
const firebaseClientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n"
);

export const hasFirebaseAdminConfig = Boolean(
  firebaseProjectId && firebaseClientEmail && firebasePrivateKey
);

function getMissingFirebaseAdminEnvNames() {
  return [
    !firebaseProjectId ? "FIREBASE_PROJECT_ID" : null,
    !firebaseClientEmail ? "FIREBASE_CLIENT_EMAIL" : null,
    !firebasePrivateKey ? "FIREBASE_PRIVATE_KEY" : null,
  ].filter((value): value is string => Boolean(value));
}

function getFirebaseAdminApp() {
  if (!hasFirebaseAdminConfig) {
    return null;
  }

  if (getApps().length > 0) {
    return getApps()[0];
  }

  return initializeApp({
    credential: cert({
      projectId: firebaseProjectId,
      clientEmail: firebaseClientEmail,
      privateKey: firebasePrivateKey,
    }),
  });
}

export function getFirestoreDb() {
  const app = getFirebaseAdminApp();

  if (!app) {
    return null;
  }

  return getFirestore(app);
}

export function getRequiredFirestoreDb(): Firestore {
  const db = getFirestoreDb();

  if (db) {
    return db;
  }

  const missingEnvNames = getMissingFirebaseAdminEnvNames();

  throw new Error(
    `Firebase admin config is missing. Set ${missingEnvNames.join(", ")}.`
  );
}
