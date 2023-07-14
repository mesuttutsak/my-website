import MainLayout from '@/src/layout/mainLayout';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'

const OtherPage = () => {

    const router = useRouter();


  return (
    <section>
        <MainLayout>
            <Link  href={'/'}>Değiştir</Link>
        </MainLayout>
    </section>
  )
}

export default OtherPage