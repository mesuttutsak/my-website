import { Chilanka } from 'next/font/google'
import React from 'react'

const Surface = ({ children, id, select = false }: { children: React.ReactNode, id?: string, select?: boolean }) => {
  return (
    <div className={`surface ${select && 'selectNone'}`} id={id}>{children}</div>
  )
}

export default Surface