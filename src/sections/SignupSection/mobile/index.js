import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";

import {
  VAR_OFF_SCREEN, VAR_ON_SCREEN,
  SECTION_SIGNUP,
  CAMPAIGN_GIVEAWAY,
} from "@/data/constants";
import { Section, Button, SectionBanner } from "@/components";

import styles from "./styles.module.scss";

const SignupSection = () => {
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  const renderInstructionBlock = () => {
    const renderStepBlock = (index) => (
      <div className="stepBlock">
        <div className="label">
          <span>{t(`signup.step${index}.label`)}</span>
          <span>{t(`signup.step${index}.header`)}</span>
        </div>
        <div className="description">{t(`signup.step${index}.description`)}</div>
      </div>
    );

    return (
      <div className=" block instruction">
        <h1>{t('signup.header')}</h1>
        <div className="description">{t('signup.description')}</div>
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
      <Button>{t('signup.CTA')}</Button>
    </div>
  );

  return (
    <Section
      id={SECTION_SIGNUP}
      className={styles.signupSection}
    >
      {renderInstructionBlock()}
      {renderPromptBlock()}
      <SectionBanner type={CAMPAIGN_GIVEAWAY} />
    </Section>
  );
};

export default SignupSection;
