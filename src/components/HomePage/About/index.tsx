import DraggableProvider, { DraggableElement } from "@/src/core/components/Draggable";
import Section from "@/src/core/components/Section";
import Surface from "@/src/core/components/Surface";
import React from "react";

const About = () => {
  const aboutElement: React.ReactElement = (
    <>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry&apos;s standard dummy text ever since
      the 1500s, when an unknown printer took a galley of type and scrambled it
      to make a type <span>specimen book.</span> It has survived not only five
      centuries, but also the l
    </>
  );

  return <>
      <DraggableElement>
        <Section id="about" >
          {aboutElement}
        </Section>
      </DraggableElement>
  </>;
};

export default About;
