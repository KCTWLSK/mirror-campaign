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

  return (
    <Section
      id={SECTION_LANDING}
      className={styles.landingSection}
    >
      <video
        className="bgLogoVideo"
        autoPlay muted loop playsInline
      >
        <source src="https://storage.googleapis.com/socialwall/LOGO_SPIN_FInal.mp4" type="video/mp4" />
      </video>
      <div className="foreground">
        <div className="localeSelectorContainer">
          {renderLocaleButton('EN', 'en')}
          {renderLocaleButton('中文', 'zh-HK')}
        </div>
      </div>
    </Section>
  );
};

export default LandingSection;
