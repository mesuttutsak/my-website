import { IconType } from "react-icons";

export interface navListProps {
    text: string;
    icon: IconType;
    path: string;
}

export interface navItemProps {
    text: string;
    icon: IconType;
    path: string;
    target?: string;
}