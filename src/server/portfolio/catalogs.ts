import "server-only";

import type { Firestore } from "firebase-admin/firestore";

import type { AppLocale } from "@/src/i18n/config";
import { resolveLocalizedData } from "@/src/i18n/localized";
import type { PortfolioPageData } from "@/src/features/portfolio/types";
import { toCatalogRecord } from "@/src/features/portfolio/catalogs";
import {
  type CollectionEntry,
  getCollectionEntries,
} from "@/src/server/shared/firestore-collections";
import { portfolioCollectionNames } from "@/src/server/portfolio/collections";

type CatalogEntry = CollectionEntry<Record<string, unknown>>;
type CatalogLabelEntry = { id: string; label: string };

function hasStringLabel(entry: CatalogEntry): entry is CatalogEntry & CatalogLabelEntry {
  return typeof entry.label === "string";
}

function toCatalogEntries(entries: CatalogEntry[], collectionName: string) {
  if (entries.length === 0) {
    throw new Error(`Collection '${collectionName}' is empty in Firestore.`);
  }

  const catalogEntries = entries
    .filter(hasStringLabel)
    .map(({ id, label }) => ({ id, label }));

  if (catalogEntries.length === 0) {
    throw new Error(
      `Collection '${collectionName}' must contain at least one document with a string label.`
    );
  }

  return catalogEntries;
}

export async function getPortfolioCatalogs(
  db: Firestore,
  locale: AppLocale
): Promise<PortfolioPageData["catalogs"]> {
  const [skillEntries, workingTypeEntries, employmentTypeEntries] = await Promise.all([
    getCollectionEntries<Record<string, unknown>>(db, portfolioCollectionNames.skills),
    getCollectionEntries<Record<string, unknown>>(
      db,
      portfolioCollectionNames.workingTypes
    ),
    getCollectionEntries<Record<string, unknown>>(
      db,
      portfolioCollectionNames.employmentTypes
    ),
  ]);
  const resolvedSkillEntries = resolveLocalizedData(skillEntries, locale) as CatalogEntry[];
  const resolvedWorkingTypeEntries = resolveLocalizedData(
    workingTypeEntries,
    locale
  ) as CatalogEntry[];
  const resolvedEmploymentTypeEntries = resolveLocalizedData(
    employmentTypeEntries,
    locale
  ) as CatalogEntry[];

  return {
    skills: toCatalogRecord(
      toCatalogEntries(resolvedSkillEntries, portfolioCollectionNames.skills)
    ),
    workingTypes: toCatalogRecord(
      toCatalogEntries(
        resolvedWorkingTypeEntries,
        portfolioCollectionNames.workingTypes
      )
    ),
    employmentTypes: toCatalogRecord(
      toCatalogEntries(
        resolvedEmploymentTypeEntries,
        portfolioCollectionNames.employmentTypes
      )
    ),
  };
}
