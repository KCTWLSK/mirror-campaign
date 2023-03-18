import { useContext, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { motion, useMotionValueEvent, useMotionValue, useTransform, transform } from "framer-motion";

import { CAMPAIGN_GIVEAWAY, SECTION_TRANSITION } from "@/data/constants";
import { Section } from "@/components";

import styles from "./styles.module.scss";

import animeBoxset from "@/../public/assets/giveaway_box.gif";
import { ScrollContext, useScrollProgress } from "@/context/scroll";

const TransitionSection = () => {
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  const target = useRef();
  const scrollProgress = useScrollProgress(target.current);

  // const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });
  const opacity = transform([0, 0.25, 0.25001, 0.5, 1], [0, 0, 1, 1, 0])(scrollProgress);
  const flashOpacity = transform([0, 0.125, 0.225, 0.5], [0, 1, 1, 0])(scrollProgress);
  const labelOpacity = transform([0.167, 0.5], [0, 1])(scrollProgress);
  const labelY = transform([0, 0.5, 0.50001, 1], ['50%', '-50%', '0%', '-100%'])(scrollProgress);
  // const boxScale = transform([0, 0.5], [5, 1])(scrollProgress);
  console.log(scrollProgress)
  // const position = useTransform(scrollYProgress, (val) => val ? 'fixed' : 'relative');
  // const opacity = useTransform(scrollYProgress, [0, 0.25, 0.25001, 0.5, 1], [0, 0, 1, 1, 0]);
  // const backgroundColor = useTransform(scrollYProgress, (val) => val < 0.25 ? '#000' : '#B3D356');
  // const zIndex = useTransform(scrollYProgress, (val) => val >= 0.225 && val <= 0.5 ? 15 : 0);
  // const flashOpacity = useTransform(scrollYProgress, [0, 0.125, 0.225, 0.5], [0, 1, 1, 0]);
  // const labelOpacity = useTransform(scrollYProgress, [0.167, 0.5], [0, 1]);
  // const labelY = useTransform(scrollYProgress, [0, 0.5, 0.50001, 1], ['50%', '-50%', '0%', '-100%']);
  // const boxDisplay = useTransform(scrollYProgress, (val) => val ? 'flex' : 'none');
  // const boxScale = useTransform(scrollYProgress, [0, 0.5], [5, 1]);

  return (
    <Section
      id={SECTION_TRANSITION}
      className={styles.transitionSection}
      style={{ opacity }}
      ref={target}
    >
      <motion.div
        className="motionContainer"
        style={{
          // position: scrollProgress ? 'fixed' : 'relative',
          backgroundColor: scrollProgress < 0.25 ? '#000' : '#B3D356',
          zIndex: scrollProgress >= 0.225 && scrollProgress <= 0.5 ? 5 : 0,
        }}
      >
        <motion.div
          className="transFlash"
          style={{ opacity: flashOpacity }}
        />
        <motion.div
          className="labelContainer"
          style={{ y: labelY, opacity: labelOpacity }}
        >
          {new Array(8).fill(null).map((_, index) => (
            <div key={`sliding_label_${index}`}>
              <div>{t('transition.label')}</div>
            </div>
          ))}
        </motion.div>
        <motion.div
          className="imgWrapper"
          style={{ display: scrollProgress ? 'flex' : 'none', scale: 0.25 }}
        >
          <Image src={animeBoxset} alt="giveaway box" />
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default TransitionSection;
