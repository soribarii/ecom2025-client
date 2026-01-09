import { useState, useEffect } from "react";
import { createCategory, editCategory, removeCategory } from "@/api/category";
import { Button } from "../ui/button";
import useEcomStore from "@/store/ecom-store";
import { toast } from "react-toastify";
import { PencilLine, Trash } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Link } from "react-router-dom";
import TableCategory from "./TableCategory";
import { CategoryEmpty } from "../empty/Empty";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  const [editForm, setEditForm] = useState({
    id: 0,
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  useEffect(() => {
      getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("Please enter category name");
    }
    try {
      setLoading(true);
      const res = await createCategory(token, { name });
      const category = res.data?.name;
      toast.success(`Add Category ${category} successfully!`);
      setName("");
      setLoading(false);
      getCategory();
      e.target[0].value = "";
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleOnChange = (e, id) => {
    const { name, value } = e.target;

    setEditForm((prevForm) => ({
      ...prevForm,
      id: id,
      [name]: value,
    }));

  };

  const handleEdit = async (newCategory) => {
    try {
      const res = await editCategory(token, newCategory)
      toast.success(`Edit Category ${res.data?.name} successfully!`)
      getCategory();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await removeCategory(token, id);
      toast.success(`Delete Category ${res.data?.name} successfully!`);
      getCategory();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white shadow-md rounded-md">
      <h1 className="mb-5 text-2xl font-semibold">Category Management</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <Input
            className="border w-70 min-x-15"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          {loading ? (
            <Button className="mx-5 min-w-10 sm:w-30" size="sm" variant="outline" disabled>
              <Spinner />
              Submit
            </Button>
          ) : (
            <Button
              className="mx-5 min-w-10 sm:w-30"
              size="sm"
              variant="default"
              type="submit"
            >
              Submit
            </Button>
          )}
        </div>
      </form>

      <div>
        {loading ? (
          <div className="min-h-[70vh] flex items-center justify-center gap-4">
            <Spinner />
            Loading categories
          </div>
        ) : categories.length === 0 ? (
          <CategoryEmpty />
        ) : (
          <div className="rounded-md border">
            <TableCategory
              categories={categories}
              handleRemove={handleRemove}
              handleEdit={handleEdit}
              editForm={editForm}
              handleOnChange={handleOnChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default FormCategory;
