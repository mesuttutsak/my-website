import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";

import Surface from "@/src/core/components/Surface";

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
