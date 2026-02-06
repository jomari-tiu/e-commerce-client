import { Modal } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/@raw-shadcn/separator";
import { formatCurrency } from "@/utils/formatCurrency";
import { Package, User, MapPin, CreditCard, Truck } from "lucide-react";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "ready_to_ship"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

type OrderType = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: OrderStatus;
  orderType: "online" | "pos";
  createdAt: string;
  itemCount: number;
};

type OrderDetailModalProps = {
  order: OrderType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function OrderDetailModal({
  order,
  open,
  onOpenChange,
}: OrderDetailModalProps) {
  if (!order) return null;

  const getStatusBadge = (status: OrderStatus) => {
    const variants: Record<
      OrderStatus,
      "warning" | "info" | "primary" | "success" | "danger" | "default"
    > = {
      pending: "warning",
      confirmed: "info",
      processing: "info",
      ready_to_ship: "primary",
      shipped: "primary",
      delivered: "success",
      cancelled: "danger",
      refunded: "danger",
    };
    return variants[status] || "default";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Mock order items
  const orderItems = [
    {
      id: "1",
      productName: "Classic T-Shirt",
      variantDescription: "Size: L, Color: Red",
      sku: "TSH-L-RED",
      quantity: 2,
      unitPrice: 500,
      subtotal: 1000,
      productImage: "https://placehold.co/80x80",
    },
    {
      id: "2",
      productName: "Running Shoes",
      variantDescription: "Size: 10",
      sku: "SHO-10-BLK",
      quantity: 1,
      unitPrice: 1450,
      subtotal: 1450,
      productImage: "https://placehold.co/80x80",
    },
  ];

  const shippingAddress = {
    street: "123 Main St",
    barangay: "Barangay Centro",
    city: "Manila",
    province: "Metro Manila",
    postalCode: "1000",
  };

  const subtotal = 2450;
  const shippingFee = 150;
  const discount = 0;
  const total = subtotal + shippingFee - discount;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={`Order ${order.orderNumber}`}
      description={`Order placed on ${formatDate(order.createdAt)}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Order Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Status:</span>
            <Badge variant={getStatusBadge(order.status)}>
              {order.status.replace(/_/g, " ").toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Type:</span>
            <Badge variant={order.orderType === "pos" ? "info" : "primary"}>
              {order.orderType === "pos" ? "POS" : "Online"}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Customer Information */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Customer Information</h3>
          </div>
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-muted-foreground">Name:</span>{" "}
              {order.customerName}
            </p>
            {order.customerEmail !== "-" && (
              <p>
                <span className="text-muted-foreground">Email:</span>{" "}
                {order.customerEmail}
              </p>
            )}
          </div>
        </div>

        {order.orderType === "online" && (
          <>
            <Separator />

            {/* Shipping Address */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">Shipping Address</h3>
              </div>
              <div className="text-sm space-y-1">
                <p>{shippingAddress.street}</p>
                <p>{shippingAddress.barangay}</p>
                <p>
                  {shippingAddress.city}, {shippingAddress.province}
                </p>
                <p>{shippingAddress.postalCode}</p>
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Order Items */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Package className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Order Items</h3>
          </div>
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 border rounded-lg"
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.variantDescription}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    SKU: {item.sku}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {formatCurrency(item.subtotal)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(item.unitPrice)} × {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Order Summary */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Payment Summary</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping Fee:</span>
              <span>{formatCurrency(shippingFee)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-semibold text-base">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {order.orderType === "online" && (
          <>
            <Separator />

            {/* Shipping Information */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">Shipping Information</h3>
              </div>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-muted-foreground">Method:</span> J&T
                  Express
                </p>
                {order.status !== "pending" && order.status !== "confirmed" && (
                  <p>
                    <span className="text-muted-foreground">
                      Tracking Number:
                    </span>{" "}
                    JT123456789
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
