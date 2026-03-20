import { navItemProps } from "./navbar.types";

import { cn } from "@/src/shared/lib/cn";
import Text from "@/src/ui/Text";
import Link from "next/link";
import styles from "../Header.module.scss";

const NavbarItem: React.FC<navItemProps> = ({ text, path, icon: Icon }) => {
  return (
    <li className={cn(styles.navListItem, styles.tooltipParent)}>
      <Link href={path}>
        {Icon && <Icon size={32} />}
      </Link>
      <Text customClassname={[styles.tooltip]}>{text}</Text>
    </li>
  );
};

export default NavbarItem;
