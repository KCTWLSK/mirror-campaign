import Head from "next/head";

import {
  LandingSection,
  HeroSection,
  BehindTheScenesSection,
  MemorabiliaSection,
} from "@/sections";
import { Footer } from "@/components";
import ScrollProvider from "@/context/scroll";

const Home = () => (
  <>
    <Head>
      <title>KICKS CREW X MIRROR LIMITED EDITION MAR 2023</title>
      <meta name="description" content="KICKS CREW X MIRROR LIMITED EDITION MAR 2023" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ScrollProvider>
      <h1 style={{ display: 'none' }}>KICKS CREW x MIRROR 2023</h1>
      <LandingSection />
      <HeroSection />
      <MemorabiliaSection />
      <BehindTheScenesSection />
      <Footer />
    </ScrollProvider>
  </>
);

// must have for exporting static html
Home.getInitialProps = async (ctx) => {
  const localVal = ctx.query['lang'] ? ctx.defaultLocale : 'zh-HK'
  return { locale: localVal }
};

export default Home;
