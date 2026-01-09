import { changeOrderStatus, listOrderAdmin } from "@/api/admin";
import useEcomStore from "@/store/ecom-store";
import {
  Badge,
  BadgeAlertIcon,
  BadgeCheckIcon,
  PencilLine,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
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
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { numberformat } from "@/utils/number";
import { dateformat } from "@/utils/dateformat";
import { OrderEmpty } from "../empty/Empty";
import { Spinner } from "../ui/spinner";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrdersAdmin = async (token) => {
    try {
      const res = await listOrderAdmin(token);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      await getOrdersAdmin(token);
    };

    fetchOrders();
  }, [token]);

  const handleChangeOrderStatus = async (token, orderId, orderStatus) => {
    try {
      const res = await changeOrderStatus(token, orderId, orderStatus);
      console.log(res);
      toast.success("Status updated successfully!");
      getOrdersAdmin(token);
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="p-4 sm:p-6 md:p-8 bg-white shadow-md rounded-md">
      {loading ? (
        <div className="min-h-[70vh] flex items-center justify-center gap-4">
          <Spinner />
          Loading orders
        </div>
      ) : orders.length === 0 ? (
        <OrderEmpty />
      ) : (
        <div>
          <h2 className="scroll-m-20 mb-5 text-2xl font-semibold tracking-tight first:mt-0">
            Orders Management
          </h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">No.</TableHead>
                  <TableHead className="text-center">User</TableHead>
                  <TableHead className="text-center">Order date</TableHead>
                  <TableHead className="text-center">Product</TableHead>
                  <TableHead className="text-center">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Manage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((orders, index) => {
                  return (
                    <TableRow key={orders.id}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>{orders.orderedBy?.email}</TableCell>
                      <TableCell>{dateformat(orders.createdAt)}</TableCell>
                      <TableCell>
                        <div className="inline-block text-left">
                          <ul className="list-disc list-inside space-y-1">
                            {orders.products?.map((product) => (
                              <li key={product.id}>
                                <span className="font-medium">
                                  {product.product.title}
                                </span>
                                <div className="ml-5">
                                  {product.count} x{" "}
                                  {numberformat(product.product.price)}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {numberformat(orders.cartTotal)}
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`${changeStatusColor(
                            orders.orderStatus
                          )} text-white px-3 py-1 rounded-full inline-block w-[120px]`}
                        >
                          {orders.orderStatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center">
                          <Select
                            defaultValue={orders.orderStatus}
                            onValueChange={(value) =>
                              handleChangeOrderStatus(token, orders.id, value)
                            }
                          >
                            <SelectTrigger className="w-[130px] bg-white border-2">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Not Process">
                                  Not Process
                                </SelectItem>
                                <SelectItem value="Processing">
                                  Processing
                                </SelectItem>
                                <SelectItem value="Completed">
                                  Completed
                                </SelectItem>
                                <SelectItem value="Canceled">
                                  Canceled
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};
export default TableOrders;
