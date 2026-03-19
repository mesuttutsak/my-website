'use client'

import { useEffect, useState } from "react";

interface PointerPositionState {
  x: number;
  y: number;
  hasMoved: boolean;
}

export function usePointerPosition(): PointerPositionState {
  const [position, setPosition] = useState<PointerPositionState>({
    x: 0,
    y: 0,
    hasMoved: false,
  });

  useEffect(() => {
    setPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      hasMoved: false,
    });

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
        hasMoved: true,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
}
