import getConfig from "next/config";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { motion } from "framer-motion";

import { useIsPreferPortraitMode } from "@/context/device";
import {
  VAR_ON_SCREEN,
  TRANS_DELAY_INIT,
  SECTION_GIVEAWAY,
  CAMPAIGN_GIVEAWAY,
} from "@/data/constants";
import { Section, SectionBanner, SectionLayout } from "@/components";
import ShowcaseBox from "./components/ShowcaseBox";

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
const SWIPER_FLIP_SPEED = 1500;

const GivewaySection = () => {
  const isPreferPortraitMode = useIsPreferPortraitMode();
  const { publicRuntimeConfig: { MIRROR } } = getConfig();

  const renderBoxsetContent = () => (
    <div className="box showcase">
      <Swiper
        className="showcaseContent"
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{ delay: SWIPER_FLIP_DELAY, disableOnInteraction: false }}
        speed={SWIPER_FLIP_SPEED}
        loop
        allowTouchMove={false}
      >
        {MIRROR.map((name) => (
          <SwiperSlide key={`mirror_slide_${name}`}>
            {boxsets[name]}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  const renderBoxDisplay = () => (
    <div className="box display">
      <div className="grid">
        <div /><div /><div />
        <div /><div /><div />
        <div /><div /><div />
      </div>
      <Image src={animeBoxset} alt="giveaway box" />
    </div>
  );

  return (
    <Section
      id={SECTION_GIVEAWAY}
      className={styles.giveawaySection}
      {...(isPreferPortraitMode ? {
        viewport: { once: true, amount: (5 / 6) * 0.8 },
      } : {})}
    >
      {isPreferPortraitMode
        ? <SectionBanner type={CAMPAIGN_GIVEAWAY} top /> : null}
      <SectionLayout type={CAMPAIGN_GIVEAWAY}>
        <ShowcaseBox>
          {renderBoxsetContent()}
        </ShowcaseBox>
        <ShowcaseBox>
          {renderBoxDisplay()}
        </ShowcaseBox>
      </SectionLayout>
    </Section>
  );
};

export default GivewaySection;
