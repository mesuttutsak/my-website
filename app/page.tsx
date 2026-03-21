import { getCurrentLocale } from "@/src/i18n/server";
import HomePageComponent from "@/src/features/portfolio/components/HomePage";
import { getPortfolioPageData } from "@/src/server/portfolio";

const HomePage = async () => {
  const locale = await getCurrentLocale();
  const pageData = await getPortfolioPageData(locale);

  return (
    <HomePageComponent
      catalogs={pageData.catalogs}
      content={pageData.content}
    />
  );
};

export default HomePage;
