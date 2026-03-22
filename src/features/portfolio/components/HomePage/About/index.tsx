import Image from "next/image";
import { useTranslations } from "next-intl";

import type { AboutContent, SocialLink } from "@/src/features/portfolio/types";
import SocialList from "../../SocialList";
import CopiedButton from "@/src/ui/Button/CopiedButton";
import Link from "@/src/ui/Link";
import Section from "@/src/ui/Section";
import Text from "@/src/ui/Text";
import styles from "./About.module.scss";

interface AboutProps {
  about: AboutContent;
  socialLinks: SocialLink[];
}

const About = ({
  about,
  socialLinks,
}: AboutProps) => {
  const t = useTranslations("home.about");
  const summaryText = t("summary", {
    location: about.location,
    summary: about.summary,
  });

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
              {summaryText}
            </Text>
          </div>

          <div className={styles.bottom}>
            <SocialList links={socialLinks} />

            <div className={styles.contact}>
              <CopiedButton
                copiedLabel={t("copiedEmail")}
                copyLabel={t("copyEmail")}
                textToCopy={about.email}
              />

              <Link href={about.contactHref}>
                {t("contactMe")}
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
              alt={`${about.name} ${t("profileAltSuffix")}`}
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
