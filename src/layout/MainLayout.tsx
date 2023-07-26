import Header from "../components/Header"
import LightBeam from "../core/components/LightBeam/LightBeam"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <>
        {/* <LightBeam /> */}
        <div className="container mx-auto px-36">
            <div className="wrapper">
                <Header />
                <main className="w-1/2 h-fit ml-auto overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    </>
  )
}

export default MainLayout