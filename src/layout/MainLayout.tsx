import Header from "../components/Header"
import LightBeam from "../core/components/LightBeam/LightBeam"

import { Inter } from 'next/font/google';
import { renderClasses } from "../core/utils/renderClasses";

const inter = Inter({ subsets: ['latin'] });

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <>
        {/* <LightBeam /> */}
        <div className={renderClasses(['xl:container mx-auto xl:px-6 sm:p-12 p-0', inter.className])}>
            {/* <div className="wrapper"> */}
                {/* <Header /> */}
                <main>
                    {children}
                </main>
            {/* </div> */}
        </div>
    </>
  )
}

export default MainLayout