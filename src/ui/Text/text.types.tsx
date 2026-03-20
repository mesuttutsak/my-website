import type { ElementType, ReactNode } from "react";

export interface TextProps {
  children: ReactNode;
  tag?: ElementType;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  customClassname?: string[];
}
