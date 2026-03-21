import type { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
    children?: ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
    variant?: "primary" | "secondary" | "ghost" | "outline" | undefined;
    size?: "small" | "default" | "large" | undefined;
    isDisabled?: boolean;
    isLoading?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string[];
}
