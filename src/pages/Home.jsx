import BestSellers from "@/components/carousel/BestSellers";
import ContentCarousel from "@/components/carousel/ContentCarousel";
import NewProduct from "@/components/carousel/NewProduct";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mx-auto m-5">
      <ContentCarousel />

      <div className="flex flex-col w-3/4 text-center mt-15 space-y-4 mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Our Best Sellers Products
          </h2>
          <Link to={'/shop'}>
            <p className="flex justify-between items-center gap-1.5">
              View All
              <ChevronRight size={15}/>
            </p>
          </Link>
        </div>
        
        <BestSellers />
      </div>

      <div className="flex flex-col w-3/4 text-center mt-15 space-y-4 mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            New Products
          </h2>
          <Link to={'/shop'}>
            <p className="flex justify-between items-center gap-1.5">
              View All
              <ChevronRight size={15}/>
            </p>
          </Link>
        </div>
        
        <NewProduct />
      </div>
    </div>
  );
};
export default Home;
