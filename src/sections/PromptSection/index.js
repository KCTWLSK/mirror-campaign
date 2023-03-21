import Image from "next/image";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import { useIsPreferPortraitMode } from "@/context/device";
import { CAMPAIGN_GIVEAWAY, SECTION_PROMPT } from "@/data/constants";
import { Section, SectionBanner, Button } from "@/components";

import styles from "./styles.module.scss";

import animeBoxset from "@/../public/assets/giveaway_box.gif";

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
          <h1>{t('intro.header')}</h1>
          <div className="detail">{t('intro.description')}</div>
        </div>
        <div className="footer">
          <div className="period">{t('intro.date')}</div>
          <Button>{t('intro.CTA')}</Button>
        </div>
      </div>
      <div className="block display">
        <motion.div className="imgWrapper">
          <Image src={animeBoxset} alt="box display" />
        </motion.div>
      </div>
      {isPreferPortraitMode ? null : <SectionBanner type={CAMPAIGN_GIVEAWAY} />}
    </Section>
  );
};

export default PromptSection;
