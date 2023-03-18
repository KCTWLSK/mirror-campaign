import Section from "@/components/Section";

import { TransitionAnimation, Content } from "./components";

import styles from "./styles.module.scss";

const CodeSection = () => (
  <Section className={styles.codeSection} id="code">
    <TransitionAnimation />
    <Content />
  </Section>
);

export default CodeSection;
