import { Button, FormWrapper, useToast } from "@/components";
import { productFormSchema, ProductFormType } from "../types/productFormSchema";
import ProductFormFields from "./ProductFormFields";

export default function ProductFormContainer({
  close,
  defaultValues,
}: {
  close: () => void;
  defaultValues?: ProductFormType;
}) {
  const { success } = useToast();

  const isUpdate = !!defaultValues;
  const title = isUpdate ? "Product Updated" : "Product Added";
  const description = isUpdate
    ? "Your product has been updated successfully."
    : "Your product has been added successfully.";

  const handleSubmit = (data: ProductFormType) => {
    console.log(data);
    success(title, description);
    close();
  };

  return (
    <FormWrapper
      defaultValues={defaultValues}
      schema={productFormSchema}
      onSubmit={handleSubmit}
    >
      <ProductFormFields />
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" type="button" onClick={close}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </FormWrapper>
  );
}
