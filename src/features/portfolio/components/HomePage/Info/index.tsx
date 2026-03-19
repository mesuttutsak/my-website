import { DraggableElement } from "@/src/ui/Draggable";
import Section from "@/src/ui/Section";
import Image from "next/image";

const Info = () => {
  return (
    <DraggableElement>
      <Section id="info">
        <span className="img">
          <Image
            src="/images/profile.jpg"
            alt="profile"
            width={60}
            height={60}
          />
        </span>
        <span className="content">
          <h1>Mesut Tutsak</h1>
          <h2>Frontend Developer</h2>
        </span>
      </Section>
    </DraggableElement>
  );
};

export default Info;
