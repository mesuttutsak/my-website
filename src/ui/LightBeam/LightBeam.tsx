'use client'
import { usePointerPosition } from "@/src/shared/hooks/usePointerPosition";
import { cn } from "@/src/shared/lib/cn";

const LightBeam: React.FC = () => {
  const { x, y, hasMoved } = usePointerPosition();

  return (
    <div
      className={cn('lightBeam', hasMoved && 'show')}

      style={{
        background: `radial-gradient(100vw at ${x}px ${y}px, rgba(241, 245, 249, 1), transparent 50%)`,
      }}
    ></div>
  );
};

export default LightBeam;
