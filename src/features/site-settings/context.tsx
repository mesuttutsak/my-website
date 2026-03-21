'use client'

import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import {
  applyResolvedTheme,
  defaultThemeMode,
  getSystemTheme,
  resolveThemeMode,
  type ResolvedTheme,
  type ThemeMode,
} from "@/src/features/site-settings/theme";

interface SiteSettingsState {
  isDragEnabled: boolean;
  selectedThemeMode: ThemeMode;
}

export interface SiteThemeContextValue {
  systemTheme: ResolvedTheme;
  selectedThemeMode: ThemeMode;
  theme: ResolvedTheme;
  setSelectedThemeMode: (nextValue: ThemeMode) => void;
}

export interface SiteDragContextValue {
  isDragEnabled: boolean;
  setDragEnabled: (nextValue: boolean) => void;
  toggleDragEnabled: () => void;
  layoutResetVersion: number;
}

export interface SiteSettingsActionsContextValue {
  resetSiteSettings: () => void;
  resetLayoutOnly: () => void;
}
export interface SiteSettingsContextValue
  extends SiteThemeContextValue,
    SiteDragContextValue,
    SiteSettingsActionsContextValue {}

const defaultSiteSettings: SiteSettingsState = {
  isDragEnabled: false,
  selectedThemeMode: defaultThemeMode,
};

export const SiteThemeContext = createContext<SiteThemeContextValue | null>(null);
export const SiteDragContext = createContext<SiteDragContextValue | null>(null);
export const SiteSettingsActionsContext =
  createContext<SiteSettingsActionsContextValue | null>(null);

export const SiteSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [siteSettings, setSiteSettings] = useState(() => ({
    ...defaultSiteSettings,
  }));
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);
  const [layoutResetVersion, setLayoutResetVersion] = useState(0);
  const { isDragEnabled, selectedThemeMode } = siteSettings;
  const theme = resolveThemeMode(selectedThemeMode, systemTheme);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = (event?: MediaQueryListEvent) => {
      setSystemTheme((event?.matches ?? mediaQuery.matches) ? "dark" : "light");
    };

    syncSystemTheme();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncSystemTheme);

      return () => {
        mediaQuery.removeEventListener("change", syncSystemTheme);
      };
    }

    mediaQuery.addListener(syncSystemTheme);

    return () => {
      mediaQuery.removeListener(syncSystemTheme);
    };
  }, []);

  useEffect(() => {
    applyResolvedTheme(theme);
  }, [theme]);

  const themeValue = useMemo<SiteThemeContextValue>(
    () => ({
      systemTheme,
      selectedThemeMode,
      theme,
      setSelectedThemeMode: (nextValue) => {
        setSiteSettings((previousValue) => ({
          ...previousValue,
          selectedThemeMode: nextValue,
        }));
      },
    }),
    [selectedThemeMode, systemTheme, theme]
  );

  const dragValue = useMemo<SiteDragContextValue>(
    () => ({
      isDragEnabled,
      setDragEnabled: (nextValue) => {
        setSiteSettings((previousValue) => ({
          ...previousValue,
          isDragEnabled: nextValue,
        }));
      },
      toggleDragEnabled: () => {
        setSiteSettings((previousValue) => ({
          ...previousValue,
          isDragEnabled: !previousValue.isDragEnabled,
        }));
      },
      layoutResetVersion,
    }),
    [isDragEnabled, layoutResetVersion]
  );

  const actionsValue = useMemo<SiteSettingsActionsContextValue>(
    () => ({
      resetSiteSettings: () => {
        setSiteSettings({ ...defaultSiteSettings });
        setLayoutResetVersion((previousValue) => previousValue + 1);
      },
      resetLayoutOnly: () => {
        setSiteSettings((previousValue) => ({
          ...previousValue,
          isDragEnabled: defaultSiteSettings.isDragEnabled,
        }));
        setLayoutResetVersion((previousValue) => previousValue + 1);
      },
    }),
    []
  );

  return (
    <SiteThemeContext.Provider value={themeValue}>
      <SiteDragContext.Provider value={dragValue}>
        <SiteSettingsActionsContext.Provider value={actionsValue}>
          {children}
        </SiteSettingsActionsContext.Provider>
      </SiteDragContext.Provider>
    </SiteThemeContext.Provider>
  );
};
