import { Fragment } from "react";
import { useTranslation } from "next-export-i18n";

import { Runner } from "@/components";

import styles from "./styles.module.scss";

const SectionBanner = ({ type, top }) => {
  const { t } = useTranslation();

  return (
    <div className={top ? styles.topSectionBanner : styles.sectionBanner}>
      <Runner
        classNames="runnerWrapper"
        direction={top || type === 'code' ? 'left' : 'right'}
      >
        <>
          <span>{t('runner.header')}</span>
          <span>{t('runner.body')}</span>
        </>
      </Runner>
    </div>
  )
};

export default SectionBanner;
