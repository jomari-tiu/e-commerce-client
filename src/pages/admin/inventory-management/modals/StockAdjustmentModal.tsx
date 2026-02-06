import { Modal, Button } from "@/components";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/@raw-shadcn/Label";
import { Textarea } from "@/components/ui/@raw-shadcn/textarea";
import RadioGroup from "@/components/ui/RadioButton/RadioGroup";
import { useToast } from "@/components/ui/Toast/useToast";
import { useState, useMemo } from "react";
import { AlertCircle } from "lucide-react";

type InventoryItem = {
  id: string;
  productName: string;
  variantDescription: string;
  variantSku: string | null;
  currentStock: number;
};

type StockAdjustmentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem | null;
  onClose: () => void;
};

const getInitialFormData = () => ({
  adjustmentType: "add" as "add" | "subtract",
  quantity: 0,
  reason: "",
  reference: "",
  notes: "",
});

export default function StockAdjustmentModal({
  open,
  onOpenChange,
  item,
  onClose,
}: StockAdjustmentModalProps) {
  const { success } = useToast();
  const initialFormData = useMemo(() => getInitialFormData(), []);
  
  const [adjustmentType, setAdjustmentType] = useState<"add" | "subtract">(initialFormData.adjustmentType);
  const [quantity, setQuantity] = useState(initialFormData.quantity);
  const [reason, setReason] = useState(initialFormData.reason);
  const [reference, setReference] = useState(initialFormData.reference);
  const [notes, setNotes] = useState(initialFormData.notes);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form data when modal opens
  if (open && item && (
    adjustmentType !== initialFormData.adjustmentType ||
    quantity !== initialFormData.quantity ||
    reason !== initialFormData.reason ||
    reference !== initialFormData.reference ||
    notes !== initialFormData.notes
  )) {
    setAdjustmentType(initialFormData.adjustmentType);
    setQuantity(initialFormData.quantity);
    setReason(initialFormData.reason);
    setReference(initialFormData.reference);
    setNotes(initialFormData.notes);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalQuantity = adjustmentType === "add" ? quantity : -quantity;

    // Simulate API call
    setTimeout(() => {
      success(
        "Stock Adjusted",
        `${adjustmentType === "add" ? "Added" : "Removed"} ${Math.abs(finalQuantity)} units. New stock: ${
          (item?.currentStock || 0) + finalQuantity
        }`
      );
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  if (!item) return null;

  const newStock = adjustmentType === "add"
    ? item.currentStock + quantity
    : item.currentStock - quantity;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Adjust Stock"
      description="Make manual stock adjustments"
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

        {/* Adjustment Type */}
        <div className="space-y-3">
          <Label>Adjustment Type</Label>
          <RadioGroup
            options={[
              { value: "add", label: "Add Stock" },
              { value: "subtract", label: "Subtract Stock" },
            ]}
            value={adjustmentType}
            onValueChange={(value: string) =>
              setAdjustmentType(value as "add" | "subtract")
            }
            orientation="horizontal"
          />
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <Label htmlFor="quantity">
            Quantity <span className="text-red-500">*</span>
          </Label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
            min={1}
            max={adjustmentType === "subtract" ? item.currentStock : undefined}
            required
          />
          {adjustmentType === "subtract" && quantity > item.currentStock && (
            <p className="text-xs text-red-500">
              Cannot subtract more than current stock
            </p>
          )}
        </div>

        {/* Reason */}
        <div className="space-y-2">
          <Label htmlFor="reason">
            Reason <span className="text-red-500">*</span>
          </Label>
          <Input
            id="reason"
            type="text"
            placeholder="e.g., Damage, Stock count correction"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        {/* Reference */}
        <div className="space-y-2">
          <Label htmlFor="reference">Reference Number (Optional)</Label>
          <Input
            id="reference"
            type="text"
            placeholder="ADJ-2026-XXX"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
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
        <div
          className={`p-4 border rounded-lg ${
            adjustmentType === "add"
              ? "bg-green-50 border-green-200"
              : "bg-orange-50 border-orange-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle
              className={`h-5 w-5 ${
                adjustmentType === "add" ? "text-green-600" : "text-orange-600"
              }`}
            />
            <h4
              className={`font-medium ${
                adjustmentType === "add" ? "text-green-900" : "text-orange-900"
              }`}
            >
              Adjustment Preview
            </h4>
          </div>
          <div
            className={`space-y-1 text-sm ${
              adjustmentType === "add" ? "text-green-800" : "text-orange-800"
            }`}
          >
            <div className="flex justify-between">
              <span>Current Stock:</span>
              <span className="font-semibold">{item.currentStock}</span>
            </div>
            <div className="flex justify-between">
              <span>{adjustmentType === "add" ? "Adding" : "Subtracting"}:</span>
              <span
                className={`font-semibold ${
                  adjustmentType === "add" ? "text-green-600" : "text-orange-600"
                }`}
              >
                {adjustmentType === "add" ? "+" : "-"}
                {quantity}
              </span>
            </div>
            <div
              className={`flex justify-between font-bold text-base pt-2 border-t ${
                adjustmentType === "add"
                  ? "border-green-300"
                  : "border-orange-300"
              }`}
            >
              <span>New Stock:</span>
              <span>{newStock}</span>
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
            disabled={
              isSubmitting ||
              quantity <= 0 ||
              (adjustmentType === "subtract" && quantity > item.currentStock)
            }
          >
            {isSubmitting ? "Processing..." : "Confirm Adjustment"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
