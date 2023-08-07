import HomePageComponent from '@/src/components/HomePage';
import MainLayout from '@/src/layout/MainLayout';
import Head from 'next/head';
import React from 'react';

const Contact = () => {
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
        <link rel="icon" type="image/png" sizes="32x32" href="https://www.mesuttutsak.dev/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="https://www.mesuttutsak.dev/favicon-16x16.png"/>
        <link rel="manifest" href="https://www.mesuttutsak.dev/site.webmanifest"/>
      </Head>
      <MainLayout>
       <span className='bg-red px-2 rounded-xl'>contact layout</span>
      </MainLayout>
    </>
  )
}

export default Contact