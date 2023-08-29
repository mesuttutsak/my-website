'use client'

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";

export const DraggableElement = ({
  children,
  customClassname = []
}: {
  children: React.ReactNode,
  customClassname?: string[]
}) => {
  const dragableEl: any = useRef();

  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos]: any = useState({});

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setMousePos(event);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const dragAnimation: any = () => {
    if (dragging) {
      dragableEl.current.style.transform = `translateX(${position.x}px) translateY(${position.y}px)`;
    }
  };

  useLayoutEffect(() => {
    if (dragging) {
      requestAnimationFrame(dragAnimation);
    } else {
      cancelAnimationFrame(dragAnimation);
    }
  }, [position]);

  const handleMouseDown = (event: any) => {
    setDragging(true);
  };

  const handleMouseUp = (event: any) => {
    setDragging(false);
  };

  const handleMouseMove = (event: any) => {
    const { movementX, movementY, clientX, clientY, view, target } = event;
    const { innerWidth: browserWidth, innerHeight: browserHeight } = view;
    const { offsetHeight: elmHeight, offsetWidth } = target;

    let targetOfset = target.getBoundingClientRect();
    let { top, right, bottom, left } = targetOfset;

    if (dragging) {
      const dx =
        (left <= 0 && movementX < 0) || (right > browserWidth && movementX > 0)
          ? 0
          : movementX;
      const dy =
        (top <= 0 && movementY < 0) || (bottom > browserHeight && movementY > 0)
          ? 0
          : movementY;
    }
  };

  useEffect(() => {
    if (dragging) {
      const { innerWidth: browserWidth, innerHeight: browserHeight } = window;
      let targetOfset = dragableEl?.current?.getBoundingClientRect();
      let { top, right, bottom, left } = targetOfset;
      let { movementX, movementY, x, y } = mousePos;

      const dx = movementX;
      const dy = movementY;

      setPosition((prevState) => ({
        x: prevState.x + dx,
        y: prevState.y + dy,
      }));
    }
  }, [mousePos, dragging]);

  return (
    <div
      className={`draggableElement ${dragging && 'draggable' }`}
      ref={dragableEl}
      onMouseMoveCapture={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      draggable={false}
    >
      {children}
    </div>
  );
};

const DraggableProvider = ({ children }: { children: React.ReactNode }) => {
  return <div className="draggableProvider">{children}</div>;
};

export default DraggableProvider;
