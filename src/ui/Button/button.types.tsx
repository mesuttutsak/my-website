import type { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline" | undefined;
  size?: "small" | "default" | "large" | undefined;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string[];
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
}
