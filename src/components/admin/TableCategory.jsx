import { dateformat } from "@/utils/dateformat";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { PencilLine, Trash } from "lucide-react";
import RemoveAlertDialog from "../dialog/RemoveAlertDialog";
import { EditDialogCategory } from "../dialog/EditDialog";

const TableCategory = ({ categories, handleRemove, handleEdit, editForm, handleOnChange }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Updated At</TableHead>
            <TableHead className="text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category, index) => {
            return (
              <TableRow key={category.id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className="text-center">
                  {dateformat(category.updatedAt)}
                </TableCell>
                <TableCell className="text-center p-3">
                  <div className="flex justify-center items-center gap-1.5">
                    <RemoveAlertDialog
                      name={category.name}
                      button={
                        <Button
                          variant="destructive"
                          size="icon"
                          aria-label="remove"
                        >
                          <Trash />
                        </Button>
                      }
                      actionRemove={() => handleRemove(category.id)}
                    />
                    <EditDialogCategory
                      id={category.id}
                      name={category.name}
                      button={
                        <Button variant="outline" type="button">
                          <PencilLine />
                        </Button>
                      }
                      editForm={editForm}
                      actionEdit={handleEdit}
                      handleOnChange={handleOnChange}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default TableCategory;
