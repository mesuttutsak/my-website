import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import MainLayout from '@/src/layout/mainLayout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <section
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <MainLayout>
        <Link  href={'/otherPage'}>Değiştir</Link>
      </MainLayout>
    </section>
  )
}
