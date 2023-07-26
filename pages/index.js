import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import MainLayout from '@/src/layout/MainLayout'
import LightBeam from '@/src/components/LightBeam/LightBeam'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <section
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <LightBeam/>
      <MainLayout>
        <Link  href={'/transformPage'}>Değiştir</Link>
      </MainLayout>
    </section>
  )
}
