import { DraggableElement } from "@/src/core/components/Draggable"
import Section from "@/src/core/components/Section"
import Surface from "@/src/core/components/Surface"
import Image from "next/image"

const Info = () => {
  return (
    <DraggableElement>
        <Section id="info">
            <span className="img">
                <Image src="/images/profile.jpg" alt="profile" width={60} height={60}/>
            </span>
            <span className="content">
                <h1>Mesut Tutsak</h1>
                <h2>Frontend Developer</h2>
            </span>
        </Section>
    </DraggableElement>
  )
}

export default Info