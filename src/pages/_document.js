import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => (
  <Html lang="en">
    <Head>
      <link
        href="/fonts/GnuUnifontFull-Pm9P.woff2"
        as="font"
        type="font/woff2"
        rel="preload"
      />
      <link
        href="/fonts/Inter-VariableFont_slnt,wght.woff2"
        as="font"
        type="font/woff2"
        rel="preload"
      />
      <link
        href="/fonts/BebasNeue-Regular.woff2"
        as="font"
        type="font/woff2"
        rel="preload"
      />
      <link
        href="/fonts/DIGI.woff2"
        as="font"
        type="font/woff2"
        rel="preload"
      />
      <link
        href="/fonts/DIGIB.woff2"
        as="font"
        type="font/woff2"
        rel="preload"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
