'use client'
import { ImSpinner8 } from "react-icons/im";

import { cn } from "@/src/shared/lib/cn";
import type { ButtonProps } from "./button.types";
import styles from "./Button.module.scss";

const Button = ({
  children,
  type = "button",
  theme = "light",
  size,
  isLoading,
  isDisabled = false,
  onClick,
  className = [],
}: ButtonProps) => {

  function accrType(btnType: ButtonProps['type']) {
    let obj;

    if (!btnType || btnType === 'button') obj = { theme: theme, size: size }
    else if (btnType == 'submit') obj = { theme: "dark", size: "large" }

    return obj;
  }

  return (
    <button
      className={cn(styles.button, ...className)}
      type={type}
      data-theme={accrType(type)?.theme}
      data-size={accrType(type)?.size}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {children}

      {isLoading && (
        <div className={styles.loading}>
          <ImSpinner8 size="20" color={theme === "light" ? "black" : "white" } />
        </div>
      )}
    </button>
  );
};

export default Button;
