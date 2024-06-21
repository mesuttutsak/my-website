export interface RegulatedByProps {
    short_name: string;
    regulated_by_name: string;
    url: string;
  }
  
  export interface HonnorAndAwardsProps {
    name: string;
    regulated_by: RegulatedByProps;
    degree: string;
    title?: string | null;
  }
  