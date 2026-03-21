import type { MetadataRoute } from "next";

import { defaultSiteConfig } from "@/src/server/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: defaultSiteConfig.title,
    short_name: defaultSiteConfig.name,
    description: defaultSiteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: defaultSiteConfig.themeColors.light,
    theme_color: defaultSiteConfig.themeColors.light,
    icons: [
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
