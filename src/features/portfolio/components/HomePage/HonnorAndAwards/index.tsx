import { useTranslations } from "next-intl";
import type { PortfolioAward } from "@/src/features/portfolio/types";
import Section, { Headline } from "@/src/ui/Section";
import Surface from "@/src/ui/Surface";
import Text from "@/src/ui/Text";
import styles from "./HonnorAndAwards.module.scss";

interface HonnorAndAwardsSectionProps {
  awards: PortfolioAward[];
}

const HonnorAndAwards = ({ awards }: HonnorAndAwardsSectionProps) => {
  const t = useTranslations("home.sections");

  return (
    <Section customClassname={[styles.awards]} draggable id="honnorAndAwards">
      <Headline>
        <Text tag="h3">{t("awards")}</Text>
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
