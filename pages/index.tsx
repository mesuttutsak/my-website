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
        <link rel="icon" href="hhtps://mesuttutsak.dev/favico.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="hhtps://mesuttutsak.dev/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="hhtps://mesuttutsak.dev/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="hhtps://mesuttutsak.dev/favicon-16x16.png"/>
        <link rel="manifest" href="hhtps://mesuttutsak.dev/site.webmanifest"/>
      </Head>
      <MainLayout>
        <HomePageComponent />
      </MainLayout>
    </>
  )
}
