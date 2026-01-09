import useEcomStore from "@/store/ecom-store";
import { ArrowRightIcon, ListCheck, Trash2 } from "lucide-react";
import { Card, CardAction, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "@/api/user";
import { toast } from "react-toastify";
import { numberformat } from "@/utils/number";
import { CartEmpty } from "../empty/Empty";

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct);

  const navigate = useNavigate();

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        console.log(res);
        toast.success("Added to cart successfully");
        navigate("/checkout");
      })
      .catch((error) => {
        console.log(error);
        toast.warning(error.response.data.message);
      });
  };

  return (
    <>
      {cart.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className="bg-gray-200 border-2 shadow-md rounded-md p-4">
          {/* Header */}
          <div className="flex gap-4 m-3">
            <ListCheck size={36} />
            <h1 className="text-xl font-bold flex items-center">
              Product List : {cart.length} items
            </h1>
          </div>

          {/* List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left */}
            <div className="md:col-span-2">
              {cart.map((item, index) => (
                <Card key={index} className="p-3 my-3">
                  <div className="relative">
                    {/* Row 1 */}
                    <div className="flex justify-between items-center ">
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
                        <div>
                          <p className="font-bold">{item.title}</p>
                          <p className="text-muted-foreground text-sm">
                            {numberformat(item.price)} x {item.count}
                          </p>
                        </div>
                      </div>
                      {/* Right */}
                      <div className="flex justify-center items-center translate-y-5">
                        <span className="font-bold text-blue-500">
                          {numberformat(item.price * item.count)}
                        </span>
                      </div>
                    </div>

                    {/* button delete */}
                    <div className="absolute top-0 right-0">
                      <Button
                        className="hover:bg-red-500"
                        type="button"
                        size="icon-sm"
                        variant="destructive"
                        aria-label="Delete"
                        onClick={() => actionRemoveProduct(item.id)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Right */}
            <div className="text-lg font-bold bg-white p-4 my-3 rounded-xl shadow-md">
              <p>Total</p>
              <div className="flex justify-between items-center text-lg font-bold mb-4">
                <span>Grand Total :</span>
                <span>{numberformat(getTotalPrice())}</span>
              </div>

              <div className="flex flex-col gap-2">
                {user ? (
                  <Button
                    disabled={cart.length < 1}
                    onClick={handleSaveCart}
                    type="submit"
                    className="w-full h-10"
                  >
                    Go to Checkout
                  </Button>
                ) : (
                  <Link to={"/login"}>
                    <Button type="submit" className="w-full h-10">
                      Login
                    </Button>
                  </Link>
                )}

                <Link to={"/shop"}>
                  <Button
                    type="submit"
                    className="text-black hover:bg-gray-400 bg-gray-300 w-full h-10"
                  >
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ListCart;
