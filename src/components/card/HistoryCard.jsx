import { listOrderUser } from "@/api/user";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useEcomStore from "@/store/ecom-store";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { BadgeAlertIcon, BadgeCheckIcon } from "lucide-react";
import { dateformat } from "@/utils/dateformat";
import { numberformat } from "@/utils/number";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  const getOrder = async (token) => {
    try {
      const res = await listOrderUser(token);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      await getOrder(token);
    };

    fetchOrders();
  }, [token]);

  const changeStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-500";
      case "Processing":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      case "Canceled":
        return "bg-red-500";
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Order history</h1>
      {/* cover all for space*/}
      <div className="space-y-4">
        {/* Card (Loop Order) */}
        {orders?.map((orders) => {
          return (
            <div
              key={orders.id}
              className="bg-gray-100 p-4 rounded-md shadow-md"
            >
              {/* header */}
              <div className="flex justify-between">
                <div>
                  <p className="text-sm">Order date:</p>
                  <p className="font-bold mb-3">
                    {dateformat(orders.updatedAt)}
                  </p>
                </div>
                <div>
                  {
                    <Badge
                      variant="secondary"
                      className={`flex items-center justify-center ${changeStatusColor(orders.orderStatus)} text-white dark:bg-blue-600 py-1 px-2`}
                    >
                      {orders.orderStatus}
                    </Badge>
                  }
                </div>
              </div>
              {/* table (Loop Product) */}
              <div className="border-2 rounded-md p-2 bg-white">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.products?.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {product.product.title}
                        </TableCell>
                        <TableCell>
                          {numberformat(product.product.price)}
                        </TableCell>
                        <TableCell>{product.count}</TableCell>
                        <TableCell className="text-right">
                          {numberformat(product.price)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* footer (total amount) */}
              <div className="mt-8">
                <div className="text-right">
                  <p className="text-xl font-semibold ">Total Amount</p>
                  <p>{numberformat(orders.cartTotal)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HistoryCard;
