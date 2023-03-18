import { useTranslation } from "next-i18next";

import styles from "./styles.module.scss";
import SectionBanner from "../SectionBanner";

const SectionLayout = ({ children, type }) => {
  const { t } = useTranslation([type, 'common']);

  return (
    <div className={styles.sectionLayout}>
      <div className="titleRow">
        <h1>{t('details.header')}</h1>
        <div className="detail">{t('details.body')}</div>
      </div>
      <div className={`contentRow${type === 'code' ? '' : ' even'}`}>
        {children}
      </div>
      <SectionBanner type={type} />
    </div>
  )
};

export default SectionLayout;
