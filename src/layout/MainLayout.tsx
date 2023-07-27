import Header from "../components/Header"
import LightBeam from "../core/components/LightBeam/LightBeam"

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <>
        <LightBeam />
        <div className={`container mx-auto ${inter.className}`}>
            {/* <div className="wrapper"> */}
                <Header />
                <main>
                    {children}
                </main>
            {/* </div> */}
        </div>
    </>
  )
}

export default MainLayout