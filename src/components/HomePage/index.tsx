import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";

const HomePageComponent = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <About />
      at Mallconomy.
      <br /> <br /> <br />
      Experience <br />
      <br />
      <Experience />
      Projects <br />
      <br />
      <Projects />
    </div>
  );
};

export default HomePageComponent;
