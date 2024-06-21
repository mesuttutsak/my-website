export interface ButtonProps {
    children?: React.ReactNode;
    type?: "button" | "submit" | undefined;
    theme?: "light" | "dark" | undefined;
    size?: "small" | "default" | "large" | undefined;
    isDisabled?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
    className?: string[];
}
