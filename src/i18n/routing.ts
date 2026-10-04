import { defineRouting } from "next-intl/routing";

import {
  appLocales,
  defaultAppLocale,
  localeCookieName,
} from "@/src/i18n/config";

export const routing = defineRouting({
  locales: appLocales,
  defaultLocale: defaultAppLocale,
  localePrefix: "as-needed",
  localeCookie: {
    name: localeCookieName,
    maxAge: 60 * 60 * 24 * 365,
  },
});
