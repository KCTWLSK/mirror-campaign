import { useTranslation } from "next-export-i18n";

import SectionBanner from "../SectionBanner";

import styles from "./styles.module.scss";

const SectionLayout = ({ children, type }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.sectionLayout}>
      <div className="titleRow">
        <h1>{t('memorabilia.header')}</h1>
        <div className="detail">{t('memorabilia.body')}</div>
      </div>
      <div className="contentRow">
        {children}
      </div>
      <SectionBanner type={type} />
    </div>
  )
};

export default SectionLayout;
