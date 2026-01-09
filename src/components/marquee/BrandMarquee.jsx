import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useMemo, useRef } from "react";
import BrandItem from "../BrandItem";

const BrandMarquee = ({
  brands = [],
  speed = 6000,
  space = 48,
  fadeWidth = 96,
}) => {
  const swiperRef = useRef(null);

  const loopBrands = useMemo(() => [...brands, ...brands], [brands]);

  if (brands.length === 0) return null;

  return (
    <div className="relative overflow-hidden my-8">
      {/* Fade Left */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full bg-linear-to-r from-white dark:from-black to-transparent"
        style={{ width: fadeWidth }}
      />

      {/* Fade Right */}
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full bg-linear-to-l from-white dark:from-black to-transparent"
        style={{ width: fadeWidth }}
      />

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView="auto"
        spaceBetween={space}
        loop
        loopAdditionalSlides={brands.length}
        speed={speed}
        allowTouchMove={true}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        modules={[Autoplay]}
        className="py-4"
      >
        {loopBrands.map((brand, index) => {
          return (
            <SwiperSlide key={`${brand.id}-${index}`} className="w-auto!">
              <BrandItem brand={brand} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BrandMarquee;
