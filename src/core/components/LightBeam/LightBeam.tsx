import { useState, useEffect } from 'react';

const LightBeam: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={'lightBeam'}
      
      style={{
        background: `radial-gradient(40vw at ${position.x}px ${position.y}px, rgba(226, 232, 240, 1), transparent 50%)`,
      }}
    ></div>
  );
};

export default LightBeam;
