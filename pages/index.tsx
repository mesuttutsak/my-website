import { Inter } from 'next/font/google'
import MainLayout from '@/src/layout/MainLayout'
import HomePageComponent from '@/src/components/HomePage'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Mesut Tutsak - Frontend Developer</title>
        <meta name="description" content="Benim adım Mesut Tutsak, bir Frontend Developer'ım ve bu benim kişisel websitesidir." />
        <meta name="keywords" content="Mesut Tutsak, Frontend Developer, web developer, websitesi, frontend, HTML, CSS, JavaScript" />
        <meta name="author" content="Mesut Tutsak" />

        {/* <!-- Favicon --> */}
        <link rel="icon" href="https://www.mesuttutsak.dev/favicon.ico" sizes="any" />

        <link rel="apple-touch-icon" sizes="180x180" href="https://www.mesuttutsak.dev/apple-touch-icon.png"/>

        <link rel="icon" type="image/png" sizes="512x512" href="https://www.mesuttutsak.dev/android-chrome-192x192.png"/>
        <link rel="icon" type="image/png" sizes="192x192" href="https://www.mesuttutsak.dev/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="https://www.mesuttutsak.dev/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="https://www.mesuttutsak.dev/favicon-16x16.png"/>

        {/* <!-- Manifest --> */}
        <link rel="manifest" href="https://www.mesuttutsak.dev/site.webmanifest"/>
        <link rel="manifest" href="https://www.mesuttutsak.dev/manifest.json" />
      </Head>
      <MainLayout>
        <HomePageComponent />
      </MainLayout>
    </>
  )
}
