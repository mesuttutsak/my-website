import "server-only";

const defaultSiteUrl = "https://www.mesuttutsak.dev";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;

export const siteConfig = {
  name: "Mesut Tutsak",
  role: "Frontend Developer",
  title: "Mesut Tutsak | Frontend Developer",
  description:
    "Mesut Tutsak'ın frontend development, deneyim ve proje odaklı kişisel portfolyo sitesi.",
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
  locale: "tr_TR",
  language: "tr",
  domainLabel: "mesuttutsak.dev",
  ogImageAlt: "Mesut Tutsak portfolyo önizleme görseli",
  twitterImageAlt: "Mesut Tutsak Twitter önizleme görseli",
} as const;
