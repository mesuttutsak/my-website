import { ReactNode } from "react";

export interface SectionProps {
    children: ReactNode,
    id?: string,
    theme?: string,
    draggable?: boolean,
    customClassname?: string[]
}