import Link from 'next/link';
import React from 'react'

import { SocialItemProps } from './socialList.types';

const SocialItem: React.FC<SocialItemProps> = ({
    url = "",
    text,
    icon: Icon
}) => {
    
    
  return (
    <Link href={url} target='_blank' className='flex flex-row gap-2 items-center'>
        {Icon && <Icon size={25} />}
        {text && text}
    </Link>
  )
}

export default SocialItem