'use client'

import { usePointerPosition } from "@/src/shared/hooks/usePointerPosition";

const LightBeam = () => {
  const beamRef = usePointerPosition();

  return <div aria-hidden="true" className="lightBeam" ref={beamRef}></div>;
};

export default LightBeam;
