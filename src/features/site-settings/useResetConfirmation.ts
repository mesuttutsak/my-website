'use client'

import { useCallback, useEffect, useRef, useState } from "react";

interface UseResetConfirmationOptions {
  confirmDurationMs?: number;
  onConfirm: () => void;
  resetDurationMs?: number;
}

export function useResetConfirmation({
  confirmDurationMs = 2400,
  onConfirm,
  resetDurationMs = 450,
}: UseResetConfirmationOptions) {
  const confirmTimeoutRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    return () => {
      if (confirmTimeoutRef.current !== null) {
        window.clearTimeout(confirmTimeoutRef.current);
      }

      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const cancelResetConfirmation = useCallback(() => {
    setIsConfirmingReset(false);

    if (confirmTimeoutRef.current !== null) {
      window.clearTimeout(confirmTimeoutRef.current);
      confirmTimeoutRef.current = null;
    }
  }, []);

  const clearResetFeedback = useCallback(() => {
    setIsResetting(false);

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
  }, []);

  const resetResetState = useCallback(() => {
    cancelResetConfirmation();
    clearResetFeedback();
  }, [cancelResetConfirmation, clearResetFeedback]);

  const handleReset = useCallback(() => {
    if (!isConfirmingReset) {
      setIsConfirmingReset(true);

      if (confirmTimeoutRef.current !== null) {
        window.clearTimeout(confirmTimeoutRef.current);
      }

      confirmTimeoutRef.current = window.setTimeout(() => {
        setIsConfirmingReset(false);
        confirmTimeoutRef.current = null;
      }, confirmDurationMs);

      return;
    }

    cancelResetConfirmation();
    onConfirm();
    setIsResetting(true);

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setIsResetting(false);
      resetTimeoutRef.current = null;
    }, resetDurationMs);
  }, [
    cancelResetConfirmation,
    confirmDurationMs,
    isConfirmingReset,
    onConfirm,
    resetDurationMs,
  ]);

  return {
    cancelResetConfirmation,
    clearResetFeedback,
    handleReset,
    isConfirmingReset,
    isResetting,
    resetResetState,
  };
}
