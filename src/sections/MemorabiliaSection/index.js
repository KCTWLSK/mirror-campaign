import { useState } from "react";
import Image from "next/image";
import getConfig from "next/config";
import { useTranslation } from "next-export-i18n";

import MobileVersion from "./mobile";
import { useIsPreferPortraitMode } from "@/context/device";
import { Section, SectionLayout } from "@/components";
import { copyTextToClipboard, getActiveWeek } from "@/utils/helpers";

import styles from "./styles.module.scss";

import imgFeaturedGroupWeek1 from "@/../public/assets/week01.jpg";
import imgFeaturedGroupWeek2 from "@/../public/assets/week02.jpg";
import imgFeaturedGroupWeek3 from "@/../public/assets/week03.jpg";
import imgFeaturedGroupWeek4 from "@/../public/assets/week04.jpg";
import iconQuestionMark from "@/../public/assets/question_mark.png";

const imgFeaturedGroupWeek = [
  imgFeaturedGroupWeek1,
  imgFeaturedGroupWeek2,
  imgFeaturedGroupWeek3,
  imgFeaturedGroupWeek4,
];

const MemorabiliaSection = () => {
  const isPreferPortraitMode = useIsPreferPortraitMode();
  const { publicRuntimeConfig: { featured, faqUrl, kicksCrewUrl } } = getConfig();
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
              {name}
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
        href={kicksCrewUrl}
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
              <Image
                className="featuredImg"
                src={imgFeaturedGroupWeek[activeWeek - 1]}
                alt="featured"
              />
            </div>
            {renderActionBlock()}
          </div>
        </SectionLayout>
      </Section>
    );
};

export default MemorabiliaSection;
