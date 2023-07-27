import { useEffect } from "react";
import { useRouter } from "next/router";
import NavbarItem from "./NavbarItem";

import { IconType } from "react-icons";
import { VscAccount } from "react-icons/vsc";
import { BsStars } from "react-icons/bs";
import { SiDocsdotrs } from "react-icons/si";

interface navListProps {
  text: string;
  icon: IconType;
  path: string;
}

const Navbar = () => {
  const router = useRouter();

  const navList: navListProps[] = [
    { text: "about", icon: VscAccount, path: "/#"  },
    { text: "experience", icon: BsStars, path: "#experience" },
    { text: "projects", icon: SiDocsdotrs, path: "#projects" },
  ];

  return (
    <nav className="nav">
      <ul className="navList">
        {navList.map(({text, icon, path}, i) => (
          <NavbarItem key={i} text={text} icon={icon} path={path}  />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
