import Navbar from "./Navbar";

import Surface from "@/src/ui/Surface";

const Header = () => {
  return (
    <header>
      <Surface customClassname = {['headerWrap']} >
 
          <Navbar />

          {/* <Surface theme="dark" fit size="small">
            Copied
          </Surface> */}
          
      </Surface>
    </header>
  );
};

export default Header;
