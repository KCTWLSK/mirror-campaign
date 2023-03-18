import { motion } from "framer-motion";

import SectionLayout from "@/components/SectionLayout";
import Timeline from "./Timeline";
import Carosuel from "./Carosuel";
import ButtonArea from "./ButtonArea";

import styles from "./styles.module.scss";

const Content = () => {
  return (
    <motion.div className={styles.content}>
      <SectionLayout campaign="code">
        <Timeline />
        <div className="rightColumnContainer">
          <Carosuel />
          <ButtonArea />
        </div>
      </SectionLayout>
    </motion.div>
  );
};

export default Content;