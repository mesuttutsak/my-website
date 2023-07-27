import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";

import Surface from "@/src/core/components/Surface";

const Header = () => {
  return (
    <header>
      <Surface>
        <div className="header">
          {/* <div className="headline">
              <h1>
                <Link href={"/"}>Mesut Tutsak</Link>
              </h1>
              <h2>
                <Link href={"/"}>Frontend Develoepr</Link>
              </h2>
            </div> */}

          <Navbar />

          <Surface theme="dark" fit size="small">
            Copied
          </Surface>

          {/* <SocialList /> */}
        </div>
      </Surface>
    </header>
  );
};

export default Header;
