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
    <li className="navbarListItem tooltipParent">
      <Link href={path}>
        {Icon && <Icon size={40} fill={`fill-amber-600`} />}
      </Link>
      <span className="tooltip">{text}</span>
    </li>
  );
};

export default NavbarItem;
