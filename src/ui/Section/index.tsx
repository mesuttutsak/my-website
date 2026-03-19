import { ReactNode } from 'react';

import { cn } from "@/src/shared/lib/cn";
import { DraggableElement } from '../Draggable';
import { SectionProps } from './section.types';

export const Headline = ({ children, }: { children: ReactNode }) => (<div className="headline">{children}</div>)

const Section = ({ children, id, draggable, theme = "deafult", customClassname = [] }: SectionProps) => {

  const sectionEl = (
    <section className={cn(...customClassname)} data-theme={theme} id={id}>
      {children}
    </section>
  )

  return (<>
    {draggable ?
      <DraggableElement>
        {sectionEl}
      </DraggableElement> : <>{sectionEl}</>
    }
  </>
  )
}

export default Section
