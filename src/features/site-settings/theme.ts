export const themeModes = ["system", "light", "dark"] as const;

export type ThemeMode = (typeof themeModes)[number];
export type ResolvedTheme = Exclude<ThemeMode, "system">;

export const defaultThemeMode: ThemeMode = "system";

export function isThemeMode(value: unknown): value is ThemeMode {
  return themeModes.includes(value as ThemeMode);
}

export function getSystemTheme(): ResolvedTheme {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
}

export function resolveThemeMode(
  themeMode: ThemeMode,
  systemTheme: ResolvedTheme
): ResolvedTheme {
  return themeMode === "system" ? systemTheme : themeMode;
}

export function applyResolvedTheme(theme: ResolvedTheme) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function getThemeInitializationScript() {
  return `
    (() => {
      const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

      const resolvedTheme = getSystemTheme();

      document.documentElement.dataset.theme = resolvedTheme;
      document.documentElement.style.colorScheme = resolvedTheme;
    })();
  `;
}
