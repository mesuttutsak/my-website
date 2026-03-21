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

export async function getAbout(
  db: Firestore,
  locale: AppLocale
): Promise<PortfolioContent["about"]> {
  const entries = await getCollectionEntries<Record<string, unknown>>(
    db,
    portfolioCollectionNames.about
  );

  return resolveLocalizedData(
    stripCollectionMeta(requireSingleEntry(entries, portfolioCollectionNames.about)),
    locale
  ) as PortfolioContent["about"];
}
