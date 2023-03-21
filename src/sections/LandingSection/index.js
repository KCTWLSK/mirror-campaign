import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { SECTION_HERO, SECTION_LANDING } from "@/data/constants";
import { Section } from "@/components";

import styles from "./styles.module.scss";

const LandingSection = () => {
  const { locale } = useRouter();

  const renderLocaleButton = (label, localeValue) => {
    const isSelected = locale === localeValue;

    return (
      <Link href={`#${SECTION_HERO}`} locale={localeValue}>
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
    <motion.div
      className="arrow"
      style={{ bottom: `${(2 - index) * 7.5}px` }}
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
  );

  return (
    <Section
      id={SECTION_LANDING}
      className={styles.landingSection}
    >
      <video
        className="bgLogoVideo"
        autoPlay muted loop playsInline
      >
        <source src="assets/LOGO SPIN FInal.mp4" type="video/mp4" />
      </video>
      <div className="foreground">
        <div className="localeSelectorContainer">
          {renderLocaleButton('EN', 'en')}
          {renderLocaleButton('中文', 'zh-HK')}
        </div>
        {/* <Link href={`#${SECTION_HERO}`}>
          {renderArrow(0)}
          {renderArrow(1)}
        </Link> */}
      </div>
    </Section>
  );
};

export default LandingSection;
