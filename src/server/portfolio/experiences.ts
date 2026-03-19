import "server-only";

import type { Firestore } from "firebase-admin/firestore";

import type { PortfolioContent } from "@/src/features/portfolio/types";
import {
  getCollectionEntries,
  mapCollectionData,
} from "@/src/server/shared/firestore-collections";
import { portfolioCollectionNames } from "@/src/server/portfolio/collections";

export async function getExperiences(
  db: Firestore
): Promise<PortfolioContent["experiences"]> {
  const entries = await getCollectionEntries<PortfolioContent["experiences"][number]>(
    db,
    portfolioCollectionNames.experiences
  );

  return mapCollectionData(entries);
}
