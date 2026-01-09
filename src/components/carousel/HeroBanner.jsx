import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const HeroBanner = ({ banners = [] }) => {
  return (
    <Swiper
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="h-[60vh] rounded-xl overflow-hidden"
    >
      {banners?.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            {/* Image */}
            <img
              src={item.image}
              className="w-full h-full object-cover"
              alt={item.title}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

            {/* Text */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 max-w-2xl text-white space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {item.title}
                </h1>

                <p className="text-lg text-white/80">
                  {item.description}
                </p>

                <button className="mt-4 inline-flex items-center rounded-md bg-white px-6 py-3 text-black font-medium hover:bg-gray-200 transition">
                  <Link to={'/shop'}>{item.cta}</Link>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroBanner;
