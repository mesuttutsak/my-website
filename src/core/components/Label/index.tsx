import React from "react";
import { renderClasses } from "../../utils/renderClasses";

export interface LabelProps {
    children?: React.ReactNode,
    htmlFor: string,
    textAlign?: string,
    fontSize?: string,
    fontWeight?: string,
    color?: string,
    customClassname?: string[]
  }

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
      className={renderClasses([
        'text',
        ...customClassname,
      ])}
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
