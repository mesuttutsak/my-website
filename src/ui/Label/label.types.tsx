import { ReactNode } from "react";

export interface LabelProps {
    children?: ReactNode,
    htmlFor: string,
    textAlign?: string,
    fontSize?: string,
    fontWeight?: string,
    color?: string,
    customClassname?: string[]
}