import { Chilanka } from 'next/font/google'
import React from 'react'

const Surface = ({ children, id }: { children: React.ReactNode, id?: string }) => {
  return (
    <div className='surface' id={id}>{children}</div>
  )
}

export default Surface