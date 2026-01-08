import { useTypedFormFields } from "@/components";
import { ProductFormType } from "../types/productFormSchema";

export default function ProductFormFields() {
  const { FormInput, FormNumberInput } = useTypedFormFields<ProductFormType>();
  return (
    <>
      <FormInput name="name" label="Name" placeholder="Enter product name" />
      <FormNumberInput
        thousandSeperator
        name="price"
        label="Price"
        placeholder="Enter product price"
      />
      <FormNumberInput
        name="stock"
        label="Stock"
        placeholder="Enter product stock"
      />
    </>
  );
}
