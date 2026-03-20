'use client'

import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

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
}: DraggableElementProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const dragSessionRef = useRef<DragSession | null>(null);
  const positionRef = useRef<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    positionRef.current = initialPosition;

    const element = elementRef.current;

    if (!element) {
      return;
    }

    element.style.transform = `translate3d(${initialPosition.x}px, ${initialPosition.y}px, 0)`;
  }, [initialPosition]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

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

  const endDragging = () => {
    dragSessionRef.current = null;
    setIsDragging(false);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || event.button !== 0 || !isDragHandleTarget(event.target)) {
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

    endDragging();
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    endDragging();
  };

  return (
    <div
      className={cn("draggableElement", ...customClassname)}
      data-dragging={isDragging}
      data-disabled={disabled}
      draggable={false}
      onLostPointerCapture={endDragging}
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
