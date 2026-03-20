import type {
  EmploymentTypeId,
  ExperienceCatalogs,
  SkillId,
  WorkingTypeId,
} from "@/src/features/portfolio/catalogs";

export type SocialPlatform = "github" | "linkedin" | "website" | "other";
export type FirebaseDateTimeString = string;
export type CustomString = string & {};

export interface SocialLink {
  platform: SocialPlatform | CustomString;
  url: string;
  text?: string | null;
}

export interface AboutContent {
  name: string;
  role: string;
  location: string;
  summary: string;
  email: string;
  profileImageSrc: string;
  contactHref: string;
}

export interface EducationCertificate {
  title: string;
  period: string[];
}

export interface EducationContent {
  name: string;
  department: string;
  grade: number;
  startDate: FirebaseDateTimeString;
  endDate: FirebaseDateTimeString;
  certificates: EducationCertificate[];
}

export interface ExperiencePeriod {
  title: string;
  employment_type: EmploymentTypeId;
  start_date: FirebaseDateTimeString;
  end_date?: FirebaseDateTimeString | null;
  desc: string;
}

export interface ExperienceItem {
  company: string;
  website: string;
  skills: SkillId[];
  location: string;
  working_type: WorkingTypeId;
  periods: ExperiencePeriod[];
}

export interface RegulatedBy {
  short_name: string;
  regulated_by_name: string;
  url: string;
}

export interface PortfolioAward {
  name: string;
  regulated_by: RegulatedBy;
  degree: string;
  title?: string | null;
}

export interface PortfolioContent {
  about: AboutContent;
  socialLinks: SocialLink[];
  experiences: ExperienceItem[];
  educations: EducationContent;
  awards: PortfolioAward[];
}

export interface PortfolioPageData {
  content: PortfolioContent;
  catalogs: ExperienceCatalogs;
}
