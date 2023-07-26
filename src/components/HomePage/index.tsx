import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";

const HomePageComponent = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <About />
      <Experience />
      <Projects />
    </div>
  );
};

export default HomePageComponent;
