'use client'

import { useEffect, useState } from "react";

const defaultMobileBreakpoint = 640;

function createMaxWidthQuery(breakpoint: number) {
  return `(max-width: ${breakpoint - 0.02}px)`;
}

function getMatches(query: string) {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(query).matches;
}

export function useIsMobile(breakpoint = defaultMobileBreakpoint) {
  const query = createMaxWidthQuery(breakpoint);
  const [isMobile, setIsMobile] = useState(() => getMatches(query));

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return isMobile;
}
