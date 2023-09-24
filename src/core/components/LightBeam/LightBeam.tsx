'use client'
import { useState, useEffect, useLayoutEffect } from 'react';
import { renderClasses } from '../../utils/renderClasses';

const LightBeam: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number, show: boolean }>({ x: 0, y: 0, show: false });

  useLayoutEffect(() => {
    setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2, show: false });
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY, show: true });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={renderClasses(['lightBeam', position.show ? 'show' : ''])}

      style={{
        background: `radial-gradient(100vw at ${position.x}px ${position.y}px, rgba(241, 245, 249, 1), transparent 50%)`,
      }}
    ></div>
  );
};

export default LightBeam;
