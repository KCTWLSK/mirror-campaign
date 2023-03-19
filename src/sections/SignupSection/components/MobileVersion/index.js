import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";

import {
  VAR_OFF_SCREEN, VAR_ON_SCREEN,
  SECTION_SIGNUP,
  CAMPAIGN_GIVEAWAY,
} from "@/data/constants";
import { Section, Button, SectionBanner } from "@/components";

import styles from "./styles.module.scss";

import igDemoImg from "@/../public/assets/ig_demo.png";
import igDemoBgImg from "@/../public/assets/ig_demo_bg.png";

const TRANS_DURATION = 0.5;
const TRANS_DELAY_LONG = 0.75;

const SignupSection = () => {
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);
  const { locale } = useRouter();

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
          x: '50%',
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

  const renderInstructionBlock = () => {
    const renderStepBlock = (index) => (
      <div className="stepBlock">
        <h3>
          <span className="label">{`${index}.`}</span>
          {t(`signup.step${index}.header`)}
        </h3>
        <div>{t(`signup.step${index}.description`)}</div>
      </div>
    );

    return (
      <div
        className="instruction"
        style={{
          transform: `translateY(${locale === 'zh-HK' ? '-27.5%' : '-15%'})`,
        }}
      >
        <h1>{t('signup.header')}</h1>
        <div className="instructionContainer">
          {renderStepBlock(1)}
          {renderStepBlock(2)}
          {renderStepBlock(3)}
          {renderStepBlock(4)}
        </div>
      </div>
    );
  };

  const renderPromptBlock = () => (
    <div className="block prompt">
      <h2>{t('signup.prompt')}</h2>
      <Button>{t('signup.CTA')}</Button>
    </div>
  );

  return (
    <Section
      id={SECTION_SIGNUP}
      className={styles.signupSection}
      viewport={{ once: true, amount: (1 / 2) * 0.8 }}
    >
      <div className="foreground">
        {renderPromptBlock()}
        <div className="block main">
          {renderIgDemoView()}
          {renderInstructionBlock()}
        </div>
      </div>
      {renderBackground()}
      <SectionBanner type={CAMPAIGN_GIVEAWAY} />
    </Section>
  );
};

export default SignupSection;
