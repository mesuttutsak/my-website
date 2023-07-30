import Section, { Headline } from "@/src/core/components/Section";
import Item from "./Item";
import Text from "@/src/core/components/Text";

interface ExperiencePeriod {
  title: string;
  employment_type: "Part Time" | "Full Time" | "Intership";
  start_date: string;
  end_date?: string;
  desc: string;
}

interface ExperienceProps {
  company: string;
  website: string;
  skills: string[];
  location: string;
  working_type: "On-site" | "Remote" | "Hybrid";
  periods: ExperiencePeriod[];
}

const experience: ExperienceProps[] = [
  {
    company: "Mallconomy",
    website: "https://mallconomy.com/",
    skills: ["Next.js", "JavaScript", "SASS", "Redux", "React.js"],
    location: "İzmir",
    working_type: "On-site",
    periods: [
      {
        title: "Frontend Developer",
        employment_type: "Full Time",
        start_date: "2022-02",
        end_date: "2022-02",
        desc: "",
      },
    ],
  },
  {
    company: "Ikona Creative",
    website: "https://ikonacreative.com/",
    skills: ['React', 'JavaScript', 'CSS', 'jQuery', 'Bootstrap', 'HTML5'],
    location: "İzmir",
    working_type: "On-site",
    periods: [
      {
        title: "Frontend Developer",
        employment_type: "Full Time",
        start_date: "2022-02",
        end_date: "2022-02",
        desc: "",
      },
      {
        title: "Frontend Developer",
        employment_type: "Part Time",
        start_date: "2022-02",
        end_date: "2022-02",
        desc: "",
      },
      {
        title: "Frontend Developer Intern",
        employment_type: "Intership",
        start_date: "2022-01",
        end_date: "2022-02",
        desc: "",
      },
    ],
  },
];

const Experience = () => {
  return (
      <Section id="experience" customClassname={['flex flex-col gap-4']}>
        <Headline>
          <Text tag="h3">Experience</Text>
        </Headline>
        {experience.map(
          (job: ExperienceProps) => (
            <Item data={job} />
          )
        )}
      </Section>
  );
};

export default Experience;
