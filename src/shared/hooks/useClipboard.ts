'use client'

import { useEffect, useRef, useState } from "react";

import { writeToClipboard } from "@/src/shared/lib/clipboard";

export function useClipboard(text: string, timeout = 2000) {
  const timeoutRef = useRef<number | null>(null);
  const [copied, setCopied] = useState(false);

  const reset = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setCopied(false);
  };

  const copy = async (nextText = text) => {
    await writeToClipboard(nextText);
    reset();
    setCopied(true);

    timeoutRef.current = window.setTimeout(() => {
      setCopied(false);
      timeoutRef.current = null;
    }, timeout);
  };

  useEffect(() => reset, []);

  return {
    copied,
    copy,
    reset,
  };
}
