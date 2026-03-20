import type { PortfolioAward } from "@/src/features/portfolio/types";
import Section, { Headline } from "@/src/ui/Section";
import Surface from "@/src/ui/Surface";
import Text from "@/src/ui/Text";

interface HonnorAndAwardsSectionProps {
  awards: PortfolioAward[];
}

const HonnorAndAwards = ({ awards }: HonnorAndAwardsSectionProps) => {
  return (
    <Section draggable id="honnorAndAwards">
      <Headline>
        <Text tag="h3">Awards</Text>
      </Headline>
      {awards.map((award: PortfolioAward, i) => {
        const { name, degree, title, regulated_by } = award;

        return (
          <Surface key={'exp_' + regulated_by.short_name + name + i}>
            <Text tag="h4">{name}</Text>
            <Text fontSize="sm">{degree} {title && '- ' + title} </Text>
          </Surface>
        )
      })
      }
    </Section>
  );
};

export default HonnorAndAwards;
