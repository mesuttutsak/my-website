import Link from 'next/link';
import React, { ReactNode } from 'react'

import { IconType } from "react-icons";

interface SocialItemProps {
  url?: string
  icon?: IconType;
  text?: string | null;
}

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