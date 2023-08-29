'use client'
import Surface from "@/src/core/components/Surface";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import HonnorAndAwards from "./HonnorAndAwards";
import CopiedButton from "@/src/core/components/Button/CopiedButton";

const HomePageComponent = ({ children }: { children?: React.ReactNode }) => {
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
