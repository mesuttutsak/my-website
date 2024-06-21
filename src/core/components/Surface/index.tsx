'use client'

import React from "react";

import { SurfaceProps } from "./surface.types";

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
    <div className={`surface ${theme}  ${!!size ? `size_${size}` : ''} ${inOrder ? `inOrder` : ''} ${fit ? 'fit' : ""} ${select ? "selectNone" : ""} ${customClassname?.length > 0 ? customClassname.map(e => e).join(' ') : ""}`} id={id}>
      {children}
    </div>
  );
};

export default Surface;
