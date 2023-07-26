import NavbarItem from "./NavbarItem";

interface navListProps {
  text: string;
  path: string;
}

const navList: navListProps[] = [
  { text: "about", path: "/#about" },
  { text: "experience", path: "#experience" },
  { text: "projects", path: "#projects" },
];

const Navbar = () => {
  return (
    <nav className="nav">
      <ul className="navList">
        {navList.map(({text, path}, i) => (
          <NavbarItem key={i} text={text} path={path} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
