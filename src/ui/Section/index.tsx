import type { ReactNode } from "react";
import { LuMove } from "react-icons/lu";

import { cn } from "@/src/shared/lib/cn";
import { DraggableElement } from "@/src/ui/Draggable";
import type { SectionProps } from "./section.types";

export const Headline = ({ children }: { children: ReactNode }) => (
  <div className="headline">{children}</div>
);

const Section = ({
  children,
  id,
  theme = "",
  draggable = false,
  customClassname = [],
}: SectionProps) => {
  const sectionElement = (
    <section className={cn(...customClassname)} data-theme={theme} id={id}>
      {children}
    </section>
  );

  if (draggable) {
    return (
      <DraggableElement>
        <span
          aria-hidden="true"
          className="draggableIndicator"
          data-drag-handle="true"
        >
          <LuMove size={16} />
        </span>
        {sectionElement}
      </DraggableElement>
    );
  }

  return sectionElement;
};

export default Section;
