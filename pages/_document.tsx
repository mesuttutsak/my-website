import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='scroll-smooth' lang="en">
      <Head />
      <body className='bg-slate-900 leading-relaxed text-white selection:bg-teal-300 selection:text-teal-900 overflow-auto'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
