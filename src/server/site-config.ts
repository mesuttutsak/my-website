import "server-only";

const defaultSiteUrl = "https://www.mesuttutsak.dev";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;

export const siteConfig = {
  name: "Mesut Tutsak",
  role: "Frontend Developer",
  title: "Mesut Tutsak | Frontend Developer",
  description:
    "Mesut Tutsak's personal portfolio focused on frontend development, experience, and selected projects.",
  keywords: [
    "Mesut Tutsak",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Web Developer",
  ],
  themeColors: {
    light: "#f6f8fa",
    dark: "#10161f",
  },
  locale: "en_US",
  language: "en",
  domainLabel: "mesuttutsak.dev",
  ogImageAlt: "Mesut Tutsak portfolio preview image",
  twitterImageAlt: "Mesut Tutsak Twitter preview image",
} as const;
