import React from 'react';

interface ButtonProps {
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

const Button = ({children, disabled = false, onClick}: ButtonProps) => {
  return (
    <button className='button' onClick={onClick} disabled={disabled}>
        {children}
    </button>
  )
}

export default Button