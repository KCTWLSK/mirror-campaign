import { useState } from "react";
import Image from "next/image";
import getConfig from "next/config";
import { useTranslation } from "next-export-i18n";

import MobileVersion from "./mobile";
import { useIsPreferPortraitMode } from "@/context/device";
import { Section, SectionLayout } from "@/components";
import { copyTextToClipboard, getActiveWeek } from "@/utils/helpers";

import styles from "./styles.module.scss";

import imgMirrorLOKMAN from "@/../public/assets/LOKMAN.png";
import imgMirrorANSONLO from "@/../public/assets/ANSONLO.png";
import imgMirrorALTON from "@/../public/assets/ALTON.png";
import imgMirrorSTANLEY from "@/../public/assets/STANLEY.png";
import imgMirrorKEUNGTO from "@/../public/assets/KEUNGTO.png";
import imgMirrorAK from "@/../public/assets/AK.png";
import imgMirrorFRANKIE from "@/../public/assets/FRANKIE.png";
import imgMirrorJER from "@/../public/assets/JER.png";
import imgMirrorIAN from "@/../public/assets/IAN.png";
import imgMirrorEDAN from "@/../public/assets/EDAN.png";
import imgMirrorTIGER from "@/../public/assets/TIGER.png";
import imgMirrorJEREMY from "@/../public/assets/JEREMY.png";
import iconQuestionMark from "@/../public/assets/question_mark.png";

const imgMirror = {
  LOKMAN: imgMirrorLOKMAN,
  'ANSON LO': imgMirrorANSONLO,
  ALTON: imgMirrorALTON,
  STANLEY: imgMirrorSTANLEY,
  'KEUNG TO': imgMirrorKEUNGTO,
  AK: imgMirrorAK,
  FRANKIE: imgMirrorFRANKIE,
  JER: imgMirrorJER,
  IAN: imgMirrorIAN,
  EDAN: imgMirrorEDAN,
  TIGER: imgMirrorTIGER,
  JEREMY: imgMirrorJEREMY,
};

const MemorabiliaSection = () => {
  const isPreferPortraitMode = useIsPreferPortraitMode();
  const { publicRuntimeConfig: { featured, faqUrl, mirrorCollectionUrl } } = getConfig();
  const { t } = useTranslation();

  const [selectedCode, setSelectedCode] = useState();

  const activeWeek = getActiveWeek();

  const handleCodeClick = (code) => ({ target }) => {
    if (selectedCode === code) {
      target.classList.remove('selected');
      setTimeout(() => target.classList.add('selected'), 50);
      setTimeout(() => target.classList.remove('selected'), 100);
      setTimeout(() => target.classList.add('selected'), 150);
      return;
    }

    target.classList.add('selected');
    setTimeout(() => target.classList.remove('selected'), 50);
    setTimeout(() => target.classList.add('selected'), 150);

    copyTextToClipboard(code);
    setSelectedCode(code);
  };

  const renderScheduleItem = (week) => (
    <div className={`scheduleItem${week === activeWeek ? ' active' : ''}`}>
      <div className="labelContainer">
        <div className="labelWrapper">
          <span className="label">{t(`memorabilia.schedule.week${week}.label`)}</span>
        </div>
      </div>
      <div className="period">{t(`memorabilia.schedule.week${week}.period`)}</div>
      <div>{featured[week - 1].map(([name]) => name).join(' / ')}</div>
    </div>
  );

  const renderActionBlock = () => (
    <div className="actionBlock">
      <div className="prompt">
        <span>{t('memorabilia.schedule.prompt')}</span>
        <a
          href={faqUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Image src={iconQuestionMark} alt="rules" />
        </a>
      </div>
      <div className="codeRow">
        {activeWeek !== -1
          ? featured[activeWeek - 1].map(([name, code]) => (
            <div
              className={`button${code === selectedCode ? ' selected' : ''}`}
              onClick={handleCodeClick(code)}
              key={name}
            >
              {code === selectedCode ? `"${code}" ${t('memorabilia.schedule.copied')}` : name}
            </div>
          )) : Array.from({ length: 3 }, (_, index) => (
            <div className="button" key={index}>COMING SOON</div>
          ))}
      </div>
      <div className="prompt">
        {t('memorabilia.schedule.promptToShop')}
      </div>
      <a
        className="button shop"
        href={mirrorCollectionUrl}
        target="_blank"
        rel="noreferrer"
      >
        {t('memorabilia.schedule.goToShop')}
      </a>
    </div>
  );

  return isPreferPortraitMode
    ? <MobileVersion /> : (
      <Section
        className={styles.memorabiliaSection}
      >
        <SectionLayout type="code">
          <div className="scheduleContainer">
            {renderScheduleItem(1)}
            {renderScheduleItem(2)}
            {renderScheduleItem(3)}
            {renderScheduleItem(4)}
          </div>
          <div className="actionAreaContainer">
            <div className="imgWrapper">
              {featured[activeWeek === -1 ? 0 : activeWeek - 1]
                .map(([name]) => (
                  <Image
                    key={name}
                    src={imgMirror[name]}
                    alt={`MIRROR_${name}`}
                    placeholder="blur"
                  />
                ))}
            </div>
            {renderActionBlock()}
          </div>
        </SectionLayout>
      </Section>
    );
};

export default MemorabiliaSection;
