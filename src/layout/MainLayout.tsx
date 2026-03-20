'use client'

import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { cn } from "@/src/shared/lib/cn";
import LightBeam from "@/src/ui/LightBeam";

const inter = Inter({ subsets: ["latin"] });

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <LightBeam />
      <div className={cn("mainLayout", inter.className)}>
        <main>{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
