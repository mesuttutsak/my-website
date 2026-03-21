'use client'

import { useContext } from "react";

import { SiteDragContext } from "@/src/features/site-settings/context";

export function useDragSettings() {
  const context = useContext(SiteDragContext);

  if (!context) {
    throw new Error(
      "useDragSettings must be used within SiteSettingsProvider."
    );
  }

  return context;
}

export const useSiteDragSettings = useDragSettings;
