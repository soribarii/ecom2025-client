import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { uploadFiles } from "@/api/product";
import useEcomStore from "@/store/ecom-store";
import { Loader, Trash, X } from "lucide-react";
import { Button } from "../ui/button";

const UploadEditFile = ({ form, setLoadingImage }) => {
  const token = useEcomStore((state) => state.token);
  const setImagesForm = useEcomStore((state) => state.setImagesForm);
  const addDeletedImage = useEcomStore((state) => state.addDeletedImage);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState(form.images);

  // sync images from form when loaded from backend
  useEffect(() => {
    if (form.images && form.images.length > 0) {
      const setInitImages = () => {
        setImages(form.images);
      };
      setInitImages();
    }
  }, [form.images]);

  // update store when images change
  useEffect(() => {
    setImagesForm(images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const handleOnChange = (e) => {
    const files = e.target.files;

    setLoadingImage(true);
    setIsLoading(true)
    if (files) {
      setIsLoading(true);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not image`);
          continue;
        }

        // Image Resize
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            // endpoint backend
            uploadFiles(token, data)
              .then((res) => {
                setImages((prevImage) => [...prevImage, res.data]);

                addDeletedImage(res.data.public_id);

                toast.success("Upload Image Success");
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false)
                setLoadingImage(false);
              })
              .finally(() => {
                setIsLoading(false)
                setLoadingImage(false);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleDelete = (public_id) => {
    setImages((prevImages) =>
      prevImages.filter((img) => img.public_id !== public_id)
    );

    // store delete images
    addDeletedImage(public_id);
  };

  return (
    <>
      <Field>
        <FieldLabel htmlFor="images">Images</FieldLabel>
        <Input
          id="images"
          type="file"
          name="images"
          onChange={handleOnChange}
          multiple
        />
      </Field>

      <div className="my-4 flex justify-center col-span-2 gap-4">
        {/* Loader */}
        {
          isLoading && <Loader className="animate-spin"/>
        }

        {/* Image */}
        {images.map((item, index) => (
          <div className="relative p-3 border-2 rounded-md" key={index}>
            <img className="w-24 h-24 hover:scale-105" src={item.url} />
            <span
              className="absolute -top-1.5 -right-1.5"
              onClick={() => handleDelete(item.public_id)}
            >
              <Button
                variant="destructive"
                size="icon"
                type="button"
                aria-label="Delete"
                className="w-6 h-6 rounded-2xl"
              >
                <X />
              </Button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
export default UploadEditFile;
