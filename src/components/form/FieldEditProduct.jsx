import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import useEcomStore from "@/store/ecom-store";
import { removeFiles } from "@/api/product";
import { useState } from "react";
import UploadEditFile from "../admin/UploadEditFile";

export function FieldEditProduct({
  form,
  handleSubmit,
  categories,
  handleOnChange,
  isSubmitting,
}) {
  const token = useEcomStore((state) => state.token);
  const deletedImages = useEcomStore((state) => state.deletedImages);
  const setDeletedImages = useEcomStore((state) => state.setDeletedImages);

  const [isLoadingImage, setLoadingImage] = useState(false);
  const isDisabled = isLoadingImage || isSubmitting;

  const handleOnCancel = async () => {
    const originalPublicIds = form.images?.map((img) => img?.public_id) ?? [];

    const confirmDeleted = deletedImages.filter(
      (public_id) => !originalPublicIds.includes(public_id)
    );

    for (const public_id of confirmDeleted) {
      try {
        await removeFiles(token, public_id);
      } catch (error) {
        console.log(error);
      }
    }

    setDeletedImages([]);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Edit Product</FieldLegend>
            <FieldDescription>
              Please fill product information completely.
            </FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Product</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  placeholder="Product name"
                  value={form.title}
                  onChange={handleOnChange}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Add any description product"
                  className="resize-none"
                  value={form.description}
                  onChange={handleOnChange}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="price">Price</FieldLabel>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleOnChange}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="quantity">Quanitty</FieldLabel>
                  <Input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="quantity"
                    value={form.quantity}
                    onChange={handleOnChange}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="categoryId">Category</FieldLabel>
                  <Select
                    name="categoryId"
                    value={form.categoryId ? String(form.categoryId) : ""}
                    onValueChange={(value) => {
                      handleOnChange({
                        target: { name: "categoryId", value },
                      });
                    }}
                    required
                  >
                    <SelectTrigger id="categoryId">
                      <SelectValue placeholder="Please Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {/* Upload Images */}
                <UploadEditFile form={form} setLoadingImage={setLoadingImage}/>
              </div>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal" className="flex justify-end">
            <Button type="submit" disabled={isDisabled}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Saving...
                </span>
              ) : (
                "Edit"
              )}
            </Button>

            <Link to={"/admin/product/"}>
              <Button variant="outline" type="button" disabled={isDisabled} onClick={handleOnCancel}>
                Cancel
              </Button>
            </Link>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
