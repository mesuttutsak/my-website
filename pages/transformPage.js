import MainLayout from "@/src/layout/MainLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const OtherPage = () => {
  const router = useRouter();

  const element = useRef();
  const outlineEl = useRef();

  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({});


  const [outerPosition, setOuterPosition] = useState(null);

  useEffect(() => {

  }, [outerPosition])

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos(event);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, []);

  useEffect(() => {

    if (dragging) {
      const {innerWidth : browserWidth, innerHeight: browserHeight} = window;
      let targetOfset = element?.current?.getBoundingClientRect();
      let {top, right, bottom, left} = targetOfset;
      let {movementX, movementY, x, y} = mousePos;

      ((left > browserWidth) || (right < 0)) ? setOuterPosition({show: true, top: top}) : setOuterPosition(null);

      // x > browserWidth && setDragging(false);
      // y > browserHeight && setDragging(false);
      
      // movementX = (( x > browserWidth ) || ( x < 0 )) || ( y > browserHeight ) || ( y < 0 ) ? 0 : movementX;
      // movementY = ( y > browserHeight ) || ( y < 0 ) ? 0 : movementY;

      // const dx = (left <= 0 && movementX < 0) || (right > browserWidth &&  movementX > 0) ? 0 : movementX ;
      // const dy = (top <= 0 && movementY < 0) || (bottom > browserHeight &&  movementY > 0) ? 0 : movementY ;
      
      const dx = movementX ;
      const dy = movementY ;

      setPosition((prevState) => ({ x: prevState.x + dx , y: prevState.y + dy, }));
    }
  }, [mousePos, dragging])

  const dragAnimation = () => {
    if (dragging) {
        element.current.style.transform = `translateX(${position.x}px) translateY(${position.y}px)`;
    }
  }

  useEffect(() => {
    if (dragging) {
      requestAnimationFrame(dragAnimation);
    } else {
      cancelAnimationFrame(dragAnimation);
    }
  }, [position])

  useEffect(() => {
    if (dragging) {
      element.current.style.cursor = `all-scroll`;
    } else {
      element.current.style.cursor = `pointer`;
    }

  }, [dragging])

  const handleMouseDown = (event) => {
    setDragging(true);
  };

  const handleMouseLeave = (event) => {
    setDragging(false);
  };

  const handleMouseUp = (event) => {
    setDragging(false);
  };

  const handleMouseMove = (event) => {
    const {movementX, movementY , clientX, clientY, view, target} = event;
    const {innerWidth : browserWidth, innerHeight: browserHeight} = view;
    const {offsetHeight: elmHeight, offsetWidth} = target;

    let targetOfset = target.getBoundingClientRect();
    let {top, right, bottom, left} = targetOfset;
    
    if (dragging) {
      const dx = (left <= 0 && movementX < 0) || (right > browserWidth &&  movementX > 0) ? 0 : movementX ;
      const dy = (top <= 0 && movementY < 0) || (bottom > browserHeight &&  movementY > 0) ? 0 : movementY ;
    }
  };

  return (
    <section>
      <MainLayout>
        <div
          className="draggableParent"
        >
          <div className="draggableElement"
            ref={element}
            // onMouseLeave={handleMouseLeave}
            onMouseMoveCapture={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >Draggable Element</div>
          <div className={`outerLine ${outerPosition && 'show'}`} ref={outlineEl}></div>

        </div>
      </MainLayout>
    </section>
  );
};

export default OtherPage;
