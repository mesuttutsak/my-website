import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

function loadEnvFiles() {
  const envFiles = [".env.local", ".env"];

  for (const envFile of envFiles) {
    const envPath = path.join(projectRoot, envFile);

    if (fs.existsSync(envPath)) {
      process.loadEnvFile(envPath);
    }
  }
}

function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }

  return value;
}

async function readSeedData() {
  const seedFilePath = path.join(projectRoot, "scripts", "data", "portfolio.seed.json");
  const fileContents = await fsp.readFile(seedFilePath, "utf8");

  return JSON.parse(fileContents);
}

function validateSeedData(seedData) {
  if (!seedData || typeof seedData !== "object") {
    throw new Error("Seed data must be an object keyed by collection name.");
  }

  for (const [collectionName, entries] of Object.entries(seedData)) {
    if (!Array.isArray(entries)) {
      throw new Error(`Collection '${collectionName}' must be an array.`);
    }

    const seenIds = new Set();

    for (const entry of entries) {
      if (
        !entry ||
        typeof entry !== "object" ||
        typeof entry.id !== "string" ||
        !entry.data ||
        typeof entry.data !== "object"
      ) {
        throw new Error(
          `Collection '${collectionName}' contains an invalid entry. Expected { id, data }.`
        );
      }

      if (seenIds.has(entry.id)) {
        throw new Error(
          `Collection '${collectionName}' contains duplicate id '${entry.id}'.`
        );
      }

      seenIds.add(entry.id);
    }
  }
}

function withSequentialOrder(seedData) {
  return Object.fromEntries(
    Object.entries(seedData).map(([collectionName, entries]) => {
      const shouldAssignOrder =
        entries.length > 1 ||
        entries.some(
          (entry) =>
            entry &&
            typeof entry === "object" &&
            entry.data &&
            typeof entry.data === "object" &&
            Object.hasOwn(entry.data, "order")
        );

      if (!shouldAssignOrder) {
        return [collectionName, entries];
      }

      return [
        collectionName,
        entries.map((entry, index) => ({
          ...entry,
          data: {
            ...entry.data,
            order: index + 1,
          },
        })),
      ];
    })
  );
}

async function main() {
  loadEnvFiles();

  const projectId = getRequiredEnv("FIREBASE_PROJECT_ID");
  const clientEmail = getRequiredEnv("FIREBASE_CLIENT_EMAIL");
  const privateKey = getRequiredEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");
  const useMerge = process.argv.includes("--merge");
  const isDryRun = process.argv.includes("--dry-run");
  const rawSeedData = await readSeedData();
  validateSeedData(rawSeedData);
  const seedData = withSequentialOrder(rawSeedData);

  if (isDryRun) {
    console.log(
      JSON.stringify(
        {
          merge: useMerge,
          collections: Object.fromEntries(
            Object.entries(seedData).map(([collectionName, entries]) => [
              collectionName,
              entries.map((entry) => ({
                id: entry.id,
                data: entry.data,
              })),
            ])
          ),
        },
        null,
        2
      )
    );
    return;
  }

  const app =
    getApps()[0] ??
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });

  const db = getFirestore(app);

  for (const [collectionName, entries] of Object.entries(seedData)) {
    for (const entry of entries) {
      await db.collection(collectionName).doc(entry.id).set(entry.data, {
        merge: useMerge,
      });
    }
  }

  console.log(`Seed completed for collections: ${Object.keys(seedData).join(", ")}`);
  console.log(
    "Note: contactMessages collection will be created automatically on the first contact form submission."
  );
}

main().catch((error) => {
  console.error("Firestore seed failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
