import React from "react";

import { LabelProps } from "./label.types";

import { renderClasses } from "../../utils/renderClasses";

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
