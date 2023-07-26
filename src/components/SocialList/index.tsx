import SocialItem from "./Item";

import { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

interface SocialListProps {
  icon: IconType;
  text: string | null;
}

const socialList: SocialListProps[] = [
  {icon: FaGithub, text: null},
  {icon: FaLinkedin, text: null},
  {icon: FaInstagram , text: null},
  {icon: FaTwitter, text: null},
]

const SocialList = () => {
  return (
    <div className="socialList">
      {socialList.map( (e, i) => <SocialItem key={i} icon={e?.icon} text={e.text}/>)}
    </div>
  )
}

export default SocialList