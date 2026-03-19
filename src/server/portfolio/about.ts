import "server-only";

import type { Firestore } from "firebase-admin/firestore";

import type { PortfolioContent } from "@/src/features/portfolio/types";
import {
  getCollectionEntries,
  requireSingleEntry,
  stripCollectionMeta,
} from "@/src/server/shared/firestore-collections";
import { portfolioCollectionNames } from "@/src/server/portfolio/collections";

export async function getAbout(db: Firestore): Promise<PortfolioContent["about"]> {
  const entries = await getCollectionEntries<PortfolioContent["about"]>(
    db,
    portfolioCollectionNames.about
  );

  return stripCollectionMeta(
    requireSingleEntry(entries, portfolioCollectionNames.about)
  );
}
