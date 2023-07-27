import Surface from "@/src/core/components/Surface";
import About from "./About";
import Experience from "./Experience";
import Info from "./Info";
import Projects from "./Projects";

const HomePageComponent = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="homePage">
      <Surface id="homePage">
        <About />
        <Experience />
        <Projects />
      </Surface>
    </div>
  );
};

export default HomePageComponent;
