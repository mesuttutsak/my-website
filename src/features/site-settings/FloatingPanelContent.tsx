'use client'

import { useEffect, useState } from "react";
import type { ButtonHTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import {
  LuMonitor,
  LuMoon,
  LuMove,
  LuRotateCcw,
  LuSun,
} from "react-icons/lu";

import { appLocales, type AppLocale } from "@/src/i18n/config";
import type { ThemeMode } from "@/src/features/site-settings/theme";
import {
  FloatingPanelSelect,
  type FloatingPanelOption,
} from "./FloatingPanelSelect";
import styles from "./FloatingPanel.module.scss";

type TooltipTriggerProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onBlur" | "onFocus" | "onMouseEnter" | "onMouseLeave"
>;

interface FloatingPanelContentProps {
  createTooltipTriggerProps: (label: string) => TooltipTriggerProps;
  currentLocale: AppLocale;
  isConfirmingReset: boolean;
  isDragEnabled: boolean;
  isLocalePending: boolean;
  isOpen: boolean;
  isResetting: boolean;
  onLocaleChange: (nextLocale: AppLocale) => void;
  onReset: () => void;
  onThemeChange: (nextThemeMode: ThemeMode) => void;
  onToggleDrag: () => void;
  selectedThemeMode: ThemeMode;
}

const localeOptions: Array<{ label: string; value: AppLocale }> = appLocales.map(
  (locale) => ({
    label: locale.toUpperCase(),
    value: locale,
  })
);

export function FloatingPanelContent({
  createTooltipTriggerProps,
  currentLocale,
  isConfirmingReset,
  isDragEnabled,
  isLocalePending,
  isOpen,
  isResetting,
  onLocaleChange,
  onReset,
  onThemeChange,
  onToggleDrag,
  selectedThemeMode,
}: FloatingPanelContentProps) {
  const t = useTranslations("settings");
  const [openSelect, setOpenSelect] = useState<"theme" | "locale" | null>(null);
  const themeOptions: Array<{
    Icon: typeof LuSun;
    label: string;
    mode: ThemeMode;
  }> = [
    {
      label: t("themeSystem"),
      mode: "system",
      Icon: LuMonitor,
    },
    {
      label: t("themeLight"),
      mode: "light",
      Icon: LuSun,
    },
    {
      label: t("themeDark"),
      mode: "dark",
      Icon: LuMoon,
    },
  ];
  const dragTooltipLabel = isDragEnabled ? t("dragEnabled") : t("dragDisabled");
  const resetTooltipLabel = isConfirmingReset
    ? t("resetConfirm")
    : t("resetSettings");
  const activeThemeOption = themeOptions.find(
    ({ mode }) => mode === selectedThemeMode
  ) ?? themeOptions[0];
  const themeSelectOptions: FloatingPanelOption[] = themeOptions.map(
    ({ Icon, label, mode }) => ({
      icon: <Icon size={14} />,
      label,
      value: mode,
    })
  );
  const localeSelectOptions: FloatingPanelOption[] = localeOptions.map(
    ({ label, value }) => ({
      disabled: isLocalePending,
      label,
      value,
    })
  );

  useEffect(() => {
    if (!isOpen) {
      setOpenSelect(null);
    }
  }, [isOpen]);

  const toggleSelect = (selectKey: "theme" | "locale") => {
    setOpenSelect((currentValue) =>
      currentValue === selectKey ? null : selectKey
    );
  };

  return (
    <div
      aria-label={t("siteSettings")}
      className={styles.siteSettingsDrawer}
      data-confirming-reset={isConfirmingReset}
      data-open={isOpen}
      role="dialog"
    >
      <div className={styles.siteSettingsPanel}>
        <div
          aria-label={t("themeLabel")}
          className={styles.siteSettingsThemeGroup}
          role="group"
        >
          <FloatingPanelSelect
            activeValue={selectedThemeMode}
            ariaLabel={t("themeLabel")}
            isOpen={openSelect === "theme"}
            onSelect={(value) => {
              setOpenSelect(null);
              onThemeChange(value as ThemeMode);
            }}
            onToggle={() => {
              toggleSelect("theme");
            }}
            options={themeSelectOptions}
            optionProps={createTooltipTriggerProps}
            showOptionLabels={false}
            triggerContent={<activeThemeOption.Icon size={15} />}
            triggerProps={createTooltipTriggerProps(t("themeLabel"))}
          />
        </div>

        <span aria-hidden="true" className={styles.siteSettingsDivider} />

        <div
          aria-label={t("languageLabel")}
          className={styles.siteSettingsLocaleGroup}
          role="group"
        >
          <FloatingPanelSelect
            activeValue={currentLocale}
            ariaLabel={t("languageLabel")}
            isOpen={openSelect === "locale"}
            onSelect={(value) => {
              setOpenSelect(null);
              onLocaleChange(value as AppLocale);
            }}
            onToggle={() => {
              toggleSelect("locale");
            }}
            options={localeSelectOptions}
            triggerContent={currentLocale.toUpperCase()}
            triggerProps={createTooltipTriggerProps(t("languageLabel"))}
          />
        </div>

        <span aria-hidden="true" className={styles.siteSettingsDivider} />

        <button
          aria-label={dragTooltipLabel}
          aria-pressed={isDragEnabled}
          className={styles.siteSettingsControl}
          data-active={isDragEnabled}
          onClick={() => {
            setOpenSelect(null);
            onToggleDrag();
          }}
          type="button"
          {...createTooltipTriggerProps(dragTooltipLabel)}
        >
          <LuMove className={styles.siteSettingsControlIcon} size={16} />
          <span aria-hidden="true" className={styles.siteSettingsStatusDot} />
        </button>

        <button
          aria-label={t("resetSettings")}
          className={styles.siteSettingsIconButton}
          data-confirming={isConfirmingReset}
          data-resetting={isResetting}
          onClick={() => {
            setOpenSelect(null);
            onReset();
          }}
          type="button"
          {...createTooltipTriggerProps(resetTooltipLabel)}
        >
          <LuRotateCcw size={16} />
          {isConfirmingReset && (
            <span className={styles.siteSettingsConfirmText}>{t("confirm")}</span>
          )}
        </button>
      </div>
    </div>
  );
}
