import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import getConfig from "next/config";
import { useTranslation } from "next-export-i18n";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import { Section, SectionBanner } from "@/components";

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

const ContentSection = () => {
  const { publicRuntimeConfig: { MIRROR } } = getConfig();
  const { t } = useTranslation();

  const [slideGap, setSlideGap] = useState();
  const ref = useRef();

  useEffect(() => {
    setSlideGap(+(getComputedStyle(ref.current).getPropertyValue('--slide-gap').match(/[0-9]+/)));
  }, []);

  const renderCarousel = () => {
    return slideGap ? (
      <div className="carouselContainer">
        <Swiper
          className="carousel"
          slidesPerView="auto"
          centeredSlides
          speed={SWIPER_FLIP_SPEED}
          modules={[Autoplay]}
          spaceBetween={slideGap}
          loop
          autoplay={{
            delay: SWIPER_FLIP_DELAY,
            disableOnInteraction: false,
          }}
        >
          {MIRROR.map((name) => (
            <SwiperSlide
              key={`mirror_slide_${name}`}
            >
              {cards[name]}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    ) : null;
  };

  return (
    <Section
      className={styles.contentSection}
      ref={ref}
    >
      <h1>{t('memorabilia.header')}</h1>
      <div className="subtitle">{t('memorabilia.subtitle')}</div>
      {renderCarousel()}
      <div className="body">{t('memorabilia.body')}</div>
      <SectionBanner type="code" />
    </Section>
  );
};

export default ContentSection;
