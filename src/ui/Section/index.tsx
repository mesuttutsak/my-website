import type { ReactNode } from "react";
import { LuMove } from "react-icons/lu";

import { cn } from "@/src/shared/lib/cn";
import { DraggableElement } from "@/src/ui/Draggable";
import draggableStyles from "@/src/ui/Draggable/Draggable.module.scss";
import styles from "./Section.module.scss";
import type { SectionProps } from "./section.types";

export const Headline = ({ children }: { children: ReactNode }) => (
  <div className={styles.headline}>{children}</div>
);

const Section = ({
  children,
  id,
  theme = "",
  draggable = false,
  customClassname = [],
}: SectionProps) => {
  const sectionElement = (
    <section
      className={cn(
        styles.section,
        theme === "light" && styles.lightTheme,
        theme && theme !== "light" && theme,
        ...customClassname
      )}
      data-theme={theme}
      id={id}
    >
      {children}
    </section>
  );

  if (draggable) {
    return (
      <DraggableElement storageKey={id}>
        <span
          aria-hidden="true"
          className={draggableStyles.draggableIndicator}
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
