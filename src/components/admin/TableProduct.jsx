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
import { PencilLine, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { numberformat } from "@/utils/number";
import { dateformat } from "@/utils/dateformat";

export function TableProduct({ products, handleDelete }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center min-w-15">No.</TableHead>
            <TableHead className="min-w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Sold</TableHead>
            <TableHead className="text-right">Updated At</TableHead>
            <TableHead className="text-right p-3">Manage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="font-medium">
                {
                  product.images.length > 0 ? <img className="w-25 h-25 shadow-md rounded-md"
                  src={product.images[0].url} /> : <div className="flex justify-center items-center bg-gray-200 shadow-md rounded-md p-4 w-25 h-25">
                    <p className="inline-block
                    ">No image</p>
                  </div>
                }
              </TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell className="text-right">{numberformat(product.price)}</TableCell>
              <TableCell className="text-right">{product.quantity}</TableCell>
              <TableCell className="text-right">{product.sold}</TableCell>
              <TableCell className="text-right">{dateformat(product.updatedAt)}</TableCell>
              <TableCell className="text-center p-3">
                <div className="flex items-center justify-end gap-1.5">
                <Button variant="destructive" size="icon" aria-label="Delete"
                onClick={() => handleDelete(product.id)}>
                  <Trash />
                </Button>
                <Link to={'/admin/product/' + product.id}>
                  <Button variant="outline" type="button">
                    <PencilLine />
                  </Button>
                </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
