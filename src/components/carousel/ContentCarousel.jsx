import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import { useEffect, useState } from "react";
import BrandMarquee from "../marquee/BrandMarquee";
import HeroBanner from "./HeroBanner";

const ContentCarousel = () => {
  const [data, setData] = useState([]);
  const [brands, setBrands] = useState([]);

  const handleGetImage = async () => {
    try {
      const res = await axios.get("/banners/heroBanners.json");
      setData(res.data.heroBanners);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetBrands = async () => {
    try {
      const res = await axios.get("/brands/brands.json");
      setBrands(res.data.brands);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleGetImage();
      await handleGetBrands();
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-2">
      <HeroBanner banners={data} />
      
      <BrandMarquee brands={brands} speed={3000} space={48} fadeWidth={96} />

      {/* <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper h-[50vh] rounded-md"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item.image}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper> */}

      {/* <Swiper
        slidesPerView={5}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.download_url}
              className="rounded-md w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
};
export default ContentCarousel;
