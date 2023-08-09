import React from "react";
import { ImSpinner8 } from "react-icons/im";
import { renderClasses } from "../../utils/renderClasses";

interface ButtonProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  customClassname?: string[];
}

const Button = ({
  children,
  type = "button",
  isLoading,
  isDisabled = false,
  onClick,
  customClassname = []
}: ButtonProps) => {
  return (
    <button
      className={renderClasses([`button`, ...customClassname])}
      type={type}
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
