import { listProductBy } from "@/api/product";
import { useEffect, useState } from "react";
import ProductCard from "../card/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BestSellers = () => {
  const [listProduct, setListProduct] = useState([]);

  const getListProductBy = async () => {
    try {
      const res = await listProductBy("sold", "desc", 5);
      setListProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getListProductBy();
    };

    fetchData();
  }, []);

  return (
    <div className="relative">
      <button className="best-prev absolute -left-13 top-1/2 -translate-y-1/2 z-10 bg-white border-2 shadow-md w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100">
        <ChevronLeft />
      </button>

      <button className="best-next absolute -right-13 top-1/2 -translate-y-1/2 z-10 bg-white border-2 shadow-md w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100">
        <ChevronRight />
      </button>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".best-prev",
          nextEl: ".best-next",
        }}
        spaceBetween={32}
        slidesPerView={4}
        breakpoints={{
          0: { slidesPerView: 1.1 },
          640: { slidesPerView: 2.1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4
          },
        }}
        className="mySwiper"
      >
        {listProduct?.map((product) => (
          <SwiperSlide key={product.id} className="py-8">
            <ProductCard item={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default BestSellers;
