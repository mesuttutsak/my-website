import { navItemProps } from "./navbar.types";

import Text from "@/src/ui/Text";
import Link from "next/link";

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
