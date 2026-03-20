import SocialItem from "./Item";

import { SocialListProps } from "./socialList.types";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./SocialList.module.scss";

const socialIconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
};

const SocialList = ({ links }: SocialListProps) => {
  return (
    <div className={styles.socialList}>
      {links.map((link, i) => (
        <SocialItem
          key={"s_" + link.platform + i}
          icon={socialIconMap[link.platform as keyof typeof socialIconMap]}
          text={link.text ?? null}
          url={link.url}
        />
      ))}
    </div>
  )
}

export default SocialList
