import { Inter } from 'next/font/google';
import { renderClasses } from "../core/utils/renderClasses";

const inter = Inter({ subsets: ['latin'] });

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <>
        {/* <LightBeam /> */}
        <div className={renderClasses(['mainLayout', inter.className])}>
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