import Item from "./Item";
import type { ExperienceCatalogs } from "@/src/features/portfolio/catalogs";
import type { ExperienceItem } from "@/src/features/portfolio/types";
import Section, { Headline } from "@/src/ui/Section";
import Text from "@/src/ui/Text";
import styles from "./Experience.module.scss";
interface ExperienceSectionProps {
  items: ExperienceItem[];
  catalogs: ExperienceCatalogs;
}

const Experience = ({ items, catalogs }: ExperienceSectionProps) => {
  return (
      <Section customClassname={[styles.experience]} draggable id="experience">
        <Headline>
          <Text tag="h3">Experience</Text>
        </Headline>
        {items.map(
          (job: ExperienceItem, i) => (
            <Item key={'j_' + i} data={job} catalogs={catalogs} />
          )
        )}
      </Section>
  );
};

export default Experience;
