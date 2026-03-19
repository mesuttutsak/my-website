import "server-only";

import type { Firestore } from "firebase-admin/firestore";

import type { PortfolioContent } from "@/src/features/portfolio/types";
import {
  getCollectionEntries,
  mapCollectionData,
} from "@/src/server/shared/firestore-collections";
import { portfolioCollectionNames } from "@/src/server/portfolio/collections";

export async function getSocialLinks(
  db: Firestore
): Promise<PortfolioContent["socialLinks"]> {
  const entries = await getCollectionEntries<PortfolioContent["socialLinks"][number]>(
    db,
    portfolioCollectionNames.socialLinks
  );

  return mapCollectionData(entries);
}
