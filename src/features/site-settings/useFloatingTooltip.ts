'use client'

import type {
  FocusEvent as ReactFocusEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import { useCallback, useState } from "react";

export interface TooltipState {
  label: string;
  x: number;
  y: number;
}

export function useFloatingTooltip() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const showTooltip = useCallback((label: string, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();

    setTooltip({
      label,
      x: rect.left + rect.width / 2,
      y: rect.top - 12,
    });
  }, []);

  const createTooltipMouseEnterHandler = useCallback(
    (label: string) => (event: ReactMouseEvent<HTMLElement>) => {
      showTooltip(label, event.currentTarget);
    },
    [showTooltip]
  );

  const createTooltipFocusHandler = useCallback(
    (label: string) => (event: ReactFocusEvent<HTMLElement>) => {
      if (!event.currentTarget.matches(":focus-visible")) {
        return;
      }

      showTooltip(label, event.currentTarget);
    },
    [showTooltip]
  );

  const hideTooltip = useCallback(() => {
    setTooltip(null);
  }, []);

  return {
    createTooltipFocusHandler,
    createTooltipMouseEnterHandler,
    hideTooltip,
    tooltip,
  };
}
