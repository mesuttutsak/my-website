'use client'

import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { LuSettings } from "react-icons/lu";

import type { TooltipState } from "@/src/features/site-settings/useFloatingTooltip";
import styles from "./FloatingPanel.module.scss";

interface FloatingPanelTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface FloatingPanelTooltipPortalProps {
  tooltip: TooltipState | null;
}

export function FloatingPanelTrigger({
  isOpen,
  onToggle,
}: FloatingPanelTriggerProps) {
  const t = useTranslations("settings");

  return (
    <button
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      aria-label={t("openSiteSettings")}
      className={styles.siteSettingsTrigger}
      data-open={isOpen}
      onClick={onToggle}
      type="button"
    >
      <LuSettings className={styles.siteSettingsTriggerIcon} size={22} />
      <span className="sr-only">{t("siteSettings")}</span>
    </button>
  );
}

export function FloatingPanelTooltipPortal({
  tooltip,
}: FloatingPanelTooltipPortalProps) {
  if (!tooltip) {
    return null;
  }

  return createPortal(
    <div
      className={styles.siteSettingsFloatingTooltip}
      role="tooltip"
      style={{
        left: tooltip.x,
        top: tooltip.y,
      }}
    >
      {tooltip.label}
    </div>,
    document.body
  );
}
