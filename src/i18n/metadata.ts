import "server-only";

import type { Metadata } from "next";

import { appLocales, defaultAppLocale, type AppLocale } from "@/src/i18n/config";
import { getPathname } from "@/src/i18n/navigation";

export function getLocalizedPath(locale: AppLocale, href: string) {
  return getPathname({ locale, href });
}

export function getLocalizedAlternates(
  locale: AppLocale,
  href: string
): Metadata["alternates"] {
  return {
    canonical: getLocalizedPath(locale, href),
    languages: {
      ...Object.fromEntries(
        appLocales.map((appLocale) => [
          appLocale,
          getLocalizedPath(appLocale, href),
        ])
      ),
      "x-default": getLocalizedPath(defaultAppLocale, href),
    },
  };
}
