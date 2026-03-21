import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { getCurrentLocale } from "@/src/i18n/server";
import { getSiteConfig } from "@/src/server/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const siteConfig = getSiteConfig(locale);
  const t = await getTranslations({ locale, namespace: "contact.metadata" });
  const metadataTitle = t("title");
  const metadataDescription = t("description");

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: {
      canonical: "/contact",
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: `${metadataTitle} | ${siteConfig.name}`,
      description: metadataDescription,
      url: "/contact",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: siteConfig.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${metadataTitle} | ${siteConfig.name}`,
      description: metadataDescription,
      images: [
        {
          url: "/twitter-image",
          alt: siteConfig.twitterImageAlt,
        },
      ],
    },
  };
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
