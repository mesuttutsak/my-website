import Navbar from "./Navbar";

import Surface from "@/src/ui/Surface";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Surface customClassname = {[styles.headerWrap]} >
 
          <Navbar />

          {/* <Surface theme="dark" fit size="small">
            Copied
          </Surface> */}
          
      </Surface>
    </header>
  );
};

export default Header;
