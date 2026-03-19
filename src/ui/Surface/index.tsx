'use client'

import { SurfaceProps } from "./surface.types";
import { cn } from "@/src/shared/lib/cn";

const Surface = ({
  children,
  id,
  theme = "",
  fit = false,
  select = false,
  size = "",
  inOrder = false,
  customClassname = []
}: SurfaceProps ) => {
  return (
    <div
      className={cn(
        "surface",
        theme,
        size && `size_${size}`,
        inOrder && "inOrder",
        fit && "fit",
        select && "selectNone",
        ...customClassname
      )}
      id={id}
    >
      {children}
    </div>
  );
};

export default Surface;
