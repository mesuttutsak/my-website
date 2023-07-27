import DraggableProivder, {
  DraggableElement,
} from "@/src/core/components/Draggable";
import Section from "@/src/core/components/Section";
import Surface from "@/src/core/components/Surface";
import React from "react";

interface ProjectsProps {
  name: string;
  title: string;
  start_date: string;
  end_date: string;
  skills: string[];
}

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
    <DraggableElement>
      <Section id="projects">
        <h3>Projects</h3>
        {projects.map(
          ({ name, title, start_date, end_date, skills }: ProjectsProps, i) => (
            <>
              <p>{name}</p>
              <p>{title}</p>
              <p>{start_date}</p>
              <p>{end_date}</p>
              <p>{skills.join(" · ")}</p>
            </>
          )
        )}
      </Section>
    </DraggableElement>
  );
};

export default Projects;
