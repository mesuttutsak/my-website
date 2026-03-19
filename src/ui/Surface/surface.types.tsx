import { ReactNode } from "react";

export interface SurfaceProps {
    children: ReactNode;
    theme?: string;
    id?: string;
    select?: boolean;
    size?: string;
    fit?: boolean;
    inOrder?: boolean;
    customClassname?: string[]
  }