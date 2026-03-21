import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { getCurrentLocale } from "@/src/i18n/server";
import { getThemeInitializationScript } from "@/src/features/site-settings/theme";
import "@/src/styles/globals.scss";
import MainLayout from "@/src/layout/MainLayout";
import { getSiteConfig, siteUrl } from "@/src/server/site-config";

const themeInitializationScript = getThemeInitializationScript();

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const siteConfig = getSiteConfig(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
    authors: [
      {
        name: siteConfig.name,
        url: siteUrl,
      },
    ],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    applicationName: siteConfig.name,
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: "/",
    },
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        {
          url: "/favicon.ico",
        },
        {
          url: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: "/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: "/apple-touch-icon.png",
          sizes: "180x180",
        },
      ],
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: "/",
      siteName: siteConfig.name,
      title: siteConfig.title,
      description: siteConfig.description,
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
      title: siteConfig.title,
      description: siteConfig.description,
      images: [
        {
          url: "/twitter-image",
          alt: siteConfig.twitterImageAlt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: getSiteConfig().themeColors.light,
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: getSiteConfig().themeColors.dark,
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getCurrentLocale();
  const messages = await getMessages();
  const siteConfig = getSiteConfig(locale);

  return (
    <html lang={siteConfig.language} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MainLayout>{children}</MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
