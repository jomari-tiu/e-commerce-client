import { Modal } from "@/components";
import ProductFormContainer from "../forms/ProductFormContainer";
import { ProductFormType } from "../types/productFormSchema";

type Props = {
  defaultValues?: ProductFormType;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function ProductModalForm({
  trigger,
  defaultValues,
  open,
  onOpenChange,
}: Props) {
  return (
    <Modal
      trigger={trigger}
      title={defaultValues ? "Edit Product" : "Add Product"}
      showFooter={false}
      open={open}
      onOpenChange={onOpenChange}
    >
      {(close) => (
        <ProductFormContainer close={close} defaultValues={defaultValues} />
      )}
    </Modal>
  );
}
