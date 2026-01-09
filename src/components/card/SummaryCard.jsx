import useEcomStore from "@/store/ecom-store";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { listUserCart, saveAddress } from "@/api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberformat } from "@/utils/number";

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const navigate = useNavigate();

  const handleGetUserCart = async (token) => {
    try {
      const res = await listUserCart(token);
      setProducts(res.data.products);
      setCartTotal(res.data.cartTotal);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleGetUserCart(token);
    };

    fetchData();
  }, [token]);

  const handleSaveAddress = () => {
    if (!address) {
      return toast.warning("Please fill address");
    }

    saveAddress(token, address)
      .then((res) => {
        toast.success(res.data);
        setAddressSaved(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePayment = () => {
    if (!addressSaved) {
      return toast.warning("Please fill address");
    }
    navigate("/user/payment");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Left */}
      <div className="w-2/4">
        <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4">
          <h1 className="font-bold text-lg">Delivery address</h1>
          <textarea
            placeholder="Enter your address"
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-white rounded-sm p-2"
            required
          ></textarea>
          <Button
            onClick={handleSaveAddress}
            className="bg-blue-500 hover:bg-blue-700 shadow-md hover:scale-105 hover:translate-y-1 hover: duration-200"
          >
            Save Address
          </Button>
        </div>
      </div>
      {/* Right */}
      <div className="w-2/4">
        <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-2">
          <div className="flex justify-center items-center p-2 bg-white rounded-md">
            <h1 className="font-bold text-2xl">Order</h1>
          </div>

          {/* Item List */}
          {products?.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-bold">{item.product.title}</p>
                  <p className="text-sm">
                    Quantity: {item.count} x {numberformat(item.product.price)}
                  </p>
                </div>

                <div>
                  <p className="text-red-500 font-bold">
                    {numberformat(item.count * item.product.price)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <hr />

          <div>
            <div className="flex justify-between">
              <p>Shipping cost</p>
              <p>{numberformat()}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount value</p>
              <p>{numberformat()}</p>
            </div>
          </div>

          <hr />

          <div>
            <div className="flex justify-between">
              <p className="font-bold">Net total</p>
              <p className="text-red-500 font-bold text-lg">
                {numberformat(cartTotal)}
              </p>
            </div>
          </div>

          <hr />

          <div>
            <Button
              className="bg-green-600 hover:bg-green-700 shadow-md w-full"
              onClick={handlePayment}
              size="lg"
            >
              Pay now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SummaryCard;
