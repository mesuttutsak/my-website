'use client'

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  LuMonitor,
  LuMoon,
  LuMove,
  LuRotateCcw,
  LuSettings,
  LuSun,
} from "react-icons/lu";

import type { ThemeMode } from "@/src/features/site-settings/theme";
import { useFloatingTooltip } from "@/src/features/site-settings/useFloatingTooltip";
import { useDragSettings } from "@/src/shared/hooks/useDragSettings";
import { useIsMobile } from "@/src/shared/hooks/useIsMobile";
import { useSiteSettingsActions } from "@/src/shared/hooks/useSiteSettingsActions";
import { useTheme } from "@/src/shared/hooks/useTheme";
import { useResetConfirmation } from "./useResetConfirmation";
import styles from "./FloatingPanel.module.scss";

const themeOptions: Array<{
  label: string;
  mode: ThemeMode;
  Icon: typeof LuSun;
}> = [
  {
    label: "System theme",
    mode: "system",
    Icon: LuMonitor,
  },
  {
    label: "Light theme",
    mode: "light",
    Icon: LuSun,
  },
  {
    label: "Dark theme",
    mode: "dark",
    Icon: LuMoon,
  },
];

const FloatingSiteSettings = () => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const hasResetForMobileRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { createTooltipFocusHandler, createTooltipMouseEnterHandler, hideTooltip, tooltip } =
    useFloatingTooltip();
  const { isDragEnabled, toggleDragEnabled } = useDragSettings();
  const { resetLayoutOnly, resetSiteSettings } = useSiteSettingsActions();
  const {
    selectedThemeMode,
    setSelectedThemeMode,
  } = useTheme();
  const {
    cancelResetConfirmation,
    handleReset,
    isConfirmingReset,
    isResetting,
    resetResetState,
  } = useResetConfirmation({
    onConfirm: resetSiteSettings,
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        panelRef.current &&
        event.target instanceof Node &&
        !panelRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      hideTooltip();
      cancelResetConfirmation();
    }
  }, [cancelResetConfirmation, hideTooltip, isOpen]);

  useEffect(() => {
    if (!isMobile) {
      hasResetForMobileRef.current = false;
      return;
    }

    setIsOpen(false);
    hideTooltip();
    resetResetState();

    if (!hasResetForMobileRef.current) {
      resetLayoutOnly();
      hasResetForMobileRef.current = true;
    }
  }, [hideTooltip, isMobile, resetLayoutOnly, resetResetState]);

  const handleToggleDrag = () => {
    toggleDragEnabled();
    hideTooltip();
  };

  const handleThemeChange = (nextThemeMode: ThemeMode) => {
    setSelectedThemeMode(nextThemeMode);
    hideTooltip();
  };

  const dragTooltipLabel = isDragEnabled
    ? "Disable dragging"
    : "Enable dragging";
  const resetTooltipLabel = isConfirmingReset
    ? "Click again to reset"
    : "Reset settings";

  if (isMobile) {
    return null;
  }

  return (
    <div className={styles.siteSettings} ref={panelRef}>
      <div
        aria-label="Site settings"
        className={styles.siteSettingsDrawer}
        data-confirming-reset={isConfirmingReset}
        data-open={isOpen}
        role="dialog"
      >
        <div className={styles.siteSettingsPanel}>
          <div aria-label="Theme mode" className={styles.siteSettingsThemeGroup} role="group">
            {themeOptions.map(({ Icon, label, mode }) => (
              <button
                key={mode}
                aria-label={label}
                aria-pressed={selectedThemeMode === mode}
                className={styles.siteSettingsThemeButton}
                data-active={selectedThemeMode === mode}
                onBlur={hideTooltip}
                onClick={() => {
                  handleThemeChange(mode);
                }}
                onFocus={createTooltipFocusHandler(label)}
                onMouseEnter={createTooltipMouseEnterHandler(label)}
                onMouseLeave={hideTooltip}
                type="button"
              >
                <Icon size={15} />
              </button>
            ))}
          </div>

          <span aria-hidden="true" className={styles.siteSettingsDivider} />

          <button
            aria-label="Toggle dragging"
            aria-pressed={isDragEnabled}
            className={styles.siteSettingsControl}
            data-active={isDragEnabled}
            onBlur={hideTooltip}
            onClick={handleToggleDrag}
            onFocus={createTooltipFocusHandler(dragTooltipLabel)}
            onMouseEnter={createTooltipMouseEnterHandler(dragTooltipLabel)}
            onMouseLeave={hideTooltip}
            type="button"
          >
            <LuMove className={styles.siteSettingsControlIcon} size={16} />
            <span aria-hidden="true" className={styles.siteSettingsStatusDot} />
          </button>

          <span aria-hidden="true" className={styles.siteSettingsDivider} />

          <button
            aria-label="Reset settings"
            className={styles.siteSettingsIconButton}
            data-confirming={isConfirmingReset}
            data-resetting={isResetting}
            onBlur={hideTooltip}
            onClick={() => {
              handleReset();
              hideTooltip();
            }}
            onFocus={createTooltipFocusHandler(resetTooltipLabel)}
            onMouseEnter={createTooltipMouseEnterHandler(resetTooltipLabel)}
            onMouseLeave={hideTooltip}
            type="button"
          >
            <LuRotateCcw size={16} />
            {isConfirmingReset && (
              <span className={styles.siteSettingsConfirmText}>Confirm</span>
            )}
          </button>
        </div>
      </div>

      <button
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Open site settings"
        className={styles.siteSettingsTrigger}
        data-open={isOpen}
        onClick={() => {
          setIsOpen((previousValue) => !previousValue);
        }}
        type="button"
      >
        <LuSettings className={styles.siteSettingsTriggerIcon} size={22} />
        <span className="sr-only">Settings</span>
      </button>

      {tooltip &&
        createPortal(
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
        )}
    </div>
  );
};

export default FloatingSiteSettings;
