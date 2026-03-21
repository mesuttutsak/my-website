'use client'

import { useEffect, useRef } from "react";

const finePointerMediaQuery = "(hover: hover) and (pointer: fine)";
const reducedMotionMediaQuery = "(prefers-reduced-motion: reduce)";

function setBeamPosition(element: HTMLDivElement, x: number, y: number) {
  element.style.setProperty("--grid-focus-x", `${x}px`);
  element.style.setProperty("--grid-focus-y", `${y}px`);
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
  const idleTimeoutRef = useRef<number | null>(null);
  const currentPositionRef = useRef({ x: 0, y: 0 });
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);

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

      currentPositionRef.current = nextPosition;
      targetPositionRef.current = nextPosition;
      setBeamPosition(beamElement, nextPosition.x, nextPosition.y);
    };

    const setGridVisibility = (isVisible: boolean) => {
      if (isVisibleRef.current === isVisible) {
        return;
      }

      isVisibleRef.current = isVisible;
      setBeamVisibility(beamElement, isVisible);
    };

    const animatePosition = () => {
      frameRef.current = null;

      const currentPosition = currentPositionRef.current;
      const targetPosition = targetPositionRef.current;
      const deltaX = targetPosition.x - currentPosition.x;
      const deltaY = targetPosition.y - currentPosition.y;

      currentPositionRef.current = {
        x: currentPosition.x + deltaX * 0.16,
        y: currentPosition.y + deltaY * 0.16,
      };

      setBeamPosition(
        beamElement,
        currentPositionRef.current.x,
        currentPositionRef.current.y
      );

      if (Math.abs(deltaX) + Math.abs(deltaY) > 0.2) {
        frameRef.current = window.requestAnimationFrame(animatePosition);
      }
    };

    const syncEffectState = () => {
      const enabled = isEffectEnabled();

      setBeamEnabled(beamElement, enabled);

      if (!enabled) {
        setGridVisibility(false);

        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }

        if (idleTimeoutRef.current !== null) {
          window.clearTimeout(idleTimeoutRef.current);
          idleTimeoutRef.current = null;
        }

        return;
      }

      setDefaultPosition();
    };

    const schedulePositionUpdate = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(animatePosition);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isEffectEnabled()) {
        return;
      }

      targetPositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      setGridVisibility(true);

      if (idleTimeoutRef.current !== null) {
        window.clearTimeout(idleTimeoutRef.current);
      }

      idleTimeoutRef.current = window.setTimeout(() => {
        setGridVisibility(false);
        idleTimeoutRef.current = null;
      }, 850);

      schedulePositionUpdate();
    };

    const handleResize = () => {
      if (!isEffectEnabled()) {
        return;
      }

      setDefaultPosition();
    };

    const handleWindowBlur = () => {
      setGridVisibility(false);
    };

    const handlePreferenceChange = () => {
      syncEffectState();
    };

    syncEffectState();

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("resize", handleResize);
    window.addEventListener("blur", handleWindowBlur);
    finePointerMedia.addEventListener("change", handlePreferenceChange);
    reducedMotionMedia.addEventListener("change", handlePreferenceChange);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("blur", handleWindowBlur);
      finePointerMedia.removeEventListener("change", handlePreferenceChange);
      reducedMotionMedia.removeEventListener("change", handlePreferenceChange);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      if (idleTimeoutRef.current !== null) {
        window.clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  return beamRef;
}
