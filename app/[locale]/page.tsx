import { setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/src/i18n/config";
import HomePageComponent from "@/src/features/portfolio/components/HomePage";
import { getPortfolioPageData } from "@/src/server/portfolio";
import { siteUrl } from "@/src/server/site-config";

// Firestore content is baked in at build time and refreshed at most hourly.
// Use /api/revalidate for an immediate refresh after editing content.
export const revalidate = 3600;

const HomePage = async ({ params }: { params: { locale: AppLocale } }) => {
  const { locale } = params;
  setRequestLocale(locale);

  const pageData = await getPortfolioPageData(locale);
  const { about, socialLinks } = pageData.content;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: about.name,
    jobTitle: about.role,
    url: siteUrl,
    sameAs: socialLinks.map(({ url }) => url),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomePageComponent
        catalogs={pageData.catalogs}
        content={pageData.content}
      />
    </>
  );
};

export default HomePage;
