import getConfig from "next/config";
import { useTranslation } from "next-i18next";

import { useIsPreferPortraitMode } from "@/context/device";
import { CAMPAIGN_GIVEAWAY } from "@/data/constants";

import styles from "./styles.module.scss";
import { useRouter } from "next/router";

const FormView = ({ onSubmit }) => {
  const isPreferPortraitMode = useIsPreferPortraitMode();
  const { publicRuntimeConfig: { poptinDataId_zhHK, poptinDataId_en } } = getConfig();
  const { locale } = useRouter();
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  return (
    <div className={styles.formView}>
      <div className="container">
        <div className="innerContainer">
          {isPreferPortraitMode ? null : (
            <div className="content">
              <h1>{t('intro.header')}</h1>
              <div className="description">{t('intro.description')}</div>
            </div>
          )}
          <div className="form">
            <div id="submit-trigger" onClick={onSubmit} />
            {locale === 'en'
              ? <div className="poptin-embedded" data-id={poptinDataId_en} />
              : <div className="poptin-embedded" data-id={poptinDataId_zhHK} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormView;
