import { motion } from "framer-motion";

import { SECTION_SUBMISSION } from "@/data/constants";

import styles from "./styles.module.scss";

const Button = ({ children, fullWidth, ...props }) => (
  <div
    className={styles.button}
    style={fullWidth ? { width: '100%' } : null}
  >
    <motion.a
      href={props && Object.keys(props).length ? '#' : `#${SECTION_SUBMISSION}`}
      animate={{
        opacity: 0.6,
        transition: {
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        },
      }}
      whileHover={{ opacity: 1 }}
      {...props}
    >
      {children}
    </motion.a>
  </div>
);

export default Button;
