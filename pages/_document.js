import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/assets/images/logo.svg" />
      </Head>
      <body className='tiptop-body'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}