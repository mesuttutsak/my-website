import Image from "next/image";
import Link from "next/link";

import type { AboutContent, SocialLink } from "@/src/features/portfolio/types";
import SocialList from "../../SocialList";
import CopiedButton from "@/src/ui/Button/CopiedButton";
import Section from "@/src/ui/Section";
import Text from "@/src/ui/Text";

interface AboutProps {
  about: AboutContent;
  socialLinks: SocialLink[];
}

const About = ({ about, socialLinks }: AboutProps) => {
  const aboutElement = (
    <>
      <div className="content">
        <div className="left">
          <div className="top">
            <Text tag="h1">
              {about.name}
            </Text>
            
            <Text fontWeight="medium" color="dark" >
              {about.role}
            </Text>
          </div>

          <div className="middle">
            <Text>
              I&apos;m based in {about.location}. {about.summary}
            </Text>
          </div>

          <div className="bottom">
            <SocialList links={socialLinks} />

            <div className="contact">
              <CopiedButton textToCopy={about.email} />

              <Link className="button dark" href={about.contactHref}>
                  Contact Me
              </Link>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="img">
            <Image
              src={about.profileImageSrc}
              width={190}
              height={190}
              alt={`${about.name} profile`}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Section draggable id="about" theme="light">{aboutElement}</Section>
    </>
  );
};

export default About;
