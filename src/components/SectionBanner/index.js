import { Fragment } from "react";
import { useTranslation } from "next-i18next";

import { useIsPreferPortraitMode } from "@/context/device";
import { Runner } from "@/components";

import styles from "./styles.module.scss";

const SectionBanner = ({ type, top }) => {
  const isPreferPortraitMode = useIsPreferPortraitMode();
  const { t } = useTranslation([type, 'common']);

  const renderRunner = () => {
    const item = (key) => (
      <span key={key}>
        <span>{t('runner.header', { ns: 'common' })}</span>
        <span>{t('runner.body')}</span>
      </span>
    );

    return (
      <Runner
        classNames="runner"
        direction={top || type === 'code' ? 'left' : 'right'}
      >
        {new Array(isPreferPortraitMode ? 2 : 3).fill(0).map((_, index) => item(index))}
      </Runner>
    );
  }

  return (
    <div className={top ? styles.topSectionBanner : styles.sectionBanner}>
      {renderRunner()}
    </div>
  )
};

export default SectionBanner;
