'use client'

import type {
  FocusEvent as ReactFocusEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LuMove, LuRotateCcw, LuSettings } from "react-icons/lu";

import { useSiteSettings } from "@/src/features/site-settings/context";
import { useIsMobile } from "@/src/shared/hooks/useIsMobile";
import styles from "./FloatingPanel.module.scss";

interface TooltipState {
  label: string;
  x: number;
  y: number;
}

const FloatingSiteSettings = () => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const hasResetForMobileRef = useRef(false);
  const resetTimeoutRef = useRef<number | null>(null);
  const resetConfirmTimeoutRef = useRef<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const isMobile = useIsMobile();
  const { isDragEnabled, toggleDragEnabled, resetLayout } = useSiteSettings();

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
    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }

      if (resetConfirmTimeoutRef.current !== null) {
        window.clearTimeout(resetConfirmTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setTooltip(null);
      setIsConfirmingReset(false);

      if (resetConfirmTimeoutRef.current !== null) {
        window.clearTimeout(resetConfirmTimeoutRef.current);
        resetConfirmTimeoutRef.current = null;
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isMobile) {
      hasResetForMobileRef.current = false;
      return;
    }

    setIsOpen(false);
    setTooltip(null);
    setIsConfirmingReset(false);
    setIsResetting(false);

    if (resetConfirmTimeoutRef.current !== null) {
      window.clearTimeout(resetConfirmTimeoutRef.current);
      resetConfirmTimeoutRef.current = null;
    }

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }

    if (!hasResetForMobileRef.current) {
      resetLayout();
      hasResetForMobileRef.current = true;
    }
  }, [isMobile, resetLayout]);

  const handleToggleDrag = () => {
    toggleDragEnabled();
    setTooltip(null);
  };

  const handleReset = () => {
    if (!isConfirmingReset) {
      setIsConfirmingReset(true);
      setTooltip(null);

      if (resetConfirmTimeoutRef.current !== null) {
        window.clearTimeout(resetConfirmTimeoutRef.current);
      }

      resetConfirmTimeoutRef.current = window.setTimeout(() => {
        setIsConfirmingReset(false);
        resetConfirmTimeoutRef.current = null;
      }, 2400);

      return;
    }

    setIsConfirmingReset(false);
    resetLayout();
    setIsResetting(true);
    setTooltip(null);

    if (resetConfirmTimeoutRef.current !== null) {
      window.clearTimeout(resetConfirmTimeoutRef.current);
      resetConfirmTimeoutRef.current = null;
    }

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setIsResetting(false);
      resetTimeoutRef.current = null;
    }, 450);
  };

  const showTooltip = (label: string, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();

    setTooltip({
      label,
      x: rect.left + rect.width / 2,
      y: rect.top - 12,
    });
  };

  const createTooltipMouseEnterHandler =
    (label: string) => (event: ReactMouseEvent<HTMLElement>) => {
      showTooltip(label, event.currentTarget);
    };

  const createTooltipFocusHandler =
    (label: string) => (event: ReactFocusEvent<HTMLElement>) => {
      if (!event.currentTarget.matches(":focus-visible")) {
        return;
      }

      showTooltip(label, event.currentTarget);
    };

  const hideTooltip = () => {
    setTooltip(null);
  };

  const dragTooltipLabel = isDragEnabled
    ? "Sürüklemeyi kapat"
    : "Sürüklemeyi aç";
  const resetTooltipLabel = isConfirmingReset
    ? "Tekrar tıkla: sıfırla"
    : "Ayarları sıfırla";

  if (isMobile) {
    return null;
  }

  return (
    <div className={styles.siteSettings} ref={panelRef}>
      <div
        aria-label="Site ayarları"
        className={styles.siteSettingsDrawer}
        data-confirming-reset={isConfirmingReset}
        data-open={isOpen}
        role="dialog"
      >
        <div className={styles.siteSettingsPanel}>
          <button
            aria-label="Sürüklemeyi aç veya kapat"
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
            aria-label="Ayarları sıfırla"
            className={styles.siteSettingsIconButton}
            data-confirming={isConfirmingReset}
            data-resetting={isResetting}
            onBlur={hideTooltip}
            onClick={handleReset}
            onFocus={createTooltipFocusHandler(resetTooltipLabel)}
            onMouseEnter={createTooltipMouseEnterHandler(resetTooltipLabel)}
            onMouseLeave={hideTooltip}
            type="button"
          >
            <LuRotateCcw size={16} />
            {isConfirmingReset && (
              <span className={styles.siteSettingsConfirmText}>Onayla</span>
            )}
          </button>
        </div>
      </div>

      <button
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Site ayarlarını aç"
        className={styles.siteSettingsTrigger}
        data-open={isOpen}
        onClick={() => {
          setIsOpen((previousValue) => !previousValue);
        }}
        type="button"
      >
        <LuSettings className={styles.siteSettingsTriggerIcon} size={22} />
        <span className="sr-only">Ayarlar</span>
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
