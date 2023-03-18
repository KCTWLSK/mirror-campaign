import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

import mirrorImgs from "@/data/mirrorImgs";

import "swiper/scss";
import "swiper/scss/autoplay";

SwiperCore.use([Autoplay]);

const Carosuel = () => {
  const renderSlides = () => {
    const slides = [], dupSlides = [];
    for (const name in mirrorImgs) {
      const getSlideWithKey = (key) => (
        <SwiperSlide key={key} className="swiper-slide">
          {mirrorImgs[name]}
        </SwiperSlide>
      );

      slides.push(getSlideWithKey(name));
      // duplicate slides for infinite looping purpose
      dupSlides.push(getSlideWithKey(`${name}_copy`));
    }

    slides.push(...dupSlides);
    return slides;
  };

  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={32}
      loop
      autoplay={{ delay: 0, disableOnInteraction: false }}
      speed={1000}
      className="carosuel"
      allowTouchMove={false}
    >
      {renderSlides()}
    </Swiper>
  );
};

export default Carosuel;