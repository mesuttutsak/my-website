import React from "react";
import { renderClasses } from "../../utils/renderClasses";

interface TextProps {
    children: React.ReactNode,
    tag?: string,
    textAlign?: string,
    fontSize?: string,
    fontWeight?: string,
    color?: string,
    customClassname?: string[]
  }

const Text = ({
  children,
  textAlign = "start",
  tag = "",
  customClassname = [],
  fontSize = "",
  fontWeight = "",
  color = "",
//   lineHeight = null,
//   fontWeight = null,
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
