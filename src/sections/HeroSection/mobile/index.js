import { useRef } from "react";
import Image from "next/image";
import { useTranslation } from "next-export-i18n";
import { motion, transform } from "framer-motion";

import { useScrollProgress } from "@/context/scroll";
import { SECTION_HERO, TRANS_DELAY_INIT, TRANS_DURATION, VAR_OFF_SCREEN, VAR_ON_SCREEN } from "@/data/constants";
import { Section, Runner } from "@/components";

import styles from "./styles.module.scss";

import imgMirrorGroupA from "@/../public/assets/mirror_group_a.png";
import imgMirrorGroupB from "@/../public/assets/mirror_group_b.png";
import imgMirrorGroupC from "@/../public/assets/mirror_group_c.png";

const TRANS_DURATION_FAST = 1.25;
const TRANS_DELAY_LONG = TRANS_DELAY_INIT + TRANS_DURATION - 1;

const HeroSection = () => {
  const { t } = useTranslation();

  const ref = useRef();
  const { fullProgress } = useScrollProgress(ref.current);

  const y = transform([0, 1], ['-20%', '20%'])(fullProgress);
  const opacity = transform([0, 0.5, 1], [0, 1, 0])(fullProgress);
  const heroImgShiftFactorPercent = transform([0, 1], [-5, 5])(fullProgress);

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
        <div className="floatingSlogan left top">{t('hero.slogan1')}</div>
        <div className="floatingSlogan left bottom">{t('hero.slogan2')}</div>
        <div className="floatingSlogan right">{t('hero.slogan3')}</div>
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
          <span>{t('hero.runner.body')}</span>
        </>
      </Runner>
    </motion.div>
  );

  const renderMirrorGroups = () => {
    const animeDef = [
      [
        { right: '8%' },
        { right: '3%', transition: { duration: TRANS_DURATION, delay: 0.5 } },
      ],
      [
        { left: '6.5%' },
        { left: '1.5%', transition: { duration: TRANS_DURATION, delay: 0.75 } },
      ],
      [
        { right: '6.5%' },
        { right: '1.5%', transition: { duration: TRANS_DURATION, delay: 1 } },
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
      }),
    };

    return (
      <>
        <motion.div
          className="imgWrapper groupB"
          variants={variants}
          custom={0}
          style={{ x: `${heroImgShiftFactorPercent}%` }}
        >
          <Image src={imgMirrorGroupB} alt="MIRROR group B" placeholder="blur" priority />
        </motion.div>
        <motion.div
          className="imgWrapper groupA"
          variants={variants}
          custom={1}
          style={{ x: `${-heroImgShiftFactorPercent}%` }}
        >
          <Image src={imgMirrorGroupA} alt="MIRROR group A" placeholder="blur" priority />
        </motion.div>
        <motion.div
          className="imgWrapper groupC"
          variants={variants}
          custom={2}
          style={{ x: `${heroImgShiftFactorPercent}%` }}
        >
          <Image src={imgMirrorGroupC} alt="MIRROR group C" placeholder="blur" priority />
        </motion.div>
      </>
    );
  };

  const renderMainView = () => (
    <motion.div
      className="mainView"
      style={{ y, opacity }}
    >
      {renderMirrorGroups()}
      <div className="topRow">
        <span className="slogan">
          {`${t('hero.slogan1')} ${t('hero.slogan2')}`}
        </span>
      </div>
      <div className="bottomRow">
        <span className="slogan elevated">
          {t('hero.slogan3')}
        </span>
      </div>
      <div className="bodyRow">{t('hero.body')}</div>
    </motion.div>
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

  return (
    <Section
      id={SECTION_HERO}
      className={styles.heroSection}
      ref={ref}
    >
      {renderRunner('top')}
      {renderFloatingSlogan()}
      {renderGrid()}
      {renderRunner('bottom')}
    </Section>
  );
};

export default HeroSection;
