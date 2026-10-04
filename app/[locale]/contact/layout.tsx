import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/src/i18n/config";
import { getLocalizedAlternates, getLocalizedPath } from "@/src/i18n/metadata";
import { getSiteConfig } from "@/src/server/site-config";

type ContactLayoutProps = {
  children: ReactNode;
  params: { locale: AppLocale };
};

export async function generateMetadata({
  params: { locale },
}: Omit<ContactLayoutProps, "children">): Promise<Metadata> {
  const siteConfig = getSiteConfig(locale);
  const t = await getTranslations({ locale, namespace: "contact.metadata" });
  const metadataTitle = t("title");
  const metadataDescription = t("description");

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: getLocalizedAlternates(locale, "/contact"),
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: `${metadataTitle} | ${siteConfig.name}`,
      description: metadataDescription,
      url: getLocalizedPath(locale, "/contact"),
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

export default function ContactLayout({
  children,
  params,
}: ContactLayoutProps) {
  setRequestLocale(params.locale);

  return children;
}
