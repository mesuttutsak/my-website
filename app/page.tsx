import HomePageComponent from "@/src/features/portfolio/components/HomePage";
import { getPortfolioPageData } from "@/src/server/portfolio";

const HomePage = async () => {
  const pageData = await getPortfolioPageData();

  return <HomePageComponent content={pageData.content} catalogs={pageData.catalogs} />;
};

export default HomePage;
