import { useRef } from "react";
import getConfig from "next/config";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ScrollProvider from "@/context/scroll";
import {
  LandingSection,
  PartnershipSection,
  IntroSection,
  TransitionSection,
  GivewaySection,
  SignupSection,
  SubmissionSection,
  BehindTheScenesSection,
} from "@/sections";
import { Footer } from "@/components";

export const getStaticProps = async ({ locale }) => {
  const { publicRuntimeConfig: { localeGroups } } = getConfig();

  return {
    props: {
      ...(await serverSideTranslations(locale, localeGroups)),
    },
  };
};

const Home = () => {
  return (
    <>
      <Head>
        <title>KICKS CREW X MIRROR LIMITED EDITION MAR 2023</title>
        <meta name="description" content="KICKS CREW X MIRROR LIMITED EDITION MAR 2023" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ScrollProvider>
          <LandingSection />
          <PartnershipSection />
          <IntroSection />
          <TransitionSection />
          <GivewaySection />
          <SignupSection />
          <SubmissionSection />
          <BehindTheScenesSection />
          <Footer />
        </ScrollProvider>
      </main>
    </>
  )
};

export default Home;
