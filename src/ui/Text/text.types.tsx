import { ReactNode } from "react"

export interface TextProps {
    children: ReactNode,
    tag?: string,
    textAlign?: string,
    fontSize?: string,
    fontWeight?: string,
    color?: string,
    customClassname?: string[]
}