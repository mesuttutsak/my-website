import DraggableProivder, {
  DraggableElement,
} from "@/src/core/components/Draggable";
import Section, { Headline } from "@/src/core/components/Section";
import Surface from "@/src/core/components/Surface";
import Text from "@/src/core/components/Text";
import Link from "next/link";
import React from "react";

interface RegulatedByProps {
  short_name: string;
  regulated_by_name: string;
  url: string;
}

interface HonnorAndAwardsProps {
  name: string;
  regulated_by: RegulatedByProps;
  degree: string;
  title?: string | null;
}

const experience: HonnorAndAwardsProps[] = [
  {
    name: 'CIU GSTMF “Atilla Yücel Sketch Competition”',
    regulated_by: { short_name: 'CIU', regulated_by_name: 'Cyprus Internatıonal Unıversity', url: 'https://www.ciu.edu.tr/en' },
    degree: "Mention Award",
    title: null,
  },
  {
    name: "TRNC Central Bank National Architectural Project Competition",
    regulated_by: { short_name: 'KTMMOB', regulated_by_name: 'Kıbrıs Türk Mühendis ve Mimar Odaları Birliği', url: 'https://ktmmob.org/' },
    degree: "Mention Award",
    title: 'Project Assistant',
  },
];

const HonnorAndAwards = () => {
  return (
    <Section id="honnorAndAwards" customClassname={['flex flex-col gap-4']}>
      <Headline>
        <Text tag="h3">Awards</Text>
      </Headline>
      {experience.map((award: HonnorAndAwardsProps, i) => {
        const { name, degree, title, regulated_by } = award;
        const { short_name, regulated_by_name, url } = regulated_by;

        return (
          <Surface key={'exp_' + regulated_by} customClassname={['flex flex-col']}>
            <Text tag="h4" customClassname={['mb-1']} >{name}</Text>
            <Text>{degree} {title && '- ' + title} </Text>
            {/* <Link href={url} target={'_blank'}>Regulated by : {short_name}</Link> */}
          </Surface>
        )
      })
      }
    </Section>
  );
};

export default HonnorAndAwards;
