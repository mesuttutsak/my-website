'use client'

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { localeCookieName, type AppLocale } from "@/src/i18n/config";
import type { ThemeMode } from "@/src/features/site-settings/theme";
import { useFloatingTooltip } from "@/src/features/site-settings/useFloatingTooltip";
import { useResetConfirmation } from "@/src/features/site-settings/useResetConfirmation";
import { useDragSettings } from "@/src/shared/hooks/useDragSettings";
import { useIsMobile } from "@/src/shared/hooks/useIsMobile";
import { useSiteSettingsActions } from "@/src/shared/hooks/useSiteSettingsActions";
import { useTheme } from "@/src/shared/hooks/useTheme";

export function useFloatingPanel() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const hasResetForMobileRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLocalePending, startLocaleTransition] = useTransition();
  const isMobile = useIsMobile();
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const { createTooltipFocusHandler, createTooltipMouseEnterHandler, hideTooltip, tooltip } =
    useFloatingTooltip();
  const { isDragEnabled, toggleDragEnabled } = useDragSettings();
  const { resetLayoutOnly, resetSiteSettings } = useSiteSettingsActions();
  const { selectedThemeMode, setSelectedThemeMode } = useTheme();
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

  const handleLocaleChange = (nextLocale: AppLocale) => {
    if (nextLocale === locale) {
      hideTooltip();
      return;
    }

    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    hideTooltip();
    startLocaleTransition(() => {
      router.refresh();
    });
  };

  return {
    createTooltipFocusHandler,
    createTooltipMouseEnterHandler,
    handleLocaleChange,
    handleReset,
    handleThemeChange,
    handleToggleDrag,
    hideTooltip,
    isConfirmingReset,
    isDragEnabled,
    isLocalePending,
    isMobile,
    isOpen,
    isResetting,
    locale,
    panelRef,
    selectedThemeMode,
    setIsOpen,
    tooltip,
  };
}
