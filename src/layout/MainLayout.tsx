'use client'

import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import FloatingSiteSettings from "@/src/features/site-settings/FloatingPanel";
import { SiteSettingsProvider } from "@/src/features/site-settings/context";
import { cn } from "@/src/shared/lib/cn";
import LightBeam from "@/src/ui/LightBeam";
import styles from "./MainLayout.module.scss";

const inter = Inter({ subsets: ["latin"] });

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SiteSettingsProvider>
      <LightBeam />
      <div className={cn(styles.mainLayout, inter.className)}>
        <main className={styles.mainContent}>{children}</main>
      </div>
      <FloatingSiteSettings />
    </SiteSettingsProvider>
  );
};

export default MainLayout;
