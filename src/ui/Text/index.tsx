import { TextProps } from "./text.types";
import { cn } from "@/src/shared/lib/cn";

const Text = ({
  children,
  textAlign = "start",
  tag = "",
  customClassname = [],
  fontSize = "",
  fontWeight = "",
  color = "",
}: TextProps ) => {
    const Tag : any = tag ? tag : 'p';
  return (
    <Tag
      className={cn('text', ...customClassname)}
      data-fs = {fontSize}
      data-fw = {fontWeight}
      data-c = {color}
    >
      {children}
    </Tag>
  );
};

export default Text;
