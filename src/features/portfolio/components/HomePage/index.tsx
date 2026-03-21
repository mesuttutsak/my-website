import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import HonnorAndAwards from "./HonnorAndAwards";
import type { ExperienceCatalogs } from "@/src/features/portfolio/catalogs";
import type { PortfolioContent } from "@/src/features/portfolio/types";
import Surface from "@/src/ui/Surface";
import styles from "./HomePage.module.scss";

const HomePageComponent = ({
  content,
  catalogs,
}: {
  content: PortfolioContent;
  catalogs: ExperienceCatalogs;
}) => {
  return (
    <div className={styles.homePage}>
      <Surface customClassname={[styles.homePageSurface]} id="homePage">
        <About
          about={content.about}
          socialLinks={content.socialLinks}
        />
        <Experience catalogs={catalogs} items={content.experiences} />
        <HonnorAndAwards awards={content.awards} />
        <Education educations={content.educations} />
      </Surface>
    </div>
  );
};

export default HomePageComponent;
