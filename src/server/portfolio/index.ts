import "server-only";

import type { AppLocale } from "@/src/i18n/config";
import { defaultAppLocale } from "@/src/i18n/config";
import type {
  PortfolioContent,
  PortfolioPageData,
} from "@/src/features/portfolio/types";
import { getRequiredFirestoreDb } from "@/src/lib/firebase-admin";
import { getAbout } from "@/src/server/portfolio/about";
import { getAwards } from "@/src/server/portfolio/awards";
import { getPortfolioCatalogs } from "@/src/server/portfolio/catalogs";
import { getEducations } from "@/src/server/portfolio/educations";
import { getExperiences } from "@/src/server/portfolio/experiences";
import { getSocialLinks } from "@/src/server/portfolio/social-links";

export {
  getAbout,
  getAwards,
  getEducations,
  getExperiences,
  getPortfolioCatalogs,
  getSocialLinks,
};

export async function getPortfolioPageData(
  locale: AppLocale = defaultAppLocale
): Promise<PortfolioPageData> {
  const db = getRequiredFirestoreDb();

  const [about, socialLinks, experiences, educations, awards, catalogs] =
    await Promise.all([
      getAbout(db, locale),
      getSocialLinks(db, locale),
      getExperiences(db, locale),
      getEducations(db, locale),
      getAwards(db, locale),
      getPortfolioCatalogs(db, locale),
    ]);

  return {
    content: {
      about,
      socialLinks,
      experiences,
      educations,
      awards,
    },
    catalogs,
  };
}

export async function getPortfolioContent(
  locale: AppLocale = defaultAppLocale
): Promise<PortfolioContent> {
  const { content } = await getPortfolioPageData(locale);
  return content;
}
