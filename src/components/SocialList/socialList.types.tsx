import { IconType } from "react-icons";

export interface SocialListProps {
    icon: IconType;
    text: string | null;
    url: string;
}

export interface SocialItemProps {
    url?: string
    icon?: IconType;
    text?: string | null;
}