import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "@/api/product";
import useEcomStore from "@/store/ecom-store";
import { Loader, Trash, X } from "lucide-react";
import { Button } from "../ui/button";

const UploadAddFile = ({ setLoadingImage, cancelResetFile, submitResetFile, setSubmitResetFile }) => {
  const token = useEcomStore((state) => state.token);
  const setImagesForm = useEcomStore((state) => state.setImagesForm);
  const addDeletedImage = useEcomStore((state) => state.addDeletedImage);
  const setDeletedImages = useEcomStore((state) => state.setDeletedImages);
  const deletedImages = useEcomStore((state) => state.deletedImages);
  
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (cancelResetFile || submitResetFile) {
      const resetImages = () => setImages([]);
      resetImages();
      setImagesForm([]);
      if (inputRef.current) inputRef.current.value = "";
      setSubmitResetFile(false)
    }
  }, [cancelResetFile, submitResetFile, setImagesForm]);

  useEffect(() => {
    setImagesForm(images);
  }, [images, setImagesForm]);

  const handleOnChange = (e) => {
    const files = e.target.files;

    setLoadingImage(true);
    setIsLoading(true);
    if (files) {
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
                setIsLoading(false);
                setLoadingImage(false);
              })
              .finally(() => {
                setIsLoading(false);
                setLoadingImage(false);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleDelete = (public_id) => {
    removeFiles(token, public_id)
      .then((res) => {
        setImages((prevImages) =>
          prevImages.filter((img) => img.public_id !== public_id)
        );

        const confirmDeleted = deletedImages.filter((deletedImages) => deletedImages != public_id);

        setDeletedImages(confirmDeleted)

        toast.error(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Field>
        <FieldLabel htmlFor="images">Images</FieldLabel>
        <Input
          ref={inputRef}
          id="images"
          type="file"
          name="images"
          onChange={handleOnChange}
          multiple
        />
      </Field>

      <div className="my-4 flex justify-center col-span-2 gap-4">
        {/* Loading */}
        {isLoading && <Loader className="animate-spin" />}

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
                aria-label="Submit"
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
export default UploadAddFile;
