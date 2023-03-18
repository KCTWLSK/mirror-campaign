import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import { useIsPreferPortraitMode } from "@/context/device";
import { CAMPAIGN_GIVEAWAY, SECTION_SUBMISSION, TRANS_DELAY_INIT } from "@/data/constants";
import Section from "@/components/Section";
import { FormView, ResultView } from "./components";

import styles from "./styles.module.scss";

import outroBgImg from "@/../public/assets/ig_demo_bg.png";

const TRANS_DURATION_FAST = 0.75;
const TRANS_DURATION = 1;
const TRANS_DELAY_LONG = 1.75;

const PHASE_INIT = 'PHASE_INIT';
const PHASE_SUBMITTED = 'PHASE_SUBMITTED';
const PHASE_TRANSITION = 'PHASE_TRANSITION';
const PHASE_FINAL = 'PHASE_FINAL';

const SubmissionSection = () => {
  const isPreferPortraitMode = useIsPreferPortraitMode();
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  const [currentPhase, setCurrentPhase] = useState(PHASE_INIT);

  const renderSubmittedAnimation = () => (
    <motion.div
      className="transAnime first"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.5, 1, 1, 1],
        y: ['0%', '0%', '0%', '50%', '100%'],
        transition: {
          duration: TRANS_DURATION_FAST,
        },
      }}
      onAnimationComplete={() => setCurrentPhase(PHASE_TRANSITION)}
    >
      <div className="bgImgWrapper">
        <Image src={outroBgImg} alt="outro background" placeholder="blur" />
      </div>
    </motion.div>
  );

  const renderTransitionAnimation = () => {
    const transformTemplate = ({ y }) => `translateY(${y}) scaleX(0.7)`;
    const outroAnimateDef = {
      x: '-100%',
      transition: {
        duration: TRANS_DURATION,
        delay: TRANS_DELAY_LONG,
      },
    };

    return (
      <motion.div
        className="transAnime second"
        animate={outroAnimateDef}
        onAnimationComplete={(def) => {
          if (def !== outroAnimateDef) return;
          setCurrentPhase(PHASE_FINAL);
        }}
      >
        <div className="textContainer">
          <div className="textWrapper top">
            <motion.div
              transformTemplate={transformTemplate}
              initial={{ y: '150%' }}
              animate={{ y: 0 }}
              transition={{
                duration: TRANS_DURATION,
                delay: TRANS_DELAY_INIT,
              }}
            >
              {t('submission.label.top')}
            </motion.div>
          </div>
          <div className="textWrapper bottom">
            <motion.div
              transformTemplate={transformTemplate}
              initial={{ y: '-150%' }}
              animate={{ y: 0 }}
              transition={{
                duration: TRANS_DURATION,
                delay: TRANS_DELAY_INIT,
              }}
            >
              {t('submission.label.bottom')}
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <Section
      id={SECTION_SUBMISSION}
      className={styles.submissionSection}
    >
      {currentPhase === PHASE_INIT
        ? <FormView
          onSubmit={() =>
            setCurrentPhase(
              isPreferPortraitMode
                ? PHASE_TRANSITION : PHASE_SUBMITTED
          )}
        />
        : currentPhase === PHASE_SUBMITTED
        ? renderSubmittedAnimation()
        : (
          <>
            {currentPhase === PHASE_TRANSITION ? renderTransitionAnimation() : null}
            <ResultView
              duration={TRANS_DURATION}
              delay={TRANS_DELAY_LONG}
            />
          </>
        )}
    </Section>
  );
};

export default SubmissionSection;