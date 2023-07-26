import React, { ReactNode } from 'react'

import { IconType } from "react-icons";

interface SocialItemProps {
  icon?: IconType;
  text?: string | null;
}

const SocialItem: React.FC<SocialItemProps> = ({
    text,
    icon: Icon
}) => {
    
    
  return (
    <div className='flex flex-row gap-2 items-center'>
        {Icon && <Icon size={25} />}
        {text && text}
    </div>
  )
}

export default SocialItem