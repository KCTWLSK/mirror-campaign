import { Fragment } from "react";
import { useTranslation } from "next-i18next";

import { Runner } from "@/components";

import styles from "./styles.module.scss";

const SectionBanner = ({ type, top }) => {
  const { t } = useTranslation([type, 'common']);

  return (
    <div className={top ? styles.topSectionBanner : styles.sectionBanner}>
      <Runner
        classNames="runnerWrapper"
        direction={top || type === 'code' ? 'left' : 'right'}
      >
        <>
          <span>{t('runner.header', { ns: 'common' })}</span>
          <span>{t('runner.body')}</span>
        </>
      </Runner>
    </div>
  )
};

export default SectionBanner;
