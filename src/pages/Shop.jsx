import CartCard from "@/components/card/CartCard";
import ProductCard from "@/components/card/ProductCard";
import SearchCard from "@/components/card/SearchCard";
import { ProductEmpty } from "@/components/empty/Empty";
import SkeletonProductGrid from "@/components/skeleton/SkeletonProductGrid ";
import { Skeleton } from "@/components/ui/skeleton";
import useEcomStore from "@/store/ecom-store";
import { useEffect } from "react";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const isLoading = useEcomStore((state) => state.isLoading);

  useEffect(() => {
    getProduct(100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-2 md:p-4">
      {/* Search */}
      <div className="w-full md:w-1/4 md:h-[90vh] p-4 bg-gray-100 rounded-lg">
        <SearchCard />
      </div>

      {/* Product */}
      <div className="flex-1 p-4 h-[90vh] rounded-lg overflow-y-auto">
        <p className="text-2xl font-bold mb-4">All Products</p>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Product Card */}
          {isLoading ? (
            <SkeletonProductGrid count={6}/>
          ) : products.length === 0 ? (
            <ProductEmpty />
          ) : (
            products.map((item) => <ProductCard key={item.id} item={item} />)
          )}
        </div>
      </div>

      {/* Cart */}
      <div className="hidden xl:block w-1/4 p-4 bg-gray-100 h-[90vh] rounded-lg overflow-y-auto">
        <CartCard />
      </div>
    </div>
  );
};
export default Shop;
