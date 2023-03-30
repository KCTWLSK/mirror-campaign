import { useEffect, useState } from "react";
import getConfig from "next/config";
import { useTranslation } from "next-export-i18n";

import { copyTextToClipboard } from "@/utils/helpers";
import { Section, SectionBanner } from "@/components";

import styles from "./styles.module.scss";

const ScheduleSection = () => {
  const { publicRuntimeConfig: { CODE, kicksCrewUrl } } = getConfig();
  const { t } = useTranslation();

  const [activeIndex, setActiveIndex] = useState();
  const [selectedName, setSelectedName] = useState();

  useEffect(() => {
    const d = new Date();

    setActiveIndex(2
      // d >= Date.parse('17 April 2023 00:00:00 GMT+8') && d <= Date.parse('23 April 2023 23:59:59 GMT+8') ? 1
      //   : d >= Date.parse('24 April 2023 00:00:00 GMT+8') && d <= Date.parse('30 April 2023 23:59:59 GMT+8') ? 2
      //   : d >= Date.parse('1 May 2023 00:00:00 GMT+8') && d <= Date.parse('7 May 2023 23:59:59 GMT+8') ? 3
      //   : d >= Date.parse('8 May 2023 00:00:00 GMT+8') && d <= Date.parse('14 May 2023 23:59:59 GMT+8') ? 4 : Infinity
    );
  }, []);

  const handleCodeClick = (name) => ({ target }) => {
    if (selectedName === name) {
      target.classList.remove('selected');
      setTimeout(() => target.classList.add('selected'), 100);
      return;
    }

    target.classList.add('selected');
    setTimeout(() => target.classList.remove('selected'), 50);
    setTimeout(() => target.classList.add('selected'), 150);

    copyTextToClipboard(CODE[name]);
    setSelectedName(name);
  };

  const renderScheduleItem = (index) => (
    <div className={`scheduleItem${index < activeIndex ? ' expired' : index === activeIndex ? ' active' : ''}`}>
      <div className="labelContainer">
        <span className="label">{t(`memorabilia.schedule.week${index}.label`)}</span>
        {index === activeIndex ? <span className="activeLabel">{t('memorabilia.schedule.active')}</span> : null}
      </div>
      <div className="period">{t(`memorabilia.schedule.week${index}.period`)}</div>
      {index === activeIndex
        ? renderActionBlock()
        : <div>{t(`memorabilia.schedule.week${index}.member`)}</div>}
    </div>
  );

  const renderActionBlock = () => (
    <div className="actionBlock">
      <div className="prompt">{t('memorabilia.schedule.prompt')}</div>
      {t(`memorabilia.schedule.week${activeIndex}.member`)
        .split(', ').map((name) => (
          <div
            className={`button${name === selectedName ? ' selected' : ''}`}
            onClick={handleCodeClick(name)}
            key={name}
          >
            {name === selectedName ? `${name} x CODE COPIED!` : name}
          </div>
        ))}
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
