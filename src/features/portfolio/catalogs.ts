export const SKILL = {
  REACT: "react",
  EXPRESS: "express",
  REDUX_TOOLKIT: "redux_toolkit",
  JAVASCRIPT: "javascript",
  TYPESCRIPT: "typescript",
  NODE_JS: "nodejs",
  FIREBASE: "firebase",
  PADDLE: "paddle",
  WEBSITE_LOCALIZATION: "website_localization",
  CSS: "css",
  NEXT_JS: "nextjs",
  TAILWIND: "tailwind",
  SASS: "sass",
  REDUX: "redux",
  STORYBOOK: "storybook",
  JQUERY: "jquery",
  BOOTSTRAP: "bootstrap",
  HTML5: "html5",
} as const;

export const WORKING_TYPE = {
  ON_SITE: "on_site",
  REMOTE: "remote",
  HYBRID: "hybrid",
} as const;

export const EMPLOYMENT_TYPE = {
  FULL_TIME: "full_time",
  PART_TIME: "part_time",
  INTERNSHIP: "internship",
} as const;

export type SkillId = (typeof SKILL)[keyof typeof SKILL];
export type WorkingTypeId = (typeof WORKING_TYPE)[keyof typeof WORKING_TYPE];
export type EmploymentTypeId =
  (typeof EMPLOYMENT_TYPE)[keyof typeof EMPLOYMENT_TYPE];

export interface CatalogOption {
  label: string;
}

export interface ExperienceCatalogs {
  skills: Record<string, CatalogOption>;
  workingTypes: Record<string, CatalogOption>;
  employmentTypes: Record<string, CatalogOption>;
}

export function getSkillLabel(skillId: string, catalogs: ExperienceCatalogs) {
  return catalogs.skills[skillId]?.label ?? skillId;
}

export function getEmploymentTypeLabel(
  employmentTypeId: string,
  catalogs: ExperienceCatalogs
) {
  return catalogs.employmentTypes[employmentTypeId]?.label ?? employmentTypeId;
}

export function toCatalogRecord(entries: Array<{ id: string; label: string }>) {
  return entries.reduce<Record<string, CatalogOption>>((result, entry) => {
    result[entry.id] = { label: entry.label };
    return result;
  }, {});
}
