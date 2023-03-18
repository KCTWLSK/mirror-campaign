import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => (
  <Html lang="en">
    <Head>
      <link
        rel="preload"
        href="/fonts/Inter-VariableFont_slnt,wght.ttf"
        as="font"
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/BebasNeue-Regular.ttf"
        as="font"
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/digital-7.regular.ttf"
        as="font"
        type="font/ttf"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
