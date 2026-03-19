import "server-only";

import type { Firestore } from "firebase-admin/firestore";

import type { PortfolioContent } from "@/src/features/portfolio/types";
import {
  getCollectionEntries,
  requireSingleEntry,
  stripCollectionMeta,
} from "@/src/server/shared/firestore-collections";
import { portfolioCollectionNames } from "@/src/server/portfolio/collections";

export async function getEducation(
  db: Firestore
): Promise<PortfolioContent["education"]> {
  const entries = await getCollectionEntries<PortfolioContent["education"]>(
    db,
    portfolioCollectionNames.educations
  );

  return stripCollectionMeta(
    requireSingleEntry(entries, portfolioCollectionNames.educations)
  );
}
