import { useEffect, useState } from "react";
import Image from "next/image";
import getConfig from "next/config";
import { useTranslation } from "next-export-i18n";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import { useIsPreferPortraitMode } from "@/context/device";
import { Section, SectionLayout } from "@/components";
import { copyTextToClipboard } from "@/utils/helpers";
import MobileVersion from "./mobile";

import "swiper/scss";
import "swiper/scss/autoplay";
import styles from "./styles.module.scss";

import imgCardLOKMAN from "@/../public/assets/mirrorcards_front_LOKMAN.png";
import imgCardANSONLO from "@/../public/assets/mirrorcards_front_ANSONLO.png";
import imgCardALTON from "@/../public/assets/mirrorcards_front_ALTON.png";
import imgCardSTANLEY from "@/../public/assets/mirrorcards_front_STANLEY.png";
import imgCardKEUNGTO from "@/../public/assets/mirrorcards_front_KEUNGTO.png";
import imgCardAK from "@/../public/assets/mirrorcards_front_AK.png";
import imgCardFRANKIE from "@/../public/assets/mirrorcards_front_FRANKIE.png";
import imgCardJER from "@/../public/assets/mirrorcards_front_JER.png";
import imgCardIAN from "@/../public/assets/mirrorcards_front_IAN.png";
import imgCardEDAN from "@/../public/assets/mirrorcards_front_EDAN.png";
import imgCardTIGER from "@/../public/assets/mirrorcards_front_TIGER.png";
import imgCardJEREMY from "@/../public/assets/mirrorcards_front_JEREMY.png";

const SWIPER_FLIP_SPEED = 3000;
const SWIPER_FLIP_DELAY = 0;

const cards = {
  LOKMAN: (
    <Image
      src={imgCardLOKMAN}
      alt="MIRROR_card_LOKMAN"
      placeholder="blur"
    />
  ),
  ANSONLO: (
    <Image
      src={imgCardANSONLO}
      alt="MIRROR_card_ANSONLO"
      placeholder="blur"
    />
  ),
  ALTON: (
    <Image
      src={imgCardALTON}
      alt="MIRROR_card_ALTON"
      placeholder="blur"
    />
  ),
  STANLEY: (
    <Image
      src={imgCardSTANLEY}
      alt="MIRROR_card_STANLEY"
      placeholder="blur"
    />
  ),
  KEUNGTO: (
    <Image
      src={imgCardKEUNGTO}
      alt="MIRROR_card_KEUNGTO"
      placeholder="blur"
    />
  ),
  AK: (
    <Image
      src={imgCardAK}
      alt="MIRROR_card_AK"
      placeholder="blur"
    />
  ),
  FRANKIE: (
    <Image
      src={imgCardFRANKIE}
      alt="MIRROR_card_FRANKIE"
      placeholder="blur"
    />
  ),
  JER: (
    <Image
      src={imgCardJER}
      alt="MIRROR_card_JER"
      placeholder="blur"
    />
  ),
  IAN: (
    <Image
      src={imgCardIAN}
      alt="MIRROR_card_IAN"
      placeholder="blur"
    />
  ),
  EDAN: (
    <Image
      src={imgCardEDAN}
      alt="MIRROR_card_EDAN"
      placeholder="blur"
    />
  ),
  TIGER: (
    <Image
      src={imgCardTIGER}
      alt="MIRROR_card_TIGER"
      placeholder="blur"
    />
  ),
  JEREMY: (
    <Image
      src={imgCardJEREMY}
      alt="MIRROR_card_JEREMY"
      placeholder="blur"
    />
  ),
};

const MemorabiliaSection = () => {
  const isPreferPortraitMode = useIsPreferPortraitMode();
  const { publicRuntimeConfig: { MIRROR, CODE, kicksCrewUrl } } = getConfig();
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
        <div className="labelWrapper">
          <span className="label">{t(`memorabilia.schedule.week${index}.label`)}</span>
        </div>
        {index === activeIndex ? <span className="activeLabel">{t('memorabilia.schedule.active')}</span> : null}
      </div>
      <div className="period">{t(`memorabilia.schedule.week${index}.period`)}</div>
      <div>{t(`memorabilia.schedule.week${index}.member`)}</div>
    </div>
  );

  const renderCarousel = () => {
    const renderSlides = (back) =>
      MIRROR.map((name) => (
        <SwiperSlide
          key={`mirror_slide_${name}_${!!back}`}
        >
          {cards[name]}
        </SwiperSlide>
      ));

    return (
      <div className="carouselContainer">
        <Swiper
          className="carousel"
          grabCursor
          slidesPerView={3}
          centeredSlides
          speed={SWIPER_FLIP_SPEED}
          modules={[Autoplay]}
          spaceBetween={16}
          loop
          autoplay={{
            delay: SWIPER_FLIP_DELAY,
            disableOnInteraction: false,
          }}
        >
          {renderSlides()}
          {renderSlides(true)}
        </Swiper>
      </div>
    );
  };

  const renderActionBlock = () => (
    <div className="actionBlock">
      <div className="prompt">{t('memorabilia.schedule.prompt')}</div>
      <div className="codeRow">
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
            {renderCarousel()}
            {renderActionBlock()}
          </div>
        </SectionLayout>
      </Section>
    );
};

export default MemorabiliaSection;
