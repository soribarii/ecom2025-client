import useEcomStore from "@/store/ecom-store";
import { numberformat } from "@/utils/number";
import { ShoppingCart } from "lucide-react";
import { motion as Motion } from "motion/react";

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="w-48 border rounded-md shadow-sm hover:shadow-lg transition-shadow">
          {/* image */}
          <div>
            {item.images && item.images.length > 0 ? (
              <img
                src={item.images[0].url}
                className="w-full h-40 object-contain"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 text-center flex justify-center items-center">
                No Image
              </div>
            )}
          </div>

          {/* title */}
          <div className="py-2 mx-3">
            <p className="text-xl truncate">{item.title}</p>
            <p className="text-sm text-gray-500 truncate">{item.description}</p>
          </div>

          {/* price */}
          <div className="pb-2 mx-3 flex justify-between items-center">
            <span className="text-sm font-bold ">
              {numberformat(item.price)}
            </span>
            <button
              onClick={() => {
                actionAddtoCart(item);
              }}
              className="bg-gray-400 p-2 rounded-sm hover:bg-gray-500 shadow-md"
            >
              <ShoppingCart />
            </button>
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );
};
export default ProductCard;
