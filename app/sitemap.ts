import type { MetadataRoute } from "next";

import { appLocales, defaultAppLocale } from "@/src/i18n/config";
import { getPathname } from "@/src/i18n/navigation";
import { siteUrl } from "@/src/server/site-config";

const routes = [
  { href: "/", changeFrequency: "weekly", priority: 1 },
  { href: "/contact", changeFrequency: "monthly", priority: 0.8 },
] as const;

function getLocalizedUrl(locale: (typeof appLocales)[number], href: string) {
  const pathname = getPathname({ locale, href });

  return `${siteUrl}${pathname === "/" ? "" : pathname}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.flatMap(({ href, changeFrequency, priority }) => {
    const languages = {
      ...Object.fromEntries(
        appLocales.map((locale) => [locale, getLocalizedUrl(locale, href)])
      ),
      "x-default": getLocalizedUrl(defaultAppLocale, href),
    };

    return appLocales.map((locale) => ({
      url: getLocalizedUrl(locale, href),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
