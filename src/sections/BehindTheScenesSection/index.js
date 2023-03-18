import getConfig from "next/config";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import { SECTION_BEHIND_THE_SCENES, VAR_OFF_SCREEN, VAR_ON_SCREEN } from "@/data/constants";
import Section from "@/components/Section";

import styles from "./styles.module.scss";

const TRANS_DURATION_FAST = 0.25;
const TRANS_DURATION = 0.5;
const TRANS_DELAY = 0.25;
const TRANS_DELAY_LONG = 0.75;

const BehindTheScenesSection = () => {
  const { publicRuntimeConfig: { videoId } } = getConfig();
  const { t } = useTranslation('common');
  const title = t('behindTheScenes.header');
  
  const renderEmbeddedVideo = () => (
    <motion.div
      className="videoContainer"
      variants={{
        [VAR_OFF_SCREEN]: {
          skewX: '30deg',
          width: '0%',
        },
        [VAR_ON_SCREEN]: {
          skewX: '0deg',
          width: '100%',
          transition: {
            duration: TRANS_DURATION,
            delay: TRANS_DELAY,
          },
        },
      }}
    >
      <motion.div
        className="videoWrapper"
        variants={{
          [VAR_OFF_SCREEN]: { opacity: 0 },
          [VAR_ON_SCREEN]: {
            opacity: 1,
            transition: {
              duration: TRANS_DURATION_FAST,
              delay: TRANS_DELAY_LONG,
            },
          },
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <Section
      id={SECTION_BEHIND_THE_SCENES}
      className={styles.behindTheScenesSection}
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="titleRow">
        <h1>{title}</h1>
        <div>{t('behindTheScenes.description')}</div>
      </div>
      {renderEmbeddedVideo()}
    </Section>
  );
};

export default BehindTheScenesSection;
