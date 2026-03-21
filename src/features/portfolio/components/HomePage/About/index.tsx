import Image from "next/image";
import Link from "next/link";

import type { AboutContent, SocialLink } from "@/src/features/portfolio/types";
import SocialList from "../../SocialList";
import { cn } from "@/src/shared/lib/cn";
import CopiedButton from "@/src/ui/Button/CopiedButton";
import Section from "@/src/ui/Section";
import Text from "@/src/ui/Text";
import buttonStyles from "@/src/ui/Button/Button.module.scss";
import styles from "./About.module.scss";

interface AboutProps {
  about: AboutContent;
  socialLinks: SocialLink[];
}

const About = ({ about, socialLinks }: AboutProps) => {
  const aboutElement = (
    <>
      <div className={styles.content}>
        <div className={styles.left}>
          <div>
            <Text tag="h1">
              {about.name}
            </Text>
            
            <Text fontWeight="medium" color="dark" >
              {about.role}
            </Text>
          </div>

          <div>
            <Text>
              I&apos;m based in {about.location}. {about.summary}
            </Text>
          </div>

          <div className={styles.bottom}>
            <SocialList links={socialLinks} />

            <div className={styles.contact}>
              <CopiedButton textToCopy={about.email} />

              <Link
                className={cn(buttonStyles.button, buttonStyles.primary)}
                href={about.contactHref}
              >
                  Contact Me
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.img}>
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
      <Section customClassname={[styles.about]} draggable id="about" variant="flat">{aboutElement}</Section>
    </>
  );
};

export default About;
