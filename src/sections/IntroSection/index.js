import Image from "next/image";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import { useIsPreferPortraitMode } from "@/context/device";
import { CAMPAIGN_GIVEAWAY, SECTION_INTRO } from "@/data/constants";
import { Section, SectionBanner, Button } from "@/components";

import styles from "./styles.module.scss";

import animeBoxset from "@/../public/assets/giveaway_box.gif";

const IntroSection = () => {
  const isPreferPortraitMode = useIsPreferPortraitMode();
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  return (
    <Section
      id={SECTION_INTRO}
      className={styles.introSection}
    >
      {isPreferPortraitMode
        ? <SectionBanner type={CAMPAIGN_GIVEAWAY} top /> : null}
      <div className="block content">
        <div>
          <h1>{t('intro.header')}</h1>
          <div className="detail">{t('intro.description')}</div>
        </div>
        <div>
          <div className="period">{t('intro.date')}</div>
          <Button>{t('intro.CTA')}</Button>
        </div>
      </div>
      <div className="block display">
        <motion.div className="imgWrapper">
          <Image src={animeBoxset} alt="box display" />
        </motion.div>
      </div>
      {isPreferPortraitMode
        ? <SectionBanner type={CAMPAIGN_GIVEAWAY} /> : null}
    </Section>
  );
};

export default IntroSection;
