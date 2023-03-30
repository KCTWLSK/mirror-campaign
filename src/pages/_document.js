import { Html, Head, Main, NextScript } from 'next/document';

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
        href="/fonts/DS-DIGI.woff2"
        as="font"
        type="font/woff2"
        rel="preload"
      />
      <link
        href="/fonts/DS-DIGIB.woff2"
        as="font"
        type="font/woff2"
        rel="preload"
      />
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js" defer></script>
    </Head>
    <body>
      {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5NZ4RMS"
height="0" width="0" style={{ display:'none', visibility: 'hidden' }}></iframe></noscript> */}
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
