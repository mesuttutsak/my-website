import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteConfig } from "@/src/server/site-config";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Mesut Tutsak ile iletişime geçmek, iş birlikleri ve yeni fırsatlar hakkında mesaj göndermek için iletişim sayfası.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `İletişim | ${siteConfig.name}`,
    description:
      "Mesut Tutsak ile iletişime geçmek, iş birlikleri ve yeni fırsatlar hakkında mesaj göndermek için iletişim sayfası.",
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
    title: `İletişim | ${siteConfig.name}`,
    description:
      "Mesut Tutsak ile iletişime geçmek, iş birlikleri ve yeni fırsatlar hakkında mesaj göndermek için iletişim sayfası.",
    images: [
      {
        url: "/twitter-image",
        alt: siteConfig.twitterImageAlt,
      },
    ],
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
