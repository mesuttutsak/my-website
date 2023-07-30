import SocialItem from "./Item";

import { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

interface SocialListProps {
  icon: IconType;
  text: string | null;
  url: string;
}

const socialList: SocialListProps[] = [
  {icon: FaGithub, text: null, url: 'https://github.com/mesuttutsak'},
  {icon: FaLinkedin, text: null, url: 'https://www.linkedin.com/in/mesut-tutsak-a82a25148/'}
]

const SocialList = () => {
  return (
    <div className="socialList">
      {socialList.map( (e, i) => <SocialItem key={'s_' + i} icon={e?.icon} text={e.text} url={e.url}/>)}
    </div>
  )
}

export default SocialList