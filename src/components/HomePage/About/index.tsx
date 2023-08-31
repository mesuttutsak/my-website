import { DraggableElement } from "@/src/core/components/Draggable";
import Section, { Headline } from "@/src/core/components/Section";

import React, { useLayoutEffect, useState } from "react";
import SocialList from "../../SocialList";
import Image from "next/image";
import Text from "@/src/core/components/Text";
import Button from "@/src/core/components/Button";

import {FaCheck} from "react-icons/fa";
import {LuMails} from "react-icons/lu";

import { copyText } from "@/src/core/utils/copyText";
import Link from "next/link";
import CopiedButton from "@/src/core/components/Button/CopiedButton";

const About = () => {

  const [copied, setCopied] = useState('')

  useLayoutEffect(() => {
    if (copied !== '') {
      copyText(copied)
      setTimeout(() => {
        setCopied('');
      }, 2000);
    }
  }, [copied])

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
              I&apos;m live in Izmir and Istanbul. I was formerly Interior Architect becomes Frontend Developer now.
            </Text>
          </div>

          <div className="bottom">
            <SocialList />

            <div className="contact">
              <CopiedButton />

              <Link className="button dark" href={'/contact'}>
                  Contact Me
              </Link>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="img">
            <Image
              src={"/images/profile.jpg"}
              width={190}
              height={190}
              alt="profile"
              priority
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
