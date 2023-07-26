import Image from 'next/image'
import { Inter } from 'next/font/google'
import MainLayout from '@/src/layout/MainLayout'
import HomePageComponent from '@/src/components/HomePage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <MainLayout>
        <HomePageComponent>
          adasda
        </HomePageComponent>
      </MainLayout>
    </>
  )
}
