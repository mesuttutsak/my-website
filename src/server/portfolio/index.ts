import "server-only";

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

export async function getPortfolioPageData(): Promise<PortfolioPageData> {
  const db = getRequiredFirestoreDb();

  const [about, socialLinks, experiences, educations, awards, catalogs] =
    await Promise.all([
      getAbout(db),
      getSocialLinks(db),
      getExperiences(db),
      getEducations(db),
      getAwards(db),
      getPortfolioCatalogs(db),
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

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const { content } = await getPortfolioPageData();
  return content;
}
