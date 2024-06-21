export interface ExperiencePeriod {
    title: string;
    employment_type: "Part Time" | "Full Time" | "Intership";
    start_date: string;
    end_date?: string;
    desc: string;
}

export  interface ExperienceProps {
    company: string;
    website: string;
    skills: string[];
    location: string;
    working_type: "On-site" | "Remote" | "Hybrid";
    periods: ExperiencePeriod[];
}