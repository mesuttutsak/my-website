export const appLocales = ["en", "tr"] as const;

export type AppLocale = (typeof appLocales)[number];

export const defaultAppLocale: AppLocale = "en";
export const localeCookieName = "app_locale";

export function isAppLocale(value: unknown): value is AppLocale {
  return typeof value === "string" && appLocales.includes(value as AppLocale);
}

export function resolveAppLocale(value: unknown): AppLocale {
  if (typeof value !== "string") {
    return defaultAppLocale;
  }

  const normalizedValue = value.trim().toLowerCase().split(/[-_]/)[0];

  return isAppLocale(normalizedValue) ? normalizedValue : defaultAppLocale;
}
