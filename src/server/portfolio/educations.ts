import "server-only";

import type { Firestore } from "firebase-admin/firestore";

import type { AppLocale } from "@/src/i18n/config";
import { resolveLocalizedData } from "@/src/i18n/localized";
import type { PortfolioContent } from "@/src/features/portfolio/types";
import {
  getCollectionEntries,
  requireSingleEntry,
  stripCollectionMeta,
} from "@/src/server/shared/firestore-collections";
import { portfolioCollectionNames } from "@/src/server/portfolio/collections";

export async function getEducations(
  db: Firestore,
  locale: AppLocale
): Promise<PortfolioContent["educations"]> {
  const entries = await getCollectionEntries<Record<string, unknown>>(
    db,
    portfolioCollectionNames.educations
  );

  return resolveLocalizedData(
    stripCollectionMeta(
      requireSingleEntry(entries, portfolioCollectionNames.educations)
    ),
    locale
  ) as PortfolioContent["educations"];
}
