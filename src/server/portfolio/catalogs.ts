import "server-only";

import type { Firestore } from "firebase-admin/firestore";

import type { PortfolioPageData } from "@/src/features/portfolio/types";
import { toCatalogRecord } from "@/src/features/portfolio/catalogs";
import {
  type CollectionEntry,
  getCollectionEntries,
} from "@/src/server/shared/firestore-collections";
import { portfolioCollectionNames } from "@/src/server/portfolio/collections";

type CatalogEntry = CollectionEntry<{ label: string }>;

function toCatalogEntries(entries: CatalogEntry[], collectionName: string) {
  if (entries.length === 0) {
    throw new Error(`Collection '${collectionName}' is empty in Firestore.`);
  }

  const catalogEntries = entries
    .filter((entry) => typeof entry.label === "string")
    .map(({ id, label }) => ({ id, label }));

  if (catalogEntries.length === 0) {
    throw new Error(
      `Collection '${collectionName}' must contain at least one document with a string label.`
    );
  }

  return catalogEntries;
}

export async function getPortfolioCatalogs(
  db: Firestore
): Promise<PortfolioPageData["catalogs"]> {
  const [skillEntries, workingTypeEntries, employmentTypeEntries] = await Promise.all([
    getCollectionEntries<{ label: string }>(db, portfolioCollectionNames.skills),
    getCollectionEntries<{ label: string }>(
      db,
      portfolioCollectionNames.workingTypes
    ),
    getCollectionEntries<{ label: string }>(
      db,
      portfolioCollectionNames.employmentTypes
    ),
  ]);

  return {
    skills: toCatalogRecord(
      toCatalogEntries(skillEntries, portfolioCollectionNames.skills)
    ),
    workingTypes: toCatalogRecord(
      toCatalogEntries(
        workingTypeEntries,
        portfolioCollectionNames.workingTypes
      )
    ),
    employmentTypes: toCatalogRecord(
      toCatalogEntries(
        employmentTypeEntries,
        portfolioCollectionNames.employmentTypes
      )
    ),
  };
}
