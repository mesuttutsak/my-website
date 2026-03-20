'use client'

import { cn } from "@/src/shared/lib/cn";
import type { SurfaceProps } from "./surface.types";
import styles from "./Surface.module.scss";

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
        styles.surface,
        theme === "dark" && styles.dark,
        theme && theme !== "dark" && theme,
        size === "small" && styles.sizeSmall,
        size && size !== "small" && `size_${size}`,
        inOrder && styles.inOrder,
        fit && styles.fit,
        select && styles.selectNone,
        ...customClassname
      )}
      id={id}
    >
      {children}
    </div>
  );
};

export default Surface;
