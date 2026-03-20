'use client'

import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useSiteSettings } from "@/src/features/site-settings/context";
import { getDraggableLayoutStorageKey } from "@/src/features/site-settings/storage";
import { cn } from "@/src/shared/lib/cn";

interface Position {
  x: number;
  y: number;
}

interface DragSession {
  pointerId: number;
  pointerStart: Position;
  positionStart: Position;
  bounds: {
    minDeltaX: number;
    maxDeltaX: number;
    minDeltaY: number;
    maxDeltaY: number;
  };
}

interface DraggableElementProps {
  children: ReactNode;
  customClassname?: string[];
  disabled?: boolean;
  initialPosition?: Position;
  storageKey?: string;
}

const defaultPosition: Position = { x: 0, y: 0 };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function isDragHandleTarget(target: EventTarget | null) {
  return target instanceof Element
    ? Boolean(target.closest("[data-drag-handle='true']"))
    : false;
}

export const DraggableElement = ({
  children,
  customClassname = [],
  disabled = false,
  initialPosition = defaultPosition,
  storageKey,
}: DraggableElementProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const dragSessionRef = useRef<DragSession | null>(null);
  const hasHydratedRef = useRef(false);
  const positionRef = useRef<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const { isDragEnabled, layoutResetVersion } = useSiteSettings();
  const isDragDisabled = disabled || !isDragEnabled;

  const applyPosition = useCallback((position: Position) => {
    positionRef.current = position;

    if (!elementRef.current) {
      return;
    }

    elementRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
  }, []);

  const persistPosition = useCallback(() => {
    if (!storageKey || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      getDraggableLayoutStorageKey(storageKey),
      JSON.stringify(positionRef.current)
    );
  }, [storageKey]);

  const endDragging = useCallback(() => {
    dragSessionRef.current = null;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!storageKey) {
      applyPosition(initialPosition);
      return;
    }

    try {
      const rawValue = window.localStorage.getItem(
        getDraggableLayoutStorageKey(storageKey)
      );

      if (!rawValue) {
        applyPosition(initialPosition);
        return;
      }

      const parsedValue = JSON.parse(rawValue) as Partial<Position>;

      if (
        typeof parsedValue.x === "number" &&
        typeof parsedValue.y === "number"
      ) {
        applyPosition({ x: parsedValue.x, y: parsedValue.y });
        return;
      }
    } catch {
      // Ignore malformed localStorage values and fallback to defaults.
    }

    applyPosition(initialPosition);
  }, [applyPosition, initialPosition, storageKey]);

  useEffect(() => {
    if (!hasHydratedRef.current) {
      hasHydratedRef.current = true;
      return;
    }

    if (storageKey && typeof window !== "undefined") {
      window.localStorage.removeItem(getDraggableLayoutStorageKey(storageKey));
    }

    applyPosition(initialPosition);
  }, [applyPosition, initialPosition, layoutResetVersion, storageKey]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isDragDisabled && isDragging && elementRef.current) {
      if (dragSessionRef.current) {
        persistPosition();
      }

      endDragging();
    }
  }, [endDragging, isDragDisabled, isDragging, persistPosition]);

  const schedulePositionUpdate = () => {
    if (frameRef.current !== null) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;

      if (!elementRef.current) {
        return;
      }

      const { x, y } = positionRef.current;
      elementRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      isDragDisabled ||
      event.button !== 0 ||
      !isDragHandleTarget(event.target)
    ) {
      return;
    }

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    dragSessionRef.current = {
      pointerId: event.pointerId,
      pointerStart: {
        x: event.clientX,
        y: event.clientY,
      },
      positionStart: { ...positionRef.current },
      bounds: {
        minDeltaX: -rect.left,
        maxDeltaX: window.innerWidth - rect.right,
        minDeltaY: -rect.top,
        maxDeltaY: window.innerHeight - rect.bottom,
      },
    };

    element.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragSession = dragSessionRef.current;

    if (!dragSession || dragSession.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = clamp(
      event.clientX - dragSession.pointerStart.x,
      dragSession.bounds.minDeltaX,
      dragSession.bounds.maxDeltaX
    );
    const deltaY = clamp(
      event.clientY - dragSession.pointerStart.y,
      dragSession.bounds.minDeltaY,
      dragSession.bounds.maxDeltaY
    );

    positionRef.current = {
      x: dragSession.positionStart.x + deltaX,
      y: dragSession.positionStart.y + deltaY,
    };

    schedulePositionUpdate();
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    persistPosition();
    endDragging();
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    persistPosition();
    endDragging();
  };

  return (
    <div
      className={cn("draggableElement", ...customClassname)}
      data-dragging={isDragging}
      data-disabled={isDragDisabled}
      draggable={false}
      onLostPointerCapture={() => {
        persistPosition();
        endDragging();
      }}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={elementRef}
    >
      {children}
    </div>
  );
};

export default DraggableElement;
