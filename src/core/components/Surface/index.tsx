'use client'

import React from "react";

const Surface = ({
  children,
  id,
  theme = "",
  fit = false,
  select = false,
  size= ""
}: {
  children: React.ReactNode;
  theme?: string;
  id?: string;
  select?: boolean;
  size?: string;
  fit?: boolean
}) => {
  return (
    <div className={`surface ${theme}  ${!!size && `size_${size}`} ${fit && 'fit'} ${select && "selectNone"}`} id={id}>
      {children}
    </div>
  );
};

export default Surface;
