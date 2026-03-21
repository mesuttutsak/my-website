'use client'
import { ImSpinner8 } from "react-icons/im";

import { cn } from "@/src/shared/lib/cn";
import type { ButtonProps } from "./button.types";
import styles from "./Button.module.scss";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size,
  isLoading,
  isDisabled = false,
  onClick,
  className = [],
}: ButtonProps) => {
  return (
    <button
      className={cn(styles.button, ...className)}
      type={type}
      data-size={size}
      data-variant={variant}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {children}

      {isLoading && (
        <div className={styles.loading}>
          <ImSpinner8 className={styles.spinner} size={20} />
        </div>
      )}
    </button>
  );
};

export default Button;
