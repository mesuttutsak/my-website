'use client'
import { ReactNode } from "react";
import Surface from "@/src/core/components/Surface";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import HonnorAndAwards from "./HonnorAndAwards";

const HomePageComponent = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="homePage">
      <Surface id="homePage">
        <About />
        <Experience />
        <HonnorAndAwards />
        <Education />
      </Surface>
    </div>
  );
};

export default HomePageComponent;
