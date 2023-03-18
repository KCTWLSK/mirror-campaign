import { motion } from "framer-motion";

import { VAR_OFF_SCREEN, VAR_ON_SCREEN, TRANS_DELAY_INIT } from "@/data/constants";

const TRANS_DURATION = 0.75;

const ShowcaseBox = ({ children }) => {
  const renderBorder = (position) => {
    const motionFactor = ['left', 'right'].includes(position) ? 'height' : 'width';

    return (
      <motion.div
        className={`border ${position}`}
        variants={{
          [VAR_OFF_SCREEN]:{ [motionFactor]: 0 },
          [VAR_ON_SCREEN]: {
            [motionFactor]: '100%',
            transition: {
              duration: TRANS_DURATION,
              delay: TRANS_DELAY_INIT,
            },
          },
        }}
      />
    );
  };

  return (
    <motion.div className="boxContainer">
      {renderBorder('top')}
      {renderBorder('right')}
      {renderBorder('bottom')}
      {renderBorder('left')}
      {children}
    </motion.div>
  );
};

export default ShowcaseBox;
