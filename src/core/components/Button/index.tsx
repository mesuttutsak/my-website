'use client'
import React, { useEffect } from "react";
import { ImSpinner8 } from "react-icons/im";
import { renderClasses } from "../../utils/renderClasses";
import { log } from "console";

interface ButtonProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | undefined;
  theme?: "light" | "dark" | undefined;
  size?: "small" | "default" | "large" | undefined;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string[];
}

const Button = ({
  children,
  type = "button",
  theme = "light",
  size,
  isLoading,
  isDisabled = false,
  onClick,
  className : customClassname = [],
}: ButtonProps) => {

  function accrType(btnType: ButtonProps['type']) {
    let obj;

    if (!btnType || btnType === 'button') obj = { theme: theme, size: size }
    else if (btnType == 'submit') obj = { theme: "dark", size: "large" }

    return obj;
  }

  return (
    <button
      className={renderClasses([`button`, ...customClassname])}
      type={type}
      data-theme={accrType(type)?.theme}
      data-size={accrType(type)?.size}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {children}

      {isLoading && (
        <div className="loading">
          <ImSpinner8 size="20" color={theme === "light" ? "black" : "white" } />
        </div>
      )}
    </button>
  );
};

export default Button;
