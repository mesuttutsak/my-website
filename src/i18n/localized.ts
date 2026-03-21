import {
  appLocales,
  defaultAppLocale,
  type AppLocale,
} from "@/src/i18n/config";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isLocalizedLeaf(value: unknown) {
  return (
    value === null ||
    typeof value === "string" ||
    (Array.isArray(value) &&
      value.every((item) => item === null || typeof item === "string"))
  );
}

function isLocaleMap(value: unknown): value is Record<AppLocale, unknown> {
  if (!isPlainObject(value)) {
    return false;
  }

  const keys = Object.keys(value);

  if (keys.length === 0) {
    return false;
  }

  return keys.every(
    (key) =>
      appLocales.includes(key as AppLocale) &&
      isLocalizedLeaf(value[key as AppLocale])
  );
}

function cloneLocalizedLeaf(value: unknown) {
  return Array.isArray(value) ? [...value] : value;
}

function resolveLocaleMap(
  value: Record<AppLocale, unknown>,
  locale: AppLocale
): unknown {
  const localizedValue = value[locale];

  if (localizedValue !== null && localizedValue !== undefined) {
    return cloneLocalizedLeaf(localizedValue);
  }

  const fallbackValue = value[defaultAppLocale];

  return fallbackValue !== undefined ? cloneLocalizedLeaf(fallbackValue) : null;
}

function resolveLocalizedValue(value: unknown, locale: AppLocale): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => resolveLocalizedValue(item, locale));
  }

  if (isLocaleMap(value)) {
    return resolveLocaleMap(value, locale);
  }

  if (!isPlainObject(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, entryValue]) => [
      key,
      resolveLocalizedValue(entryValue, locale),
    ])
  );
}

export function resolveLocalizedData<T>(value: unknown, locale: AppLocale): T {
  return resolveLocalizedValue(value, locale) as T;
}
