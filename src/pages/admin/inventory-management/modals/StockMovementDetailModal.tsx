import { Modal } from "@/components";

type StockMovement = {
  id: string;
  productName: string;
  variantSku: string | null;
  type: string;
  quantity: number;
  remainingStock: number;
  reference: string;
  notes: string;
  createdAt: string;
  createdBy: string;
};

type StockMovementDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movement: StockMovement | null;
};

export default function StockMovementDetailModal({
  open,
  onOpenChange,
  movement,
}: StockMovementDetailModalProps) {
  if (!movement) return null;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Stock Movement Details"
      description={`Movement ID: ${movement.id}`}
      maxWidth="md"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Product
            </h4>
            <p className="font-medium">{movement.productName}</p>
            {movement.variantSku && (
              <p className="text-sm text-muted-foreground">
                SKU: {movement.variantSku}
              </p>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Type
            </h4>
            <p className="font-medium capitalize">{movement.type}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Quantity Changed
            </h4>
            <p
              className={`font-bold text-lg ${
                movement.quantity > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {movement.quantity > 0 ? "+" : ""}
              {movement.quantity}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Stock After
            </h4>
            <p className="font-bold text-lg">{movement.remainingStock}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Reference
            </h4>
            <p className="font-mono text-sm">{movement.reference}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Created By
            </h4>
            <p>{movement.createdBy}</p>
          </div>
          <div className="col-span-2">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Date & Time
            </h4>
            <p>{new Date(movement.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {movement.notes && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Notes
            </h4>
            <p className="text-sm p-3 bg-muted rounded">{movement.notes}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
