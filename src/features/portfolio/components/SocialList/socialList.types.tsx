import { IconType } from "react-icons";
import type { SocialLink } from "@/src/features/portfolio/types";

export interface SocialListProps {
    links: SocialLink[];
}

export interface SocialItemProps {
    url?: string
    icon?: IconType;
    text?: string | null;
}
