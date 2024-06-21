import { ReactNode } from 'react';
import { DraggableElement } from '../Draggable';
import { SectionProps } from './section.types';

export const Headline = ({ children, }: { children: ReactNode }) => (<div className="headline">{children}</div>)

const Section = ({ children, id, draggable, theme = "deafult", customClassname = [] }: SectionProps) => {

  const sectionEl = (
    <section className={`${customClassname?.length > 0 && customClassname.map(e => e).join(' ')}`} data-theme={theme} id={id}>
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