import useEcomStore from "@/store/ecom-store";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FieldAddProduct } from "../form/FieldAddProduct";
import { createProduct, deleteProduct, removeFiles } from "@/api/product";
import { toast } from "react-toastify";
import { TableProduct } from "./TableProduct";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spinner } from "../ui/spinner";
import { ProductEmpty } from "../empty/Empty";

const FormAddProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const setImagesForm = useEcomStore((state) => state.setImagesForm);
  const images = useEcomStore((state) => state.images);
  const setDeletedImages = useEcomStore((state) => state.setDeletedImages);
  const [submitResetFile, setSubmitResetFile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tab, setTab] = useState("add");

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getCategory(), getProduct(100)]);
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const payload = {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
      categoryId: Number(form.categoryId),
      images: images,
    };

    try {
      const res = await createProduct(token, payload);

      // set form empty
      setForm({
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        categoryId: "",
        images: [],
      });

      // submitResetFile
      setSubmitResetFile(true);

      // set form empty
      setImagesForm([]);

      // set deletedImages empty
      setDeletedImages([]);

      // alert success
      toast.success(`Add product ${res.data?.title} successfully!`);

      // get new products
      getProduct(100);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      // deleted in DB
      const res = await deleteProduct(token, id);

      const deletedImages = res.data.images;
      console.log("deletedImages", deletedImages);

      // deleted in cloudinary
      for (const image of deletedImages) {
        try {
          await removeFiles(token, image.public_id);
        } catch (error) {
          console.log(error);
        }
      }

      toast.success("Deleted Product Successfully!");

      getProduct(100);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-gray-300 min-h-10 mb-2">
          <TabsTrigger value="add">Add Product</TabsTrigger>
          <TabsTrigger value="product">Product</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <div className="mx-auto pt-4 pb-8 px-10 bg-white shadow-md rounded-md">
            <div className="flex justify-center items-center mt-6">
              <FieldAddProduct
                form={form}
                setForm={setForm}
                handleSubmit={handleSubmit}
                categories={categories}
                handleOnChange={handleOnChange}
                submitResetFile={submitResetFile}
                setSubmitResetFile={setSubmitResetFile}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="product">
          <div className="p-8 bg-white shadow-md rounded-md">
            <h2 className="scroll-m-20 mb-5 text-2xl font-semibold tracking-tight first:mt-0">
              Products Management
            </h2>
            {loading ? (
              <div className="min-h-[70vh] flex items-center justify-center gap-4">
                <Spinner className="size-6" />
                Loading tables
              </div>
            ) : products.length === 0 ? (
              <ProductEmpty onTabAdd={() => setTab("add")} />
            ) : (
              <TableProduct products={products} handleDelete={handleDelete} />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default FormAddProduct;
