import type { TextProps } from "./text.types";

import { cn } from "@/src/shared/lib/cn";

const Text = ({
  children,
  tag,
  customClassname = [],
  fontSize = "",
  fontWeight = "",
  color = "",
}: TextProps) => {
  const Tag = tag ?? "p";

  return (
    <Tag
      className={cn("text", ...customClassname)}
      data-fs={fontSize}
      data-fw={fontWeight}
      data-c={color}
    >
      {children}
    </Tag>
  );
};

export default Text;
