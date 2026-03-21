import "server-only";

import {
  defaultAppLocale,
  type AppLocale,
} from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";

const defaultSiteUrl = "https://www.mesuttutsak.dev";
const themeColors = {
  light: "#f6f8fa",
  dark: "#10161f",
} as const;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;

export function getSiteConfig(locale: AppLocale = defaultAppLocale) {
  const { site } = getMessages(locale);

  return {
    name: "Mesut Tutsak",
    role: site.role,
    title: site.title,
    description: site.description,
    keywords: [...site.keywords],
    themeColors,
    locale: site.locale,
    language: site.language,
    domainLabel: site.domainLabel,
    ogImageAlt: site.ogImageAlt,
    previewBadge: site.previewBadge,
    previewSections: site.previewSections,
    previewStack: site.previewStack,
    twitterImageAlt: site.twitterImageAlt,
  } as const;
}

export const defaultSiteConfig = getSiteConfig();
