import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/src/server/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

// The <html> shell lives in app/[locale]/layout.tsx so it can set `lang`.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
