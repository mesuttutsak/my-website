import { ProjectsProps } from "./projects.types";

import Section from "@/src/ui/Section";


const projects: ProjectsProps[] = [
  {
    name: "KKTC Merkez Bankası Ulusal Mimari Yarışma Projesi",
    title: "Proje Asistanı",
    start_date: "2020-01",
    end_date: "2020-01",
    skills: [],
  },
  {
    name: "",
    title: "",
    start_date: "",
    end_date: "",
    skills: [],
  },
  {
    name: "",
    title: "",
    start_date: "",
    end_date: "",
    skills: [],
  },
];

const Projects = () => {
  return (
      <Section id="projects" draggable>
        <h3>Projects</h3>
        {projects.map(
          ({ name, title, start_date, end_date, skills }: ProjectsProps, i) => (
            <div key={'project_' + i}>
              <p>{name}</p>
              <p>{title}</p>
              <p>{start_date}</p>
              <p>{end_date}</p>
              <p>{skills.join(" · ")}</p>
            </div>
          )
        )}
      </Section>
  );
};

export default Projects;
