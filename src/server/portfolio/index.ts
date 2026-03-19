import "server-only";

import type {
  PortfolioContent,
  PortfolioPageData,
} from "@/src/features/portfolio/types";
import { getRequiredFirestoreDb } from "@/src/lib/firebase-admin";
import { getAbout } from "@/src/server/portfolio/about";
import { getAwards } from "@/src/server/portfolio/awards";
import { getPortfolioCatalogs } from "@/src/server/portfolio/catalogs";
import { getEducation } from "@/src/server/portfolio/educations";
import { getExperiences } from "@/src/server/portfolio/experiences";
import { getSocialLinks } from "@/src/server/portfolio/social-links";

export {
  getAbout,
  getAwards,
  getEducation,
  getExperiences,
  getPortfolioCatalogs,
  getSocialLinks,
};

export async function getPortfolioPageData(): Promise<PortfolioPageData> {
  const db = getRequiredFirestoreDb();

  const [about, socialLinks, experiences, education, awards, catalogs] =
    await Promise.all([
      getAbout(db),
      getSocialLinks(db),
      getExperiences(db),
      getEducation(db),
      getAwards(db),
      getPortfolioCatalogs(db),
    ]);

  return {
    content: {
      about,
      socialLinks,
      experiences,
      education,
      awards,
    },
    catalogs,
  };
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const { content } = await getPortfolioPageData();
  return content;
}
