import "server-only";

import type { Firestore } from "firebase-admin/firestore";

import type { PortfolioContent } from "@/src/features/portfolio/types";
import {
  getCollectionEntries,
  mapCollectionData,
} from "@/src/server/shared/firestore-collections";
import { portfolioCollectionNames } from "@/src/server/portfolio/collections";

export async function getAwards(
  db: Firestore
): Promise<PortfolioContent["awards"]> {
  const entries = await getCollectionEntries<PortfolioContent["awards"][number]>(
    db,
    portfolioCollectionNames.awards
  );

  return mapCollectionData(entries);
}
