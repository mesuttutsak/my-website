'use client'

import { useContext } from "react";

import { SiteSettingsActionsContext } from "@/src/features/site-settings/context";

export function useSiteSettingsActions() {
  const context = useContext(SiteSettingsActionsContext);

  if (!context) {
    throw new Error(
      "useSiteSettingsActions must be used within SiteSettingsProvider."
    );
  }

  return context;
}
