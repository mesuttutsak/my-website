import { useState, useEffect } from 'react';

import styles from "./lightBeam.module.scss";

const LightBeam = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={styles.lightBeam}
      style={{
        background: `radial-gradient(50vw at ${position.x}px ${position.y}px, rgba(255, 255, 255, .15), transparent 80%)`,
    }}
    ></div>
  );
};

export default LightBeam;
