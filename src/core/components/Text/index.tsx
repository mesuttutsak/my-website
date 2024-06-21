import React from "react";

import { renderClasses } from "../../utils/renderClasses";

import { TextProps } from "./text.types";

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
      className={renderClasses([
        'text',
        ...customClassname,
      ])}
      data-fs = {fontSize}
      data-fw = {fontWeight}
      data-c = {color}
    >
      {children}
    </Tag>
  );
};

export default Text;
