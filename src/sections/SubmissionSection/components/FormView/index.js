import getConfig from "next/config";
import { useTranslation } from "next-i18next";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

import { CAMPAIGN_GIVEAWAY } from "@/data/constants";
import { SectionBanner } from "@/components";

import styles from "./styles.module.scss";

const FormView = ({ onSubmit }) => {
  const { publicRuntimeConfig: { poptinDataId } } = getConfig();
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  const renderFormField = (name) => (
    <div className="field">
      <label>{t(`form.field.${name}.label`)}</label>
      <Input
        placeholder={t(`form.field.${name}.label`)}
        variant="outlined"
      />
    </div>
  );

  return (
    <div className={styles.formView}>
      <div className="container">
        <div className="innerContainer">
          <div className="content">
            <h1>{t('intro.header')}</h1>
            <div className="description">{t('intro.description')}</div>
          </div>
          
          <div className="form">
            {/* <div className="poptin-embedded" data-id={poptinDataId} /> */}
            <div className="formFieldsContainer">
              <div className="row">
                {renderFormField('name')}
                {renderFormField('phone')}
              </div>
              {renderFormField('email')}
              {renderFormField('instagram')}
              {renderFormField('survey')}
            </div>
            <Button
              variant="contained"
              onClick={onSubmit}
            >
              {t('form.CTA')}
            </Button>
          </div>
        </div>
      </div>
      <SectionBanner type={CAMPAIGN_GIVEAWAY} />
    </div>
  );
};

export default FormView;
