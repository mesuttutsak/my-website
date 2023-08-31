import React from 'react'

import Surface from '../Surface';
import { RiLoader4Line } from "react-icons/ri";

const PageLoading = () => {
  return (
    <Surface customClassname={['loadingContainer']}>
      <RiLoader4Line size={60} />
    </Surface>
  )
}

export default PageLoading