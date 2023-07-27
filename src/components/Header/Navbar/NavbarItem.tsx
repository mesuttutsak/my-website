import Link from "next/link";
import { IconType } from "react-icons";

interface navItemProps {
  text: string;
  icon: IconType;
  path: string;
  target?: string;
}

const NavbarItem: React.FC<navItemProps> = ({ text, path, icon: Icon }) => {
  return (
    <li className="navbarListItem">
      <Link href={path}>
        {Icon && <Icon size={25} />}
      </Link>
      <span className="tooltip">{text}</span>
    </li>
  );
};

export default NavbarItem;
