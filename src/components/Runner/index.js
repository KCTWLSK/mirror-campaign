import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import getConfig from "next/config";

import styles from "./styles.module.scss";

const Runner = ({ children, classNames, duration, direction = 'left' }) => {
  const { publicRuntimeConfig: { runnerDuration } } = getConfig();

  const [itemCount, setItemCount] = useState();
  const containerRef = useRef();
  const measurerRef = useRef();

  duration ??= runnerDuration;

  useEffect(() => {
    const { width: containerWidth } = containerRef.current.getBoundingClientRect();
    const { width: itemWidth } = measurerRef.current.getBoundingClientRect();

    setItemCount(Math.floor(containerWidth / itemWidth));
  }, []);

  const renderItems = (copy) => {
    const offset = copy ? 0 : 100;
    const leftmostDef = { x: `${-200 + offset}%` };
    const rightmostDef = { x: `${offset}%` };

    return (
      <motion.p
        className="itemContainer"
        initial={direction === 'left' ? rightmostDef : leftmostDef}
        animate={direction === 'left' ? leftmostDef : rightmostDef}
        transition={{
          duration,
          delay: copy ? (-duration / 2) : -duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        ref={containerRef}
      >
        {itemCount ? new Array(itemCount).fill(0).map((_, index) => (
          <span
            className="runnerItem"
            key={index}
          >
            {children}
          </span>
        )) : (
          <span
            className="measurerWrapper"
            ref={measurerRef}
          >
            <span className="runnerItem">
              {children}
            </span>
          </span>
        )}
      </motion.p>
    );
  };

  return (
    <div className={`${styles.runner}${classNames ? ` ${classNames}` : ''}`}>
      <div className="runnerInnerContainer">
        {renderItems()}
        {itemCount ? renderItems(true) : null}
      </div>
    </div>
  );
};

export default Runner;
