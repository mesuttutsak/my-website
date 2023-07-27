import { useEffect } from "react";
import { useRouter } from "next/router";
import NavbarItem from "./NavbarItem";

import { IconType } from "react-icons";
import { VscAccount, VscActivateBreakpoints, VscArchive } from "react-icons/vsc";

interface navListProps {
  text: string;
  icon: IconType;
  path: string;
}

const Navbar = () => {
  const router = useRouter();

  const navList: navListProps[] = [
    { text: "about", icon: VscAccount, path: "/#"  },
    { text: "experience", icon: VscActivateBreakpoints, path: "#experience" },
    { text: "projects", icon: VscArchive, path: "#projects" },
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
