import useEcomStore from "@/store/ecom-store";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { readProduct, removeFiles, updateProduct } from "@/api/product";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { FieldEditProduct } from "../form/FieldEditProduct";
import { Spinner } from "../ui/spinner";

const FormEditProduct = () => {
  const { id } = useParams();
  const navigation = useNavigate();

  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const setDeletedImages = useEcomStore((state) => state.setDeletedImages);
  const deletedImages = useEcomStore((state) => state.deletedImages);
  const images = useEcomStore((state) => state.images);

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      setForm(res.data);
    } catch (error) {
      console.log("Error Fetch Data: ", error);
    } finally {
      setLoading(false);
    }
  };

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
      for (const public_id of deletedImages) {
        await removeFiles(token, public_id);
      }

      // set deletedImages empty
      setDeletedImages([]);

      const res = await updateProduct(token, id, payload);

      toast.success(`Edit product ${res.data?.title || ""} successfully!`);

      navigation("/admin/product");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto pt-4 pb-8 px-10 bg-white shadow-md rounded-md">
      {loading ? (
        <div className="min-h-[70vh] flex items-center justify-center gap-4">
          <Spinner className="size-6" />
          Loading product
        </div>
      ) : (
        <div >
          <div className="flex justify-center items-center mt-6">
            <FieldEditProduct
              form={form}
              setForm={setForm}
              handleSubmit={handleSubmit}
              categories={categories}
              handleOnChange={handleOnChange}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default FormEditProduct;
