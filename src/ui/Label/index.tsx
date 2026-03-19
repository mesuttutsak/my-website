import { LabelProps } from "./label.types";
import { cn } from "@/src/shared/lib/cn";

const Label = ({
  children,
  htmlFor = "",
  customClassname = [],
  fontSize = "",
  fontWeight = "",
  color = "",
}: LabelProps ) => {
  return (
    <label
      className={cn('text', ...customClassname)}
      htmlFor={htmlFor}
      data-fs = {fontSize}
      data-fw = {fontWeight}
      data-c = {color}
    >
      {children}
    </label>
  );
};

export default Label;
