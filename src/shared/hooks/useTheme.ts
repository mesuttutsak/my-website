'use client'

import { useContext } from "react";

import { SiteThemeContext } from "@/src/features/site-settings/context";

export function useTheme() {
  const context = useContext(SiteThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within SiteSettingsProvider.");
  }

  return context;
}

export const useSiteTheme = useTheme;
