import { Modal, Button } from "@/components";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/@raw-shadcn/Label";
import { Textarea } from "@/components/ui/@raw-shadcn/textarea";
import { useToast } from "@/components/ui/Toast/useToast";
import { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";

type InventoryItem = {
  id: string;
  productName: string;
  variantDescription: string;
  variantSku: string | null;
  currentStock: number;
  reorderQuantity: number;
};

type RestockModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem | null;
  onClose: () => void;
};

const getInitialFormData = (item: InventoryItem | null) => ({
  quantity: item?.reorderQuantity || 0,
  reference: "",
  notes: "",
});

export default function RestockModal({
  open,
  onOpenChange,
  item,
  onClose,
}: RestockModalProps) {
  const { success } = useToast();
  const initialFormData = useMemo(() => getInitialFormData(item), [item]);
  
  const [quantity, setQuantity] = useState(initialFormData.quantity);
  const [reference, setReference] = useState(initialFormData.reference);
  const [notes, setNotes] = useState(initialFormData.notes);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form data when modal opens or item changes
  if (open && item && (
    quantity !== initialFormData.quantity ||
    reference !== initialFormData.reference ||
    notes !== initialFormData.notes
  )) {
    setQuantity(initialFormData.quantity);
    setReference(initialFormData.reference);
    setNotes(initialFormData.notes);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      success(
        "Stock Restocked",
        `Added ${quantity} units to ${item?.productName}. New stock: ${
          (item?.currentStock || 0) + quantity
        }`
      );
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  if (!item) return null;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Restock Inventory"
      description="Add stock to inventory"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Item Info */}
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-1">{item.productName}</h4>
          {item.variantSku && (
            <p className="text-sm text-muted-foreground">
              {item.variantDescription}
            </p>
          )}
          <div className="mt-2 text-sm">
            <span className="text-muted-foreground">Current Stock: </span>
            <span className="font-semibold">{item.currentStock}</span>
          </div>
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <Label htmlFor="quantity">
            Quantity to Add <span className="text-red-500">*</span>
          </Label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
            min={1}
            required
          />
          <p className="text-xs text-muted-foreground">
            Suggested: {item.reorderQuantity} units
          </p>
        </div>

        {/* Reference */}
        <div className="space-y-2">
          <Label htmlFor="reference">
            Reference Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="reference"
            type="text"
            placeholder="INV-2026-XXX"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            Supplier invoice or reference number
          </p>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            rows={3}
            placeholder="Add any additional notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Summary */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h4 className="font-medium text-green-900">Stock Update Preview</h4>
          </div>
          <div className="space-y-1 text-sm text-green-800">
            <div className="flex justify-between">
              <span>Current Stock:</span>
              <span className="font-semibold">{item.currentStock}</span>
            </div>
            <div className="flex justify-between">
              <span>Adding:</span>
              <span className="font-semibold text-green-600">+{quantity}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2 border-t border-green-300">
              <span>New Stock:</span>
              <span>{item.currentStock + quantity}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={isSubmitting || quantity <= 0}
          >
            {isSubmitting ? "Processing..." : "Confirm Restock"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
