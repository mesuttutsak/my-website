'use client'
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

import { cn } from "@/src/shared/lib/cn";
import LightBeam from "@/src/ui/LightBeam";

const inter = Inter({ subsets: ['latin'] });

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
        <LightBeam />
        <div className={cn('mainLayout', inter.className)}>
            {/* <div className="wrapper"> */}
                {/* <Header /> */}
                <main>
                    {/* <SocialList /> */}
                    {children}
                </main>
            {/* </div> */}
        </div>
    </>
  )
}

export default MainLayout
