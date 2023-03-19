import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";

import { useIsPreferPortraitMode } from "@/context/device";
import {
  VAR_OFF_SCREEN, VAR_ON_SCREEN,
  TRANS_DELAY_INIT,
  SECTION_SIGNUP,
  CAMPAIGN_GIVEAWAY,
} from "@/data/constants";
import { Section, SectionBanner, Button } from "@/components";

import styles from "./styles.module.scss";

import igDemoImg from "@/../public/assets/ig_demo.png";
import igDemoBgImg from "@/../public/assets/ig_demo_bg.png";
import groupImg from "@/../public/assets/mirror_group_cascaded.png";
import MobileVersion from "./components/MobileVersion";

const TRANS_DURATION = 0.5;
const TRANS_DELAY_LONG = 0.75;

const SignupSection = () => {
  const isPreferPortraitMode = useIsPreferPortraitMode();
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  const renderBackgroundContent = () => (
    <>
      <motion.div
        className="curtain"
        variants={{
          [VAR_OFF_SCREEN]: { height: 0 },
          [VAR_ON_SCREEN]: {
            height: '100%',
            transition: {
              duration: TRANS_DURATION,
              delay: TRANS_DELAY_INIT,
            },
          },
        }}
      />
      <motion.div
        className="blurryBgWrapper"
        variants={{
          [VAR_OFF_SCREEN]: { opacity: 0 },
          [VAR_ON_SCREEN]: {
            opacity: 1,
            transition: {
              duration: TRANS_DURATION,
              delay: TRANS_DELAY_LONG,
            },
          }
        }}
      >
        <Image src={igDemoBgImg} alt="instagram demo view bg" placeholder="blur" />
      </motion.div>
    </>
  );

  const renderInstructionBlock = () => {
    const renderStepBlock = (index) => (
      <div className="stepBlock">
        <div className="label">{t(`signup.step${index}.label`)}</div>
        <h3>{t(`signup.step${index}.header`)}</h3>
        <div>{t(`signup.step${index}.description`)}</div>
      </div>
    );
    
    return (
      <motion.div
        variants={{
          [VAR_OFF_SCREEN]: { opacity: 0 },
          [VAR_ON_SCREEN]: {
            opacity: 1,
            transition: {
              duration: TRANS_DURATION,
              delay: TRANS_DELAY_LONG,
            },
          }
        }}
        className="block instruction"
      >
        <div>
          <h1>{t('signup.header')}</h1>
        </div>
        <div className="description">{t('signup.description')}</div>
        <div className="instructionContainer">
          {renderStepBlock(1)}
          {renderStepBlock(2)}
          {renderStepBlock(3)}
          {renderStepBlock(4)}
        </div>
      </motion.div>
    );
  };

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

  const renderPromptBlock = () => (
    <motion.div
      variants={{
        [VAR_OFF_SCREEN]: { opacity: 0 },
        [VAR_ON_SCREEN]: {
          opacity: 1,
          transition: {
            duration: TRANS_DURATION,
            delay: TRANS_DELAY_LONG,
          },
        }
      }}
      className="block prompt"
    >
      <div className="imgWrapper">
        <Image src={groupImg} alt="MIRROR group" placeholder="blur" />
      </div>
      <div className="bottomRow">
        <div>{t('signup.prompt')}</div>
        <Button fullWidth>{t('signup.CTA')}</Button>
      </div>
    </motion.div>
  );

  return isPreferPortraitMode
    ? <MobileVersion />
    : (
      <Section
        id={SECTION_SIGNUP}
        className={styles.signupSection}
      >
        <div className="background">
          {renderBackgroundContent()}
        </div>
        <div className="foreground">
          {renderInstructionBlock()}
          {renderIgDemoView()}
          {renderPromptBlock()}
        </div>
        <SectionBanner type={CAMPAIGN_GIVEAWAY} />
      </Section>
    );
};

export default SignupSection;
