import { ReactNode } from "react";

export type SectionVariant = "default" | "flat";

export interface SectionProps {
  children: ReactNode;
  id?: string;
  variant?: SectionVariant;
  draggable?: boolean;
  customClassname?: string[];
}
