import { forwardRef } from "react";
import { motion } from "framer-motion";

import { VAR_OFF_SCREEN, VAR_ON_SCREEN } from "@/data/constants";


const Section = forwardRef(({ children, ...props }, ref) => (
  <motion.section
    initial={VAR_OFF_SCREEN}
    whileInView={VAR_ON_SCREEN}
    viewport={{ once: true, amount: 0.8 }}
    {...props}
    ref={ref}
  >
    {children}
  </motion.section>
));

Section.displayName = 'Section';

export default Section;