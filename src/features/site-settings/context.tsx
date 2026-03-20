'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import {
  draggableLayoutStoragePrefix,
  legacySiteSettingsStorageKeys,
  siteSettingsStorageKey,
} from "@/src/features/site-settings/storage";

interface StoredSiteSettings {
  isDragEnabled: boolean;
}

interface SiteSettingsContextValue {
  isDragEnabled: boolean;
  setDragEnabled: (nextValue: boolean) => void;
  toggleDragEnabled: () => void;
  resetLayout: () => void;
  layoutResetVersion: number;
}

const defaultSiteSettings: StoredSiteSettings = {
  isDragEnabled: false,
};

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);

function readStoredSiteSettings(): StoredSiteSettings {
  if (typeof window === "undefined") {
    return defaultSiteSettings;
  }

  try {
    const rawValue = window.localStorage.getItem(siteSettingsStorageKey);

    if (!rawValue) {
      return defaultSiteSettings;
    }

    const parsedValue = JSON.parse(rawValue) as Partial<StoredSiteSettings>;

    return {
      isDragEnabled:
        typeof parsedValue.isDragEnabled === "boolean"
          ? parsedValue.isDragEnabled
          : defaultSiteSettings.isDragEnabled,
    };
  } catch {
    return defaultSiteSettings;
  }
}

function clearStoredLayoutPositions() {
  if (typeof window === "undefined") {
    return;
  }

  const keysToDelete: string[] = [];

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);

    if (key?.startsWith(draggableLayoutStoragePrefix)) {
      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach((key) => {
    window.localStorage.removeItem(key);
  });
}

function clearLegacySiteSettings() {
  if (typeof window === "undefined") {
    return;
  }

  legacySiteSettingsStorageKeys.forEach((key) => {
    window.localStorage.removeItem(key);
  });
}

export const SiteSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDragEnabled, setDragEnabled] = useState(
    () => readStoredSiteSettings().isDragEnabled
  );
  const [layoutResetVersion, setLayoutResetVersion] = useState(0);

  useEffect(() => {
    clearLegacySiteSettings();
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      siteSettingsStorageKey,
      JSON.stringify({ isDragEnabled })
    );
  }, [isDragEnabled]);

  const value = useMemo<SiteSettingsContextValue>(
    () => ({
      isDragEnabled,
      setDragEnabled,
      toggleDragEnabled: () => {
        setDragEnabled((previousValue) => !previousValue);
      },
      resetLayout: () => {
        clearStoredLayoutPositions();
        setDragEnabled(defaultSiteSettings.isDragEnabled);
        setLayoutResetVersion((previousValue) => previousValue + 1);
      },
      layoutResetVersion,
    }),
    [isDragEnabled, layoutResetVersion]
  );

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);

  if (!context) {
    throw new Error("useSiteSettings must be used within SiteSettingsProvider.");
  }

  return context;
}
