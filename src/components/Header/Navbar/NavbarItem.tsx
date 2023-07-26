import Link from "next/link";

interface navItemProps {
  text: string;
  path: string;
  target?: string;
}

const NavbarItem: React.FC<navItemProps> = ({ text, path }) => {
  return (
    <li className="navbarListItem">
      <Link href={path}>{text}</Link>
    </li>
  );
};

export default NavbarItem;
