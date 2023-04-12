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

const SWIPER_FLIP_SPEED = 3000;
const SWIPER_FLIP_DELAY = 0;

const ContentSection = ({ activeWeek }) => {
  const { publicRuntimeConfig: { featured } } = getConfig();
  const { t } = useTranslation();

  const [slideGap, setSlideGap] = useState();
  const ref = useRef();

  useEffect(() => {
    setSlideGap(+(getComputedStyle(ref.current).getPropertyValue('--slide-gap').match(/[0-9]+/)));
  }, []);

  const renderCarousel = () => {
    const renderSlides = () =>
      featured[activeWeek === -1 ? 0 : activeWeek - 1].map(([name]) => (
        <SwiperSlide
          key={`mirror_slide_${name}`}
        >
          <Image
            src={imgMirror[name]}
            alt={`MIRROR_${name}`}
            placeholder="blur"
          />
        </SwiperSlide>
      ));

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
          {renderSlides()}
          {renderSlides()}
          {renderSlides()}
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
      {renderCarousel()}
      <div className="body">{t('memorabilia.body')}</div>
      <SectionBanner type="code" />
    </Section>
  );
};

export default ContentSection;
