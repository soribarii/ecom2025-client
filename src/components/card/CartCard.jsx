import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import useEcomStore from "@/store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { numberformat } from "@/utils/number";

const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct
  );
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

  const navigate = useNavigate()

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Cart</CardTitle>
          <CardDescription>Please check order items in your cart</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Card */}
          {carts.map((item, index) => (
            <div key={index} className="border p-3 rounded-sm shadow-sm mb-5">
              <div className="mb-3">
                {/* Row 1 */}
                <div className="flex justify-between mb-2 overflow-hidden">
                  {/* Left */}
                  <div className="flex gap-2 items-center">
                    {item.images && item.images.length > 0 ? (
                      <img
                        className="w-16 h-16 rounded-sm mr-2"
                        src={item.images[0].url}
                      />
                    ) : (
                      <div className="flex justify-center items-center text-center w-16 h-16 bg-gray-200 rounded-sm mr-2">
                        No Image
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="font-bold">{item.title}</p>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {/* Right */}
                  <CardAction>
                    <Button
                      className="hover:bg-red-500"
                      variant="destructive"
                      size="icon-sm"
                      aria-label="Delete"
                      onClick={() => actionRemoveProduct(item.id)}
                    >
                      <Trash2 />
                    </Button>
                  </CardAction>
                </div>

                {/* Row 2 */}
                <div className="flex justify-between">
                  {/* Left */}
                  <div className="flex justify-center items-center border rounded-sm px-2 py-1 shadow-sm overflow-hidden">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-xs hover:bg-gray-300"
                      onClick={() =>
                        actionUpdateQuantity(item.id, item.count - 1)
                      }
                    >
                      <Minus size={16} />
                    </button>

                    <span className="px-4">{item.count}</span>

                    <button
                      className="px-2 py-1 bg-gray-200 rounded-xs hover:bg-gray-300"
                      onClick={() =>
                        actionUpdateQuantity(item.id, item.count + 1)
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {/* Right */}
                  <div className="flex items-center ml-3 overflow-hidden">
                    <span className="font-bold text-blue-500">
                      {numberformat(item.price * item.count)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Total Price */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-lg font-bold overflow-hidden">
              <p>Total Price:</p>
              <p>{numberformat(getTotalPrice())}</p>
            </div>

            <div>
                <Button type="submit" className="w-full h-11" onClick={() => navigate('/cart')} disabled={carts.length < 1}>
                  confirm Order
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default CartCard;
