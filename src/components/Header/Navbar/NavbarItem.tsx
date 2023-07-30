import Text from "@/src/core/components/Text";
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
    <li className="navListItem tooltipParent">
      <Link href={path}>
        {Icon && <Icon size={32} />}
      </Link>
      <Text customClassname={["tooltip"]}>{text}</Text>
    </li>
  );
};

export default NavbarItem;
