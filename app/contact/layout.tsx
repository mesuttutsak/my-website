import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteConfig } from "@/src/server/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mesut Tutsak to discuss collaborations, opportunities, and new ideas.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `Contact | ${siteConfig.name}`,
    description:
      "Get in touch with Mesut Tutsak to discuss collaborations, opportunities, and new ideas.",
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
    title: `Contact | ${siteConfig.name}`,
    description:
      "Get in touch with Mesut Tutsak to discuss collaborations, opportunities, and new ideas.",
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
