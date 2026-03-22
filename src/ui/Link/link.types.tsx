import type { LinkProps } from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

export interface LinkPropsUI {
  children?: ReactNode;
  className?: string[];
  href: LinkProps["href"];
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  prefetch?: LinkProps["prefetch"];
  rel?: string;
  replace?: LinkProps["replace"];
  scroll?: LinkProps["scroll"];
  size?: "small" | "default" | "large" | undefined;
  target?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline" | undefined;
}
