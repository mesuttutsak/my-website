'use client'

import { useDragSettings } from "@/src/shared/hooks/useDragSettings";
import { useSiteSettingsActions } from "@/src/shared/hooks/useSiteSettingsActions";
import { useTheme } from "@/src/shared/hooks/useTheme";

export function useSiteSettings() {
  return {
    ...useTheme(),
    ...useDragSettings(),
    ...useSiteSettingsActions(),
  };
}
