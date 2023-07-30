'use client'

import React from "react";

const Surface = ({
  children,
  id,
  theme = "",
  fit = false,
  select = false,
  size = "",
  inOrder = false,
  customClassname = []
}: {
  children: React.ReactNode;
  theme?: string;
  id?: string;
  select?: boolean;
  size?: string;
  fit?: boolean;
  inOrder?: boolean;
  customClassname?: string[]
}) => {
  return (
    <div className={`surface ${theme}  ${!!size ? `size_${size}` : ''} ${inOrder ? `inOrder` : ''} ${fit ? 'fit' : ""} ${select ? "selectNone" : ""} ${customClassname?.length > 0 ? customClassname.map(e => e).join(' ') : ""}`} id={id}>
      {children}
    </div>
  );
};

export default Surface;
