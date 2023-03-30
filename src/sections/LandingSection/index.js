import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, transform } from "framer-motion";
import { useSelectedLanguage } from "next-export-i18n";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { SECTION_HERO, SECTION_LANDING } from "@/data/constants";
import { useScrollProgress } from "@/context/scroll";
import { Section } from "@/components";

import styles from "./styles.module.scss";

import logoKCxMirror from "@/../public/assets/logo_still.png";

const LandingSection = () => {
  const ref = useRef();
  const { fullProgress } = useScrollProgress(ref.current);
  const { lang } = useSelectedLanguage();

  const y = transform([0.5, 1], ['0%', '20%'])(fullProgress);
  const opacity = transform([0.5, 1], [1, 0])(fullProgress);
  const buttonOpacity = transform([0.5, 0.6], [1, 0])(fullProgress);

  const renderLocaleButton = (label, localeValue) => {
    const isSelected = lang === localeValue;

    return (
      <Link href={`/${localeValue}#${SECTION_HERO}`}>
        <motion.button
          className={`localeButton${isSelected ? ' selected' : ''}`}
          animate={isSelected ? {} : {
            opacity: 0.2,
            transition: {
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
            },
          }}
          whileHover={{ opacity: 1 }}
          whileTap={isSelected ? false : {
            opacity: [0.3, 0.5, 0.3, 0.5, 0.7, 1],
            transition: {
              duration: 1.5,
            },
          }}
        >
          {label}
        </motion.button>
      </Link>
    );
  };

  const renderArrow = (index) => (
    <Link href={`/${lang}#${SECTION_HERO}`}>
      <motion.div
        className="arrow"
        style={{ transform: `translate(-50%, -${(2 - index) * 18.75}%)` }}
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.67, 0.25, 0] }}
        transition={{
          duration: 2,
          delay: index * 0.33,
          ease: 'easeIn',
          repeat: Infinity,
        }}
      >
        <KeyboardArrowDownIcon />
      </motion.div>
    </Link>
  );


  return (
    <Section
      id={SECTION_LANDING}
      className={styles.landingSection}
      ref={ref}
    >
      <motion.div
        className="background"
        style={{ y, opacity }}
      >
        <Image
          className="bgLogo still"
          src={logoKCxMirror}
          alt="KC x MIRROR"
          priority
        />
        <Image
          className="bgLogo spin"
          src="https://storage.googleapis.com/socialwall/LOGO%20SPIN%20FInal_1080x1920.gif"
          alt="KC x MIRROR"
          width={1080}
          height={1920}
        />
      </motion.div>
      <motion.div
        className="foreground"
        style={{
          opacity: buttonOpacity,
        }}
      >
        <div className="localeSelectorContainer">
          {renderLocaleButton('EN', 'en')}
          {renderLocaleButton('中文', 'zh-HK')}
        </div>
        {renderArrow(0)}
        {renderArrow(1)}
      </motion.div>
    </Section>
  );
};

export default LandingSection;
