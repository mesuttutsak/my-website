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

export const skillCatalog: Record<SkillId, CatalogOption> = {
  [SKILL.REACT]: { label: "React.js" },
  [SKILL.EXPRESS]: { label: "Express.js" },
  [SKILL.REDUX_TOOLKIT]: { label: "Redux Toolkit" },
  [SKILL.JAVASCRIPT]: { label: "JavaScript" },
  [SKILL.TYPESCRIPT]: { label: "TypeScript" },
  [SKILL.NODE_JS]: { label: "Node.js" },
  [SKILL.FIREBASE]: { label: "Firebase" },
  [SKILL.PADDLE]: { label: "Paddle" },
  [SKILL.WEBSITE_LOCALIZATION]: { label: "Website Localization" },
  [SKILL.CSS]: { label: "CSS" },
  [SKILL.NEXT_JS]: { label: "Next.js" },
  [SKILL.TAILWIND]: { label: "Tailwind" },
  [SKILL.SASS]: { label: "SASS" },
  [SKILL.REDUX]: { label: "Redux" },
  [SKILL.STORYBOOK]: { label: "Storybook" },
  [SKILL.JQUERY]: { label: "jQuery" },
  [SKILL.BOOTSTRAP]: { label: "Bootstrap" },
  [SKILL.HTML5]: { label: "HTML5" },
};

export const workingTypeCatalog: Record<WorkingTypeId, CatalogOption> = {
  [WORKING_TYPE.ON_SITE]: { label: "On-site" },
  [WORKING_TYPE.REMOTE]: { label: "Remote" },
  [WORKING_TYPE.HYBRID]: { label: "Hybrid" },
};

export const employmentTypeCatalog: Record<EmploymentTypeId, CatalogOption> = {
  [EMPLOYMENT_TYPE.FULL_TIME]: { label: "Full Time" },
  [EMPLOYMENT_TYPE.PART_TIME]: { label: "Part Time" },
  [EMPLOYMENT_TYPE.INTERNSHIP]: { label: "Internship" },
};

const skillAliases: Record<string, SkillId> = {
  react: SKILL.REACT,
  react_js: SKILL.REACT,
  express: SKILL.EXPRESS,
  express_js: SKILL.EXPRESS,
  redux_toolkit: SKILL.REDUX_TOOLKIT,
  redux: SKILL.REDUX,
  redux_tool_kit: SKILL.REDUX_TOOLKIT,
  javascript: SKILL.JAVASCRIPT,
  typescript: SKILL.TYPESCRIPT,
  ts: SKILL.TYPESCRIPT,
  nodejs: SKILL.NODE_JS,
  node_js: SKILL.NODE_JS,
  firebase: SKILL.FIREBASE,
  paddle: SKILL.PADDLE,
  website_localization: SKILL.WEBSITE_LOCALIZATION,
  css: SKILL.CSS,
  nextjs: SKILL.NEXT_JS,
  next_js: SKILL.NEXT_JS,
  tailwind: SKILL.TAILWIND,
  tailwindcss: SKILL.TAILWIND,
  sass: SKILL.SASS,
  storybook: SKILL.STORYBOOK,
  jquery: SKILL.JQUERY,
  bootstrap: SKILL.BOOTSTRAP,
  html5: SKILL.HTML5,
};

const workingTypeAliases: Record<string, WorkingTypeId> = {
  on_site: WORKING_TYPE.ON_SITE,
  onsite: WORKING_TYPE.ON_SITE,
  remote: WORKING_TYPE.REMOTE,
  hybrid: WORKING_TYPE.HYBRID,
};

const employmentTypeAliases: Record<string, EmploymentTypeId> = {
  full_time: EMPLOYMENT_TYPE.FULL_TIME,
  fulltime: EMPLOYMENT_TYPE.FULL_TIME,
  part_time: EMPLOYMENT_TYPE.PART_TIME,
  parttime: EMPLOYMENT_TYPE.PART_TIME,
  internship: EMPLOYMENT_TYPE.INTERNSHIP,
  intership: EMPLOYMENT_TYPE.INTERNSHIP,
};

function normalizeLookupKey(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_");
}

function normalizeCatalogId<T extends string>(
  value: unknown,
  aliases: Record<string, T>
) {
  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = normalizeLookupKey(value);

  return aliases[normalizedValue] ?? null;
}

export function normalizeSkillId(value: unknown) {
  return normalizeCatalogId(value, skillAliases);
}

export function normalizeWorkingTypeId(value: unknown) {
  return normalizeCatalogId(value, workingTypeAliases);
}

export function normalizeEmploymentTypeId(value: unknown) {
  return normalizeCatalogId(value, employmentTypeAliases);
}

export const defaultExperienceCatalogs: ExperienceCatalogs = {
  skills: skillCatalog,
  workingTypes: workingTypeCatalog,
  employmentTypes: employmentTypeCatalog,
};

export function getSkillLabel(
  skillId: string,
  catalogs: ExperienceCatalogs = defaultExperienceCatalogs
) {
  return catalogs.skills[skillId]?.label ?? skillId;
}

export function getWorkingTypeLabel(
  workingTypeId: string,
  catalogs: ExperienceCatalogs = defaultExperienceCatalogs
) {
  return catalogs.workingTypes[workingTypeId]?.label ?? workingTypeId;
}

export function getEmploymentTypeLabel(
  employmentTypeId: string,
  catalogs: ExperienceCatalogs = defaultExperienceCatalogs
) {
  return catalogs.employmentTypes[employmentTypeId]?.label ?? employmentTypeId;
}

export function toCatalogRecord(entries: Array<{ id: string; label: string }>) {
  return entries.reduce<Record<string, CatalogOption>>((result, entry) => {
    result[entry.id] = { label: entry.label };
    return result;
  }, {});
}
