import { useRef } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@mui/material/Button";

import { CAMPAIGN_GIVEAWAY, SECTION_INTRO, SECTION_SUBMISSION } from "@/data/constants";
import { Section } from "@/components";

import styles from "./styles.module.scss";

import animeBoxset from "@/../public/assets/giveaway_box.gif";

const IntroSection = () => {
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  const target = useRef();

  const { scrollYProgress: transProgress } = useScroll({ target, offset: ['end', 'end start'] });
  const position = useTransform(transProgress, (val) => val === 0 || val === 1 ? 'relative' : 'fixed');
  const coverOpacity = useTransform(transProgress, (val) => val < 0.45 ? 0 : 1);
  const flashOpacity = useTransform(transProgress, [0, 0.25, 0.45, 1], [0, 1, 1, 0]);
  const flashZIndex = useTransform(transProgress, (val) => val ? 3 : -1);
  const coverZIndex = useTransform(transProgress, (val) => val ? 2 : -1);
  const boxScale = useTransform(transProgress, [0, 1], [1, 5]);
  const boxOpacity = useTransform(transProgress, [0, 0.45, 0.75], [1, 1, 0]);

  return (
    <Section
      id={SECTION_INTRO}
      className={styles.introSection}
      ref={target}
    >
      <motion.div
        className="motionContainer"
        style={{ position }}
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
          <motion.div
            className="imgWrapper"
            style={{ scale: boxScale, opacity: boxOpacity }}
          >
            <Image src={animeBoxset} alt="box display" />
          </motion.div>
        </div>
        <motion.div
          className="cover flash"
          style={{ opacity: flashOpacity, zIndex: flashZIndex }}
        />
        <motion.div
          className="cover"
          style={{ opacity: coverOpacity, zIndex: coverZIndex }}
        />
      </motion.div>
    </Section>
  );
};

export default IntroSection;
