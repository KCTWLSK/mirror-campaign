import getConfig from "next/config";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

import { useIsPreferPortraitMode } from "@/context/device";
import { SECTION_GIVEAWAY, CAMPAIGN_GIVEAWAY } from "@/data/constants";
import { Section, SectionLayout } from "@/components";
import ShowcaseBox from "./components/ShowcaseBox";
import MobileVersion from "./mobile";

import "swiper/scss";
import "swiper/scss/navigation";
import styles from "./styles.module.scss";

import imgBoxsetLOKMAN from "@/../public/assets/boxset_LOKMAN.jpg";
import imgBoxsetANSONLO from "@/../public/assets/boxset_ANSONLO.jpg";
import imgBoxsetALTON from "@/../public/assets/boxset_ALTON.jpg";
import imgBoxsetSTANLEY from "@/../public/assets/boxset_STANLEY.jpg";
import imgBoxsetKEUNGTO from "@/../public/assets/boxset_KEUNGTO.jpg";
import imgBoxsetAK from "@/../public/assets/boxset_AK.jpg";
import imgBoxsetFRANKIE from "@/../public/assets/boxset_FRANKIE.jpg";
import imgBoxsetJER from "@/../public/assets/boxset_JER.jpg";
import imgBoxsetIAN from "@/../public/assets/boxset_IAN.jpg";
import imgBoxsetEDAN from "@/../public/assets/boxset_EDAN.jpg";
import imgBoxsetTIGER from "@/../public/assets/boxset_TIGER.jpg";
import imgBoxsetJEREMY from "@/../public/assets/boxset_JEREMY.jpg";
import animeBoxset from "@/../public/assets/giveaway_box.gif";
import { useRef, useState } from "react";

const boxsets = {
  LOKMAN: (
    <Image
      src={imgBoxsetLOKMAN}
      alt="MIRROR_boxset_LOKMAN"
      placeholder="blur"
    />
  ),
  ANSONLO: (
    <Image
      src={imgBoxsetANSONLO}
      alt="MIRROR_boxset_ANSONLO"
      placeholder="blur"
    />
  ),
  ALTON: (
    <Image
      src={imgBoxsetALTON}
      alt="MIRROR_boxset_ALTON"
      placeholder="blur"
    />
  ),
  STANLEY: (
    <Image
      src={imgBoxsetSTANLEY}
      alt="MIRROR_boxset_STANLEY"
      placeholder="blur"
    />
  ),
  KEUNGTO: (
    <Image
      src={imgBoxsetKEUNGTO}
      alt="MIRROR_boxset_KEUNGTO"
      placeholder="blur"
    />
  ),
  AK: (
    <Image
      src={imgBoxsetAK}
      alt="MIRROR_boxset_AK"
      placeholder="blur"
    />
  ),
  FRANKIE: (
    <Image
      src={imgBoxsetFRANKIE}
      alt="MIRROR_boxset_FRANKIE"
      placeholder="blur"
    />
  ),
  JER: (
    <Image
      src={imgBoxsetJER}
      alt="MIRROR_boxset_JER"
      placeholder="blur"
    />
  ),
  IAN: (
    <Image
      src={imgBoxsetIAN}
      alt="MIRROR_boxset_IAN"
      placeholder="blur"
    />
  ),
  EDAN: (
    <Image
      src={imgBoxsetEDAN}
      alt="MIRROR_boxset_EDAN"
      placeholder="blur"
    />
  ),
  TIGER: (
    <Image
      src={imgBoxsetTIGER}
      alt="MIRROR_boxset_TIGER"
      placeholder="blur"
    />
  ),
  JEREMY: (
    <Image
      src={imgBoxsetJEREMY}
      alt="MIRROR_boxset_JEREMY"
      placeholder="blur"
    />
  ),
}

const SWIPER_FLIP_DELAY = 1000;
const SWIPER_FLIP_SPEED = 1000;

const GivewaySection = () => {
  const isPreferPortraitMode = useIsPreferPortraitMode();
  const { publicRuntimeConfig: { MIRROR } } = getConfig();

  const ref = useRef();

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavigationClick = (el) => {
    el.classList.add('clicked')
    setTimeout(() => el.classList.remove('clicked'), 100);
  }

  const renderBoxsetContent = () => (
    <div
      className="box showcase"
      onMouseEnter={() => ref.current.autoplay.stop()}
      onMouseLeave={() => ref.current.autoplay.start()}
    >
      <Swiper
        className="showcaseContent"
        slidesPerView={1}
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: SWIPER_FLIP_DELAY, disableOnInteraction: false }}
        speed={SWIPER_FLIP_SPEED}
        loop
        navigation
        onInit={(swiper) => ref.current = swiper}
        onNavigationPrev={({ navigation: { prevEl } }) => handleNavigationClick(prevEl)}
        onNavigationNext={({ navigation: { nextEl } }) => handleNavigationClick(nextEl)}
        onSlideChange={({ realIndex }) => setActiveIndex(realIndex)}
      >
        {MIRROR.map((name) => (
          <SwiperSlide key={`mirror_slide_${name}`}>
            {boxsets[name]}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  const renderBoxsetDetail = () => (
    <div className="box detailContainer">
      <h1>{MIRROR[activeIndex]}</h1>
      <div className="subtitle">2018 THE FIRST MIRROR LIVE CONCERT</div>
      <div className="prizeList">
        <div className="prizeContainer">
          <div className="prize">First prize</div>
          <div className="content">Signed framed polaroid packaged in signed KICKS CREW x MIRROR packaging.</div>
        </div>
        <div className="prizeContainer">
          <div className="prize">Second prize</div>
          <div className="content">Mirror member memorabilla crew card & tag pack.</div>
        </div>
        <div className="prizeContainer">
          <div className="prize">Third prize</div>
          <div className="content">Signed hoodie.</div>
        </div>
      </div>
    </div>
  );

  return isPreferPortraitMode
    ? <MobileVersion /> : (
      <Section
        id={SECTION_GIVEAWAY}
        className={styles.giveawaySection}
      >
        <SectionLayout type={CAMPAIGN_GIVEAWAY}>
          <ShowcaseBox>
            {renderBoxsetContent()}
          </ShowcaseBox>
          {renderBoxsetDetail()}
        </SectionLayout>
      </Section>
    );
};

export default GivewaySection;
