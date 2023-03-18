import { motion } from "framer-motion";
import getConfig from "next/config";

import { useIsPreferPortraitMode } from "@/context/device";

import styles from "./styles.module.scss";

const Runner = ({ children, classNames, duration, direction = 'left' }) => {
  const { publicRuntimeConfig: { runnerDuration } } = getConfig();
  const isPreferPortraitMode = useIsPreferPortraitMode();
  
  duration ??= runnerDuration;

  const renderItems = (copy) => {
    const offset = copy ? 0 : 100;
    const leftmostDef = { x: `${-200 + offset}%` };
    const rightmostDef = { x: `${offset}%` };

    return (
      <motion.p
        className="runnerItem"
        initial={direction === 'left' ? rightmostDef : leftmostDef}
        animate={direction === 'left' ? leftmostDef : rightmostDef}
        transition={{
          duration,
          delay: copy ? (-duration / 2) : -duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {children}
        {isPreferPortraitMode ? null : children}
      </motion.p>
    );
  };

  return (
    <div className={`${styles.runner}${classNames ? ` ${classNames}` : ''}`}>
      <div className="runnerInnerContainer">
        {renderItems()}
        {renderItems(true)}
      </div>
    </div>
  );
};

export default Runner;
