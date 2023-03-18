import getConfig from "next/config";
import { useTranslation } from "next-i18next";
import Button from "@mui/material/Button";

const ButtonArea = () => {
  const { publicRuntimeConfig: { MIRROR, codes } } = getConfig();
  const { t } = useTranslation('code');

  return (
    <div className="buttonArea">
      <div className="title">{t('buttonArea.title')}</div>
      <div className="firstRow">
        {MIRROR.slice(3, 6).map((name) => <Button key={name}>{name}</Button>)}
      </div>
      <div className="secondRow">
        <Button>{t('buttonArea.shopNow')}</Button>
      </div>
    </div>
  );
};

export default ButtonArea;
