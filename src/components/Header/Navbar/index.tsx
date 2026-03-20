import { navListProps } from "./navbar.types";

import NavbarItem from "./NavbarItem";

import { VscAccount } from "react-icons/vsc";
import { BsStars } from "react-icons/bs";
import { SiDocsdotrs } from "react-icons/si";
import styles from "../Header.module.scss";

const Navbar = () => {
  const navList: navListProps[] = [
    { text: "about", icon: VscAccount, path: "/#"  },
    { text: "experience", icon: BsStars, path: "#experience" },
    { text: "projects", icon: SiDocsdotrs, path: "#projects" },
  ];

  return (
    <nav>
      <ul className={styles.navList}>
        {navList.map(({text, icon, path}, i) => (
          <NavbarItem key={'nav_' + i} text={text} icon={icon} path={path}  />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
