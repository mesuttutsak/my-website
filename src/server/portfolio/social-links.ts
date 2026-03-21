import "server-only";

import type { Firestore } from "firebase-admin/firestore";

import type { AppLocale } from "@/src/i18n/config";
import { resolveLocalizedData } from "@/src/i18n/localized";
import type { PortfolioContent } from "@/src/features/portfolio/types";
import {
  getCollectionEntries,
  mapCollectionData,
} from "@/src/server/shared/firestore-collections";
import { portfolioCollectionNames } from "@/src/server/portfolio/collections";

export async function getSocialLinks(
  db: Firestore,
  locale: AppLocale
): Promise<PortfolioContent["socialLinks"]> {
  const entries = await getCollectionEntries<Record<string, unknown>>(
    db,
    portfolioCollectionNames.socialLinks
  );

  return resolveLocalizedData(
    mapCollectionData(entries),
    locale
  ) as PortfolioContent["socialLinks"];
}
