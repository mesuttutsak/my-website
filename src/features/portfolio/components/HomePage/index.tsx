import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import HonnorAndAwards from "./HonnorAndAwards";
import type { ExperienceCatalogs } from "@/src/features/portfolio/catalogs";
import type { PortfolioContent } from "@/src/features/portfolio/types";
import Surface from "@/src/ui/Surface";

const HomePageComponent = ({
  content,
  catalogs,
}: {
  content: PortfolioContent;
  catalogs: ExperienceCatalogs;
}) => {
  return (
    <div className="homePage">
      <Surface id="homePage">
        <About about={content.about} socialLinks={content.socialLinks} />
        <Experience items={content.experiences} catalogs={catalogs} />
        <HonnorAndAwards awards={content.awards} />
        <Education educations={content.educations} />
      </Surface>
    </div>
  );
};

export default HomePageComponent;
