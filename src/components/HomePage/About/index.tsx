import { DraggableElement } from "@/src/core/components/Draggable";
import Section from "@/src/core/components/Section";

import React from "react";
import SocialList from "../../SocialList";
import Image from "next/image";

const About = () => {
  const aboutElement: React.ReactElement = (
    <>
      <div className="headline">
        <h2>Frontend Developer</h2>
      </div>
      <div className="content">
        <div className="left">
          <h1>Mesut Tutsak</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <SocialList />
        </div>
        
        <div className="right">
          {/* <Image src={'https://api.readyplayer.me/v1/avatars/64c24e9b588332d805c4721f.png'} width={160} height={160} alt="rpm-avatar" /> */}
          <Image
            className="shadow-lg rounded-full bg-slate-50 "
            src={"/images/avatar.png"}
            width={160}
            height={160}
            alt="rpm-avatar"
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      <DraggableElement>
        <Section id="about">{aboutElement}</Section>
      </DraggableElement>
    </>
  );
};

export default About;
