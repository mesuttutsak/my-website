import React from 'react';
import { DraggableElement } from '../Draggable';

interface SectionProps {
  children: React.ReactNode,
  id?: string,
  theme?: string,
  draggable?: boolean,
  customClassname?: string[]
}

export const Headline = ({children, } : {children: React.ReactNode}) => (<div className="headline">{children}</div>)

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