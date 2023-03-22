import { useRef } from "react";
import getConfig from "next/config";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

import download from "@/utils/download";

import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/navigation";
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

const SWIPER_FLIP_SPEED = 1500;
const SWIPER_FLIP_DELAY = 1500;

const ResultView = ({ duration, delay }) => {
  const { publicRuntimeConfig: { MIRROR } } = getConfig();
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  const ref = useRef();

  const handleNavigationClick = (el) => {
    el.classList.add('clicked')
    setTimeout(() => el.classList.remove('clicked'), 100);
  }

  const renderWallpaperPicker = () => (
    <div
      className="wallpaperPickerContainer"
      onMouseEnter={() => ref.current.autoplay?.stop()}
      onMouseLeave={() => ref.current.autoplay?.start()}
    >
      <Swiper
        className="wallpaperPicker"
        grabCursor
        slidesPerView={1}
        centeredSlides
        speed={SWIPER_FLIP_SPEED}
        modules={[Navigation, Autoplay]}
        loop
        navigation
        onNavigationPrev={({ navigation: { prevEl } }) => handleNavigationClick(prevEl)}
        onNavigationNext={({ navigation: { nextEl } }) => handleNavigationClick(nextEl)}
        autoplay={{
          delay: SWIPER_FLIP_DELAY,
          disableOnInteraction: false,
        }}
        onInit={(swiper) => ref.current = swiper}
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
        <div className="divider" />
        {renderWallpaperPicker()}
        <div className="divider" />
      </div>
    </motion.div>
  );
};

export default ResultView;
