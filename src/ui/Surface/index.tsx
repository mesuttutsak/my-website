'use client'

import { cn } from "@/src/shared/lib/cn";
import type { SurfaceProps } from "./surface.types";
import styles from "./Surface.module.scss";

const Surface = ({
  children,
  id,
  variant = "default",
  fit = false,
  select = false,
  size = "",
  inOrder = false,
  customClassname = []
}: SurfaceProps ) => {
  return (
    <div
      className={cn(
        styles.surface,
        size === "small" && styles.sizeSmall,
        size && size !== "small" && `size_${size}`,
        inOrder && styles.inOrder,
        fit && styles.fit,
        select && styles.selectNone,
        ...customClassname
      )}
      data-variant={variant}
      id={id}
    >
      {children}
    </div>
  );
};

export default Surface;
