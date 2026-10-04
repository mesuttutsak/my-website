import Link from 'next/link';
import React from 'react'

import { SocialItemProps } from './socialList.types';

const SocialItem: React.FC<SocialItemProps> = ({
    url = "",
    text,
    label,
    icon: Icon
}) => {
    
    
  return (
    <Link
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={text ? undefined : label}
        className='flex flex-row gap-2 items-center'
    >
        {Icon && <Icon size={25} aria-hidden />}
        {text && text}
    </Link>
  )
}

export default SocialItem