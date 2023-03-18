import Image from "next/image";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";

import { CAMPAIGN_GIVEAWAY, SECTION_INTRO, SECTION_SUBMISSION } from "@/data/constants";
import { Section } from "@/components";

import styles from "./styles.module.scss";

import animeBoxset from "@/../public/assets/giveaway_box.gif";

const IntroSection = () => {
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  return (
    <Section
      id={SECTION_INTRO}
      className={styles.introSection}
    >
      <div className="block content">
        <div>
          <h1>{t('intro.header')}</h1>
          <div className="detail">{t('intro.description')}</div>
        </div>
        <div>
          <Button variant="outlined" className="period">{t('intro.date')}</Button>
          <Button variant="contained" href={`#${SECTION_SUBMISSION}`}>{t('intro.CTA')}</Button>
        </div>
      </div>
      <div className="block display">
        <motion.div className="imgWrapper">
          <Image src={animeBoxset} alt="box display" />
        </motion.div>
      </div>
    </Section>
  );
};

export default IntroSection;
