import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import Button from "@mui/material/Button";

import {
  VAR_OFF_SCREEN, VAR_ON_SCREEN,
  TRANS_DELAY_INIT,
  SECTION_SUBMISSION, SECTION_SIGNUP,
  CAMPAIGN_GIVEAWAY,
} from "@/data/constants";
import { Section, SectionBanner } from "@/components";
import Accordion from "../Accordion";

import styles from "./styles.module.scss";

import igDemoImg from "@/../public/assets/ig_demo.png";
import igDemoBgImg from "@/../public/assets/ig_demo_bg.png";
import groupImg from "@/../public/assets/mirror_group_cascaded.png";

const TRANS_DURATION = 0.5;
const TRANS_DELAY_LONG = 0.75;

const SignupSection = () => {
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  const renderBackground = () => (
    <div className="background">
      <div className="blurryBgWrapper">
        <Image src={igDemoBgImg} alt="instagram demo view bg" placeholder="blur" />
      </div>
      <div className="curtain" />
    </div>
  );

  const renderIgDemoView = () => (
    <motion.div
      variants={{
        [VAR_OFF_SCREEN]: { scale: 0.5, rotate: '30deg', filter: 'blur(8px)' },
        [VAR_ON_SCREEN]: {
          scale: 1,
          rotate: 0,
          filter: new Array(8).fill(0).map((_, index, arr) => `blur(${(arr.length - 1) - index}px)`),
          transition: {
            duration: TRANS_DURATION,
            delay: TRANS_DELAY_LONG,
          },
        },
      }}
      className="igDemoViewImgWrapper"
    >
      <Image src={igDemoImg} alt="instagram demo view" placeholder="blur" />
    </motion.div>
  );

  const renderInstructionBlock = () => (
    <div className="block instruction">
      <h1>{t('signup.header')}</h1>
      <div className="description">{t('signup.description')}</div>
      <div className="accordionContainer">
        <div className="accordionInnerContainer">
          <Accordion name="step1" />
          <Accordion name="step2" />
          <Accordion name="step3" />
          <Accordion name="step4" />
        </div>
      </div>
    </div>
  );

  const renderPromptBlock = () => (
    <div className="block prompt">
      <h2>{t('signup.prompt')}</h2>
      <div className="imgWrapper">
        <Image src={groupImg} alt="MIRROR group" placeholder="blur" />
      </div>
      <Button variant="contained" href={`#${SECTION_SUBMISSION}`}>
        {t('signup.CTA')}
      </Button>
    </div>
  );

  return (
    <Section
      id={SECTION_SIGNUP}
      className={styles.signupSection}
      viewport={{ once: true, amount: (1 / 2) * 0.8 }}
    >
      {renderBackground()}
      <div className="foreground">
        {renderIgDemoView()}
        {renderInstructionBlock()}
        {renderPromptBlock()}
      </div>
      <SectionBanner type={CAMPAIGN_GIVEAWAY} />
    </Section>
  );
};

export default SignupSection;
