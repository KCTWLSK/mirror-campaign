import { useRef } from "react";
import getConfig from "next/config";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectCreative, Navigation } from "swiper";

import { CAMPAIGN_GIVEAWAY } from "@/data/constants";
import download from "@/utils/download";

import "swiper/scss";
import styles from "./styles.module.scss";

import imgWallpaperLOKMAN from "@/../public/assets/wallpaper_LOKMAN.jpg";
import imgWallpaperANSONLO from "@/../public/assets/wallpaper_ANSONLO.jpg";
import imgWallpaperALTON from "@/../public/assets/wallpaper_ALTON.jpg";
import imgWallpaperSTANLEY from "@/../public/assets/wallpaper_STANLEY.jpg";
import imgWallpaperKEUNGTO from "@/../public/assets/wallpaper_KEUNGTO.jpg";
import imgWallpaperAK from "@/../public/assets/wallpaper_AK.jpg";
import imgWallpaperFRANKIE from "@/../public/assets/wallpaper_FRANKIE.jpg";
import imgWallpaperJER from "@/../public/assets/wallpaper_JER.jpg";
import imgWallpaperIAN from "@/../public/assets/wallpaper_IAN.jpg";
import imgWallpaperEDAN from "@/../public/assets/wallpaper_EDAN.jpg";
import imgWallpaperTIGER from "@/../public/assets/wallpaper_TIGER.jpg";
import imgWallpaperJEREMY from "@/../public/assets/wallpaper_JEREMY.jpg";
import { useIsPreferPortraitMode } from "@/context/device";

const wallpapers = {
  LOKMAN: (
    <Image
      src={imgWallpaperLOKMAN}
      alt="MIRROR_wallpaper_LOKMAN"
      placeholder="blur"
    />
  ),
  ANSONLO: (
    <Image
      src={imgWallpaperANSONLO}
      alt="MIRROR_wallpaper_ANSONLO"
      placeholder="blur"
    />
  ),
  ALTON: (
    <Image
      src={imgWallpaperALTON}
      alt="MIRROR_wallpaper_ALTON"
      placeholder="blur"
    />
  ),
  STANLEY: (
    <Image
      src={imgWallpaperSTANLEY}
      alt="MIRROR_wallpaper_STANLEY"
      placeholder="blur"
    />
  ),
  KEUNGTO: (
    <Image
      src={imgWallpaperKEUNGTO}
      alt="MIRROR_wallpaper_KEUNGTO"
      placeholder="blur"
    />
  ),
  AK: (
    <Image
      src={imgWallpaperAK}
      alt="MIRROR_wallpaper_AK"
      placeholder="blur"
    />
  ),
  FRANKIE: (
    <Image
      src={imgWallpaperFRANKIE}
      alt="MIRROR_wallpaper_FRANKIE"
      placeholder="blur"
    />
  ),
  JER: (
    <Image
      src={imgWallpaperJER}
      alt="MIRROR_wallpaper_JER"
      placeholder="blur"
    />
  ),
  IAN: (
    <Image
      src={imgWallpaperIAN}
      alt="MIRROR_wallpaper_IAN"
      placeholder="blur"
    />
  ),
  EDAN: (
    <Image
      src={imgWallpaperEDAN}
      alt="MIRROR_wallpaper_EDAN"
      placeholder="blur"
    />
  ),
  TIGER: (
    <Image
      src={imgWallpaperTIGER}
      alt="MIRROR_wallpaper_TIGER"
      placeholder="blur"
    />
  ),
  JEREMY: (
    <Image
      src={imgWallpaperJEREMY}
      alt="MIRROR_wallpaper_JEREMY"
      placeholder="blur"
    />
  ),
}

const TRANS_DURATION = 0.75;
const SWIPER_FLIP_SPEED = 1500;
const SWIPER_FLIP_DELAY = 1500;

// SwiperCore.use([Autoplay, EffectCreative]);

const ResultView = ({ duration, delay }) => {
  const isPreferPortraitMode = useIsPreferPortraitMode();
  const { publicRuntimeConfig: { MIRROR } } = getConfig();
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  const ref = useRef();

  const renderDivider = () =>
    isPreferPortraitMode ? (
      <div className="divider" />
    ) : (
    <motion.div
      className="divider"
      initial={{ width: 0 }}
      animate={{
        width: '100%',
        transition: {
          duration: TRANS_DURATION,
          delay: duration + delay - 0.5,
        },
      }}
    />
  );

  const handleNavigationClick = (el) => {
    el.classList.add('clicked')
    setTimeout(() => el.classList.remove('clicked'), 100);
  }

  const renderWallpaperPicker = () => {
    const modules = [Navigation, EffectCreative];
    if (!isPreferPortraitMode || 1)
      modules.push(Autoplay);
    
    const props = isPreferPortraitMode && 0
      ? {} : {
        autoplay: {
          delay: SWIPER_FLIP_DELAY,
          disableOnInteraction: false,
        },
      };

    return (
      <div
        className="wallpaperPickerContainer"
        onMouseEnter={() => ref.current.autoplay?.stop()}
        onMouseLeave={() => ref.current.autoplay?.start()}
      >
        <Swiper
          className="wallpaperPicker"
          grabCursor
          slidesPerView={isPreferPortraitMode ? 'auto' : 3}
          centeredSlides
          speed={SWIPER_FLIP_SPEED}
          modules={modules}
          loop
          navigation
          onNavigationPrev={({ navigation: { prevEl } }) => handleNavigationClick(prevEl)}
          onNavigationNext={({ navigation: { nextEl } }) => handleNavigationClick(nextEl)}
          effect="creative"
          creativeEffect={{
            prev: {
              translate: ['calc(0vh - var(--wallpaper-height) * 0.53)', 0, -200],
            },
            next: {
              translate: ['calc(var(--wallpaper-height) * 0.53)', 0, -200],
            },
          }}
          onInit={(swiper) => ref.current = swiper}
          {...props}
        >
          {MIRROR.map((name) => (
            <SwiperSlide
              key={`mirror_slide_${name}`}
              onClick={() => download(`assets/wallpaper_${name}.jpg`, `wallpaper_${name}.jpg`)}
            >
              {wallpapers[name]}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  return (
    <motion.div
      className={styles.resultView}
      initial={{ x: '100%' }}
      animate={{
        x: 0,
        transition: { duration, delay }
      }}
    >
      <div className="container">
        <div className="header">
          <div>
            <h3>{t('submission.result.subtitle')}</h3>
            <h1>{t('submission.result.title')}</h1>
          </div>
          <div>{t('submission.result.description')}</div>
        </div>
        {renderDivider()}
        {renderWallpaperPicker()}
        {isPreferPortraitMode ? renderDivider() : null}
      </div>
    </motion.div>
  );
};

export default ResultView;
