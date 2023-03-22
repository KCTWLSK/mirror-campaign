import Image from "next/image";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import { useIsPreferPortraitMode } from "@/context/device";
import { CAMPAIGN_GIVEAWAY, SECTION_PROMPT, SECTION_SIGNUP } from "@/data/constants";
import { Section, SectionBanner, Button } from "@/components";

import styles from "./styles.module.scss";

const PromptSection = () => {
  const isPreferPortraitMode = useIsPreferPortraitMode();
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  return (
    <Section
      id={SECTION_PROMPT}
      className={styles.promptSection}
    >
      {isPreferPortraitMode
        ? <SectionBanner type={CAMPAIGN_GIVEAWAY} top /> : null}
      <div className="block content">
        <div className="contentBody">
          <h1>{t('prompt.header')}</h1>
          <div className="detail">{t('prompt.description')}</div>
        </div>
        <div className="footer">
          <div className="period">{t('prompt.date')}</div>
          <Button href={`#${SECTION_SIGNUP}`}>{t('prompt.CTA')}</Button>
        </div>
      </div>
      <div className="block display">
        <motion.div className="imgWrapper">
          <Image
            src="https://storage.googleapis.com/socialwall/giveaway_box.gif"
            alt="box display"
            width={480}
            height={480}
          />
        </motion.div>
      </div>
      {isPreferPortraitMode ? null : <SectionBanner type={CAMPAIGN_GIVEAWAY} />}
    </Section>
  );
};

export default PromptSection;
