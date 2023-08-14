import { DraggableElement } from "@/src/core/components/Draggable";
import Section, { Headline } from "@/src/core/components/Section";

import React, { useEffect, useLayoutEffect, useState } from "react";
import SocialList from "../../SocialList";
import Image from "next/image";
import Text from "@/src/core/components/Text";
import Button from "@/src/core/components/Button";

import {IoIosCopy} from "react-icons/io";
import {FaCheck} from "react-icons/fa";
import {LuMails} from "react-icons/lu";

import { copyText } from "@/src/core/utils/copyText";
import Link from "next/link";

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
              <Button onClick={() => setCopied('ttsk.mesut@gmail.com')} isDisabled={copied !== ""}>
                <span className="copiedIcon">
                  <FaCheck className={`text-green-500 icon tick ${copied !== "" && 'tickAnimation'}`} size={16}/>
                  <IoIosCopy className={`text-gray-600 icon default ${copied !== "" && 'tickAnimationReverse'}`} size={16}/>
                </span>
                Copy Email
              </Button>

              <Link className="button" data-theme = "dark" href={'/contact'} prefetch={true}>
                  <LuMails className={`text-white `} size={16}/>
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
