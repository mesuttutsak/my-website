import Surface from "@/src/core/components/Surface";
import { useEffect } from "react";

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
        start_date: "2022-02-4",
        end_date: "2022-02-12",
        desc: "",
      },
    ],
  },
  {
    company: "Ikona Creative",
    website: "https://ikonacreative.com/",
    skills: [],
    location: "İzmir",
    working_type: "On-site",
    periods: [
      {
        title: "Frontend Developer",
        employment_type: "Full Time",
        start_date: "2022-02-4",
        end_date: "2022-02-12",
        desc: "",
      },
      {
        title: "Frontend Developer",
        employment_type: "Part Time",
        start_date: "2022-02-3",
        end_date: "2022-02-3",
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
    <Surface id="experience">
      <h3>Experience</h3>
      {experience.map(
        ({
          company,
          website,
          skills,
          location,
          working_type,
          periods,
        }: ExperienceProps) => (
          <>
            <p>
              {company} <br />
              {website} <br />
              {skills.join(" · ")} <br />
              {location}
            </p>
            <hr />
            {periods.map(
              ({
                title,
                employment_type,
                start_date,
                end_date,
                desc,
              }: ExperiencePeriod) => (
                <>
                  {title} <br />
                  {employment_type} <br />
                  {start_date} {end_date} <br />
                  {desc} <br />
                </>
              )
            )}
          </>
        )
      )}
    </Surface>
  );
};

export default Experience;
