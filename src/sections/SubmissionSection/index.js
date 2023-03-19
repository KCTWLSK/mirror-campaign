import { useState } from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import { useIsPreferPortraitMode } from "@/context/device";
import { CAMPAIGN_GIVEAWAY, SECTION_SUBMISSION, TRANS_DELAY_INIT } from "@/data/constants";
import Section from "@/components/Section";
import { FormView, ResultView } from "./components";

import styles from "./styles.module.scss";

const TRANS_DURATION = 1;
const TRANS_DELAY_LONG = 1.75;

const PHASE_INIT = 'PHASE_INIT';
const PHASE_SUBMITTED = 'PHASE_SUBMITTED';
const PHASE_FINAL = 'PHASE_FINAL';

const SubmissionSection = () => {
  const isPreferPortraitMode = useIsPreferPortraitMode();
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  const [currentPhase, setCurrentPhase] = useState(PHASE_INIT);

  const renderSubmittedAnimation = () => {
    const transformTemplate = ({ y }) => `translateY(${y}) scaleX(0.7)`;
    const mainAnimationDef = {
      x: '-100%',
      transition: {
        duration: TRANS_DURATION,
        delay: TRANS_DELAY_LONG,
      },
    };

    return (
      <motion.div
        className="transAnime second"
        animate={mainAnimationDef}
        onAnimationComplete={(def) => {
          if (def !== mainAnimationDef) return;
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
        ? <FormView onSubmit={() => setCurrentPhase(PHASE_SUBMITTED)} />
        : (
          <>
            {currentPhase === PHASE_SUBMITTED ? renderSubmittedAnimation() : null}
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