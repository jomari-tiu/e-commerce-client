import { useState } from "react";
import { Modal, Button } from "@/components";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/@raw-shadcn/Label";
import RadioGroup from "@/components/ui/RadioButton/RadioGroup";
import { Separator } from "@/components/ui/@raw-shadcn/separator";
import { formatCurrency } from "@/utils/formatCurrency";
import { CreditCard, Banknote, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/Toast/useToast";

type POSCheckoutModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  onComplete: () => void;
};

export default function POSCheckoutModal({
  open,
  onOpenChange,
  subtotal,
  tax,
  total,
  onComplete,
}: POSCheckoutModalProps) {
  const { success } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cashReceived, setCashReceived] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const cashReceivedAmount = parseFloat(cashReceived) || 0;
  const change = cashReceivedAmount - total;

  const handleCheckout = async () => {
    if (paymentMethod === "cash" && cashReceivedAmount < total) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderNumber = `POS-${new Date().getFullYear()}${String(
        new Date().getMonth() + 1
      ).padStart(2, "0")}${String(new Date().getDate()).padStart(
        2,
        "0"
      )}-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(5, "0")}`;

      success("Payment Successful!", `Order ${orderNumber} has been created`);
      setIsProcessing(false);
      
      // Reset form
      setCashReceived("");
      setCustomerName("");
      setPaymentMethod("cash");
      
      onComplete();
    }, 1500);
  };

  const paymentMethods = [
    {
      value: "cash",
      label: "Cash",
      icon: <Banknote className="h-4 w-4" />,
    },
    {
      value: "card",
      label: "Card",
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      value: "gcash",
      label: "GCash",
      icon: <DollarSign className="h-4 w-4" />,
    },
  ];

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Complete Payment"
      description="Process the payment for this order"
      maxWidth="md"
    >
      <div className="space-y-6">
        {/* Order Summary */}
        <div>
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (12%):</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount:</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Customer Name (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="customerName">Customer Name (Optional)</Label>
          <Input
            id="customerName"
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        {/* Payment Method */}
        <div className="space-y-3">
          <Label>Payment Method</Label>
                  <RadioGroup
                    options={paymentMethods}
                    value={paymentMethod}
                    onValueChange={(value: string) => setPaymentMethod(value)}
                    orientation="vertical"
                  />
        </div>

        {/* Cash Payment Fields */}
        {paymentMethod === "cash" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cashReceived">Cash Received</Label>
              <Input
                id="cashReceived"
                type="number"
                placeholder="0.00"
                value={cashReceived}
                onChange={(e) => setCashReceived(e.target.value)}
                min={0}
                step={0.01}
              />
            </div>

            {cashReceivedAmount > 0 && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cash Received:</span>
                  <span className="font-medium">
                    {formatCurrency(cashReceivedAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">{formatCurrency(total)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Change:</span>
                  <span
                    className={
                      change < 0
                        ? "text-red-600"
                        : change > 0
                        ? "text-green-600"
                        : ""
                    }
                  >
                    {formatCurrency(Math.max(0, change))}
                  </span>
                </div>
                {change < 0 && (
                  <p className="text-xs text-red-600">
                    Insufficient amount. Need {formatCurrency(Math.abs(change))}{" "}
                    more.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Card Payment Info */}
        {paymentMethod === "card" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              Please process the card payment using your card terminal.
            </p>
          </div>
        )}

        {/* GCash Payment Info */}
        {paymentMethod === "gcash" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-900">
              Please ask the customer to scan the QR code or send payment to the
              GCash number.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCheckout}
            className="flex-1"
            disabled={
              isProcessing ||
              (paymentMethod === "cash" && cashReceivedAmount < total)
            }
          >
            {isProcessing ? "Processing..." : "Complete Payment"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
