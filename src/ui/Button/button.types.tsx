import type { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
    children?: ReactNode;
    type?: "button" | "submit" | undefined;
    theme?: "light" | "dark" | undefined;
    size?: "small" | "default" | "large" | undefined;
    isDisabled?: boolean;
    isLoading?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string[];
}
