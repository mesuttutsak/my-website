import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";


import Surface from "@/src/core/components/Surface";

const Header = () => {
  return (
      <header className="header">
        <Surface>
            {/* <div className="headline">
              <h1>
                <Link href={"/"}>Mesut Tutsak</Link>
              </h1>
              <h2>
                <Link href={"/"}>Frontend Develoepr</Link>
              </h2>
            </div> */}

            <Navbar />

            {/* <SocialList /> */}
        </Surface>
      </header>
  );
};

export default Header;
