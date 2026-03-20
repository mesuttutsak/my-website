'use client'

import { useEffect, useRef } from "react";

const finePointerMediaQuery = "(hover: hover) and (pointer: fine)";
const reducedMotionMediaQuery = "(prefers-reduced-motion: reduce)";

function setBeamPosition(element: HTMLDivElement, x: number, y: number) {
  element.style.setProperty("--light-beam-x", `${x}px`);
  element.style.setProperty("--light-beam-y", `${y}px`);
}

function setBeamVisibility(element: HTMLDivElement, isVisible: boolean) {
  element.dataset.visible = isVisible ? "true" : "false";
}

function setBeamEnabled(element: HTMLDivElement, isEnabled: boolean) {
  element.dataset.enabled = isEnabled ? "true" : "false";
}

export function usePointerPosition() {
  const beamRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  useEffect(() => {
    const beamElement = beamRef.current;

    if (!beamElement) {
      return;
    }

    const finePointerMedia = window.matchMedia(finePointerMediaQuery);
    const reducedMotionMedia = window.matchMedia(reducedMotionMediaQuery);

    const isEffectEnabled = () =>
      finePointerMedia.matches && !reducedMotionMedia.matches;

    const setDefaultPosition = () => {
      const nextPosition = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };

      positionRef.current = nextPosition;
      setBeamPosition(beamElement, nextPosition.x, nextPosition.y);
    };

    const flushPosition = () => {
      frameRef.current = null;

      setBeamPosition(
        beamElement,
        positionRef.current.x,
        positionRef.current.y
      );
    };

    const schedulePositionUpdate = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(flushPosition);
    };

    const syncEffectState = () => {
      const enabled = isEffectEnabled();

      setBeamEnabled(beamElement, enabled);

      if (!enabled) {
        hasMovedRef.current = false;
        setBeamVisibility(beamElement, false);

        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }

        return;
      }

      setDefaultPosition();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isEffectEnabled()) {
        return;
      }

      positionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setBeamVisibility(beamElement, true);
      }

      schedulePositionUpdate();
    };

    const handleResize = () => {
      if (!isEffectEnabled() || hasMovedRef.current) {
        return;
      }

      setDefaultPosition();
    };

    const handlePreferenceChange = () => {
      syncEffectState();
    };

    syncEffectState();

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("resize", handleResize);
    finePointerMedia.addEventListener("change", handlePreferenceChange);
    reducedMotionMedia.addEventListener("change", handlePreferenceChange);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      finePointerMedia.removeEventListener("change", handlePreferenceChange);
      reducedMotionMedia.removeEventListener("change", handlePreferenceChange);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return beamRef;
}
