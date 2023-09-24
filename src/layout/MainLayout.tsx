'use client'
import SocialList from '../components/SocialList';

import { Inter } from 'next/font/google';

import { renderClasses } from "../core/utils/renderClasses";
import LightBeam from '../core/components/LightBeam/LightBeam';

const inter = Inter({ subsets: ['latin'] });

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <>
        <LightBeam />
        <div className={renderClasses(['mainLayout', inter.className])}>
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