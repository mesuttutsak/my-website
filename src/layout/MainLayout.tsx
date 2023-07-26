const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen w-screen">
        {children}
    </main>
  )
}

export default MainLayout