import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import { useIsPreferPortraitMode } from "@/context/device";
// import { useScrollProgress } from "@/context/scroll";
import { SECTION_HERO, TRANS_DELAY_INIT, TRANS_DURATION, VAR_OFF_SCREEN, VAR_ON_SCREEN } from "@/data/constants";
import { Section, Runner } from "@/components";
import MobileVersion from "./components/MobileVersion";

import styles from "./styles.module.scss";

import logoCoBrand from "@/../public/assets/logo_kc_x_mirror.png";
import imgMirrorGroupA from "@/../public/assets/mirror_group_a.png";
import imgMirrorGroupB from "@/../public/assets/mirror_group_b.png";
import imgMirrorGroupC from "@/../public/assets/mirror_group_c.png";

const TRANS_DURATION_FAST = 1.25;
const TRANS_DELAY_LONG = TRANS_DELAY_INIT + TRANS_DURATION - 1.5;

const HeroSection = () => {
  const isPreferPortraitMode = useIsPreferPortraitMode();
  const { t } = useTranslation('common');

  const ref = useRef();
  // const { status, progress } = useScrollProgress(ref.current);

  const [isInMainView, setIsInMainView] = useState(false);

  const renderFloatingSlogan = () => (
    <motion.div
      variants={{
        [VAR_ON_SCREEN]: {
          scale: 4,
          transition: {
            duration: TRANS_DURATION_FAST,
            delay: TRANS_DELAY_INIT,
          },
        },
      }}
      className="floatingSloganContainer"
    >
      <div className="floatingSloganInnerContainer">
        <div className="floatingSlogan left top">{t('partnership.slogan1')}</div>
        <div className="floatingSlogan left bottom">{t('partnership.slogan2')}</div>
        <div className="floatingSlogan right">{t('partnership.slogan3')}</div>
      </div>
    </motion.div>
  );

  const renderRunner = (position) => (
    <motion.div
      variants={{
        [VAR_OFF_SCREEN]: { opacity: 0 },
        [VAR_ON_SCREEN]: {
          opacity: 1,
          transition: {
            duration: TRANS_DURATION,
            delay: TRANS_DELAY_LONG,
          },
        },
      }}
      className={`runnerWrapper ${position}`}
    >
      <Runner
        duration={80}
        direction={position === 'top' ? 'left' : 'right'}
      >
        <>
          <span>{t('runner.header')}</span>
          <span>{t('partnership.runner.body')}</span>
        </>
      </Runner>
    </motion.div>
  );

  const renderMirrorGroups = () => {
    const animeDef = [
      [
        { left: '-2.5%', top: '60%' },
        { left: 0, top: '57.5%' },
      ],
      [
        { left: '50%', top: '35%' },
        { left: '47.5%', top: '40%' },
      ],
      [
        { right: '2.5%', top: '60%' },
        { right: 0, top: '57.5%' },
      ],
    ];

    const variants = {
      [VAR_OFF_SCREEN]: (custom) => ({
        opacity: 0,
        ...animeDef[custom][0],
      }),
      [VAR_ON_SCREEN]: (custom) => ({
        opacity: 1,
        ...animeDef[custom][1],
        transition: {
          duration: TRANS_DURATION,
          delay: TRANS_DELAY_LONG,
        },
      }),
    };

    return (
      <>
        <motion.div
          className="imgWrapper groupA"
          variants={variants}
          custom={0}
        >
          <Image
            src={imgMirrorGroupA}
            alt="MIRROR group A"
            placeholder="blur"
          />
        </motion.div>
        <motion.div
          className="imgWrapper groupB"
          variants={variants}
          custom={1}
        >
          <Image
            src={imgMirrorGroupB}
            alt="MIRROR group B"
            placeholder="blur"
          />
        </motion.div>
        <motion.div
          className="imgWrapper groupC"
          variants={variants}
          custom={2}
        >
          <Image
            src={imgMirrorGroupC}
            alt="MIRROR group C"
            placeholder="blur"
          />
        </motion.div>
      </>
    );
  };

  const renderMainView = () => (
    <div className="mainView">
      {renderMirrorGroups()}
      <div className="topRow">
        <span className="slogan">
          {`${t('partnership.slogan1')} ${t('partnership.slogan2')}`}
        </span>
        <Image src={logoCoBrand} alt="KICKS CREW x MIRROR" placeholder="blur" />
      </div>
      <div className="bottomRow">
        <span className="slogan elevated">
          {t('partnership.slogan3')}
        </span>
      </div>
      <div className="bodyRow">{t('partnership.body')}</div>
    </div>
  );

  const renderGrid = () => (
    <div className="gridContainer">
      <motion.div
        className="grid"
        transformTemplate={({ scale }) => `translate(-50%, -50%) scale(${scale})`}
        variants={{
          [VAR_OFF_SCREEN]: { scale: 0.25 },
          [VAR_ON_SCREEN]: {
            scale: 1,
            transition: {
              duration: TRANS_DURATION,
              delay: TRANS_DELAY_INIT,
              ease: 'easeOut',
            },
          },
        }}
        onAnimationComplete={() => setIsInMainView(true)}
      >
        {new Array(7).fill(0).map((_, rowInd) =>
          new Array(7).fill(0).map((_, colInd) => {
            const classNames = [];

            if (rowInd === 3) classNames.push('expandedRow');
            if (colInd === 3) classNames.push('expandedCol');

            return (
              <div
                key={`grid_cell_${rowInd}_${colInd}`}
                className={classNames.join(' ')}
              >
                {rowInd === 3 && colInd === 3 ? renderMainView() : null}
              </div>
            );
          })
        )}
      </motion.div>
    </div>
  );

  return isPreferPortraitMode
    ? <MobileVersion />
    : (
    <Section
      id={SECTION_HERO}
      className={styles.heroSection}
      ref={ref}
    >
      {renderRunner('top')}
      {isInMainView ? null : renderFloatingSlogan()}
      {renderGrid()}
      {renderRunner('bottom')}
    </Section>
  );
};

export default HeroSection;