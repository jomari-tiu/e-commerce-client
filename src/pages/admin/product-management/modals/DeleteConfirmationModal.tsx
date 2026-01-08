import { Modal, useToast } from "@/components";
import { ProductFormType } from "../types/productFormSchema";

type Props = {
  product: ProductFormType | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onDelete: (product: ProductFormType) => void;
};

export default function DeleteConfirmationModal({
  product,
  open,
  onOpenChange,
}: Props) {
  const { error } = useToast();

  const handleDeleteProduct = (close: () => void) => {
    error(
      "Product Deleted",
      `Your product ${product?.name} has been permanently deleted.`
    );
    close();
  };

  return (
    <Modal
      title={`Are you absolutely sure? ${product?.name}`}
      description="This action cannot be undone. This will permanently delete your product."
      onPrimaryAction={handleDeleteProduct}
      onSecondaryAction={(close) => close()}
      primaryActionText="Yes, delete product"
      secondaryActionText="Cancel"
      primaryActionVariant="danger"
      maxWidth="md"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-800">
            ⚠️ Warning: This action is irreversible. All your data will be
            permanently lost.
          </p>
        </div>
      </div>
    </Modal>
  );
}
