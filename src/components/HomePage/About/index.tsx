import { DraggableElement } from "@/src/core/components/Draggable";
import Section, { Headline } from "@/src/core/components/Section";

import React from "react";
import SocialList from "../../SocialList";
import Image from "next/image";
import Text from "@/src/core/components/Text";

const About = () => {
  const aboutElement: React.ReactElement = (
    <>
      <div className="content">
        <div className="left">
          <div className="top">
            <Text tag="h1">
              Mesut Tutsak
            </Text>
            <Text fontWeight="medium" color="dark" >
              Frontend Developer
            </Text>
          </div>

          <div className="middle">
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
          </div>

          <div className="bottom">
            <SocialList />
            {/* <Badge text={'Email'} /> */}
          </div>
        </div>

        <div className="right">
          <div className="img">
            <Image
              src={"/images/profile.jpg"}
              width={190}
              height={190}
              alt="profile"
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Section id="about" theme="light" >{aboutElement}</Section>
    </>
  );
};

export default About;
