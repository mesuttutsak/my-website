'use client'
import React, { useEffect } from "react";
import { ImSpinner8 } from "react-icons/im";
import { renderClasses } from "../../utils/renderClasses";

import styles from "./button.module.scss";

interface ButtonProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  theme?: "light" | "dark" | undefined;
  size?: "small" | "large" | undefined;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  customClassname?: string[];
}

const Button = ({
  children,
  type = "button",
  theme,
  size,
  isLoading,
  isDisabled = false,
  onClick,
  customClassname = [],
}: ButtonProps) => {

  function accrType(btnType : ButtonProps['type']) {
    let obj;

    if (!btnType) obj = {theme: theme, size: size}
    else if (btnType == 'submit') obj = {theme: "dark", size: "large"}

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
          <ImSpinner8 size="20" color="white" />
        </div>
      )}
    </button>
  );
};

export default Button;
