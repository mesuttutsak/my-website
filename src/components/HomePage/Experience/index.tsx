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
    company: "Konzek Teknoloji",
    website: "https://www.konzek.com/",
    skills: ["JavaScript", "React.js", "CSS", "Redux"],
    location: "Istanbul",
    working_type: "On-site",
    periods: [
      {
        title: "Frontend Developer",
        employment_type: "Full Time",
        start_date: "Oct 2023",
        end_date: "Present",
        desc: "",
      },
    ],
  },
  {
    company: "Mallconomy",
    website: "https://mallconomy.com/",
    skills: ["Next.js", "JavaScript", "SASS", "Redux", "React.js"],
    location: "Izmir",
    working_type: "On-site",
    periods: [
      {
        title: "Frontend Developer",
        employment_type: "Full Time",
        start_date: "Dec 2022",
        end_date: "Aug 2023",
        desc: "",
      },
    ],
  },
  {
    company: "Ikona Creative",
    website: "https://ikonacreative.com/",
    skills: ['React', 'JavaScript', 'CSS', 'jQuery', 'Bootstrap', 'HTML5'],
    location: "Izmir",
    working_type: "On-site",
    periods: [
      {
        title: "Frontend Developer",
        employment_type: "Full Time",
        start_date: "Apr",
        end_date: "Nov 2022",
        desc: "",
      },
      {
        title: "Frontend Developer",
        employment_type: "Part Time",
        start_date: "Mar",
        end_date: "Mar 2022",
        desc: "",
      },
      {
        title: "Frontend Developer Intern",
        employment_type: "Intership",
        start_date: "Jan",
        end_date: "Feb 2022",
        desc: "",
      },
    ],
  },
];

const Experience = () => {
  return (
      <Section id="experience" customClassname={['']}>
        <Headline>
          <Text tag="h3">Experience</Text>
        </Headline>
        {experience.map(
          (job: ExperienceProps, i) => (
            <Item key={'j_' + i} data={job} />
          )
        )}
      </Section>
  );
};

export default Experience;
