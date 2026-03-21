import { ReactNode } from "react";

export type SurfaceVariant = "default" | "flat";

export interface SurfaceProps {
    children: ReactNode;
    variant?: SurfaceVariant;
    id?: string;
    select?: boolean;
    size?: string;
    fit?: boolean;
    inOrder?: boolean;
    customClassname?: string[]
  }
