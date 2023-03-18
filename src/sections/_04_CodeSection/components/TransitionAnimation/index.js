import Image from "next/image";
import getConfig from "next/config";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import { ANIME_VAR_OFF_SCREEN, ANIME_VAR_ON_SCREEN } from "@/data/constants";

import styles from "./styles.module.scss";

const TRANS_DURATION_FAST = 0.5;
const TRANS_DURATION = 1;
const TRANS_DELAY = 0.75;
const TRANS_DELAY_LONG = 2.25;

const TransitionAnimation = () => {
  const { publicRuntimeConfig: { featured } } = getConfig();
  const { t } = useTranslation('code');

  const renderCurtain = () => (
    <motion.div
      className="curtain"
      variants={{
        [ANIME_VAR_ON_SCREEN]: {
          width: 0,
          transition: {
            duration: TRANS_DURATION_FAST,
            delay: TRANS_DELAY,
          },
        },
      }}
    />
  );

  const renderSpinningCard = () => (
    <motion.div
      className="cardWrapper"
      variants={{
        [ANIME_VAR_OFF_SCREEN]: { opacity: 0, rotate: 90, scale: 2 },
        [ANIME_VAR_ON_SCREEN]: {
          opacity: 1,
          rotate: 0,
          scale: 1,
          transition: {
            duration: TRANS_DURATION,
            delay: TRANS_DELAY,
          },
        },
      }}
    >
      <Image
        src={require(`@/../public/assets/mirrorcards_front_${featured}.png`)}
        alt={featured} />
    </motion.div>
  );

  const renderSlidingCaptions = () => (
    <motion.div
      className="captionContainer"
      variants={{
        [ANIME_VAR_ON_SCREEN]: {
          y: '-50%',
          transition: {
            duration: TRANS_DURATION,
            delay: TRANS_DELAY,
            ease: 'easeOut',
          },
        },
      }}
    >
      {new Array(8).fill(null).map((_, index) => (
        <div key={`code_trans_caption_${index}`}>
          <h1>{t('trans.caption')}</h1>
        </div>
      ))}
    </motion.div>
  );

  return (
    <motion.div
      className={styles.transitionAnimation}
      initial={ANIME_VAR_OFF_SCREEN}
      whileInView={ANIME_VAR_ON_SCREEN}
      viewport={{ once: true, amount: 'all' }}
      variants={{
        [ANIME_VAR_ON_SCREEN]: {
          height: 0,
          transition: {
            duration: TRANS_DURATION,
            delay: TRANS_DELAY_LONG,
          },
        }
      }}
    >
      {renderCurtain()}
      {renderSpinningCard()}
      {renderSlidingCaptions()}
    </motion.div>
  );
};

export default TransitionAnimation;