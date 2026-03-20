'use client'

import { usePointerPosition } from "@/src/shared/hooks/usePointerPosition";
import styles from "./LightBeam.module.scss";

const LightBeam = () => {
  const beamRef = usePointerPosition();

  return <div aria-hidden="true" className={styles.lightBeam} ref={beamRef}></div>;
};

export default LightBeam;
