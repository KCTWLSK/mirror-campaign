import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import { SECTION_LANDING, TRANS_DELAY_INIT, VAR_OFF_SCREEN, VAR_ON_SCREEN } from "@/data/constants";
import { Section } from "@/components";

import styles from "./styles.module.scss";

import logoKC from "@/../public/assets/logo_KC.png";
import logoX from "@/../public/assets/logo_x.png";
import logoMIRROR from "@/../public/assets/logo_MIRROR.png";
import imgGlobe from "@/../public/assets/globe.png";

const TRANS_DURATION_FAST = 0.25;
const TRANS_DURATION = 0.5;

const LOCALES_SELECTOR_TIMEOUT_MS = 2000;

const LandingSection = () => {
  const { locale } = useRouter();

  const [expandLocales, setExpandLocales] = useState();
  const [disableClick, setDisableClick] = useState(true);

  useEffect(() => {
    if (!expandLocales) return;

    const timeoutId = setTimeout(() => {
      setExpandLocales(false);
    }, LOCALES_SELECTOR_TIMEOUT_MS);

    return () => clearTimeout(timeoutId);
  }, [expandLocales, locale]);

  const renderLogoWindow = ()=> (
    <div className="logoWindow">
      <motion.div
        className="logoWrapper"
        variants={{
          [VAR_OFF_SCREEN]: { y: '33vh' },
          [VAR_ON_SCREEN]: {
            y: 0,
            transition: {
              delay: TRANS_DELAY_INIT,
              duration: TRANS_DURATION,
            },
          },
        }}
      >
        <Image
          src={logoKC}
          alt="KICKS CREW"
          placeholder="blur"
        />
      </motion.div>
      <div>
        <Image className="logoX" src={logoX} alt="x" />
      </div>
      <motion.div
        className="logoWrapper"
        variants={{
          [VAR_OFF_SCREEN]: { y: '-33vh' },
          [VAR_ON_SCREEN]: {
            y: 0,
            transition: {
              delay: TRANS_DELAY_INIT,
              duration: TRANS_DURATION,
            },
          },
        }}
      >
        <Image
          src={logoMIRROR}
          alt="MIRROR"
          placeholder="blur"
        />
      </motion.div>
    </div>
  );

  const renderLocaleSelector = () => {
    const leftInitDef = { x: '50%', opacity: 0 };
    const rightInitDef = { x: '-50%', opacity: 0 };

    return (
      <motion.div
        className="localeSelectorContainer"
        onClick={() => setExpandLocales(true)}
        onMouseLeave={() => setExpandLocales(false)}
      >
        <motion.div
          className={`iconWrapper${locale === 'en' ? ' selected' : ''}`}
          transformTemplate={({ x }) => `translateX(calc(${x} - 1rem))`}
          initial={leftInitDef}
          animate={expandLocales ? { x: 0, opacity: 1 } : leftInitDef}
          transition={{ duration: TRANS_DURATION_FAST }}
          onAnimationComplete={(def) => setDisableClick(def === leftInitDef)}
        >
          {disableClick ? 'EN' : <Link href="/" locale="en">EN</Link>}
        </motion.div>
        <div className="imgWrapper">
          <Image src={imgGlobe} alt="locale selector" />
        </div>
          <motion.div
            className={`iconWrapper${locale === 'zh-HK' ? ' selected' : ''}`}
            transformTemplate={({ x }) => `translateX(calc(${x} + 1rem))`}
            initial={rightInitDef}
            animate={expandLocales ? { x:  0, opacity: 1 } : rightInitDef}
            transition={{ duration: TRANS_DURATION_FAST }}
          >
            {disableClick ? '中文' : <Link href="/" locale="zh-HK">中文</Link>}
          </motion.div>
      </motion.div>
    );
  };

  return (
    <Section
      id={SECTION_LANDING}
      className={styles.landingSection}
    >
      <div className="cover"></div>
      <video autoPlay muted loop className="video">
        <source src="assets/LOGO SPIN FInal.mp4" type="video/mp4" />
      </video>
      {/* {renderLogoWindow()}
      {renderLocaleSelector()} */}
    </Section>
  );
};

export default LandingSection;
