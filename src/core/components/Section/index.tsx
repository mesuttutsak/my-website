import React from 'react'

const Section = ({children, id}: { children: React.ReactNode, id?: string }) => {
  return (
    <section id={id}>{children}</section>
  )
}

export default Section