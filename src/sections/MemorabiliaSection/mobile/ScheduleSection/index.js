import { useEffect, useState } from "react";
import Image from "next/image";
import getConfig from "next/config";
import { useTranslation } from "next-export-i18n";

import { copyTextToClipboard } from "@/utils/helpers";
import { Section, SectionBanner } from "@/components";

import styles from "./styles.module.scss";

import iconQuestionMark from "@/../public/assets/question_mark.png";

const ScheduleSection = ({ activeWeek }) => {
  const { publicRuntimeConfig: { featured, mirrorCollectionUrl } } = getConfig();
  const { t } = useTranslation();

  const [selectedCode, setSelectedCode] = useState();

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
        <span className="label">{t(`memorabilia.schedule.week${week}.label`)}</span>
      </div>
      <div className="period">{t(`memorabilia.schedule.week${week}.period`)}</div>
      {week === activeWeek
        ? renderActionBlock()
        : <div>{featured[week - 1].map(([name]) => name).join(' / ')}</div>}
    </div>
  );

  const renderActionBlock = () => (
    <div className="actionBlock">
      <div className="prompt">
        <span>{t('memorabilia.schedule.prompt')}</span>
        <a
          href={mirrorCollectionUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Image src={iconQuestionMark} alt="rules" />
        </a>
      </div>
      {activeWeek !== -1
        ? featured[activeWeek - 1].map(([name, code]) => (
          <div
            className={`button${code === selectedCode ? ' selected' : ''}`}
            onClick={handleCodeClick(code)}
            key={name}
          >
            {selectedCode === code ? `"${code}" ${t('memorabilia.schedule.copied')}` : name}
          </div>
        )) : Array.from({ length: 3}, (_, index) => (
          <div className="button" key={index}>COMING SOON</div>
        ))}
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
  
  return (
    <Section className={styles.scheduleSection}>
      {renderScheduleItem(1)}
      {renderScheduleItem(2)}
      {renderScheduleItem(3)}
      {renderScheduleItem(4)}
      <SectionBanner type="code" />
    </Section>
  );
};

export default ScheduleSection;
