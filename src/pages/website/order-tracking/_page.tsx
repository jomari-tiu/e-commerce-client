import { useState } from "react";
import { Link } from "react-router";
import { Button, Badge } from "@/components";
import { Card } from "@/components/ui/@raw-shadcn/card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/@raw-shadcn/Label";
import { Separator } from "@/components/ui/@raw-shadcn/separator";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  Package,
  User,
  Search,
  CheckCircle,
  TruckIcon,
  Clock,
  MapPin,
} from "lucide-react";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "ready_to_ship"
  | "shipped"
  | "delivered";

type Order = {
  orderNumber: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber: string;
  items: {
    productName: string;
    variantDescription: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  shippingAddress: {
    name: string;
    street: string;
    barangay: string;
    city: string;
    province: string;
    postalCode: string;
  };
  subtotal: number;
  shippingFee: number;
  total: number;
  statusHistory: {
    status: string;
    timestamp: string;
    description: string;
  }[];
};

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Mock order data
  const mockOrder: Order = {
    orderNumber: "ORD-20260110-00001",
    status: "shipped",
    createdAt: "2026-01-10T10:30:00",
    estimatedDelivery: "2026-01-15",
    trackingNumber: "JT123456789PH",
    items: [
      {
        productName: "Classic T-Shirt",
        variantDescription: "Size: L, Color: Red",
        quantity: 2,
        price: 500,
        image: "https://placehold.co/80x80",
      },
      {
        productName: "Running Shoes",
        variantDescription: "Size: 10",
        quantity: 1,
        price: 1450,
        image: "https://placehold.co/80x80",
      },
    ],
    shippingAddress: {
      name: "Juan Dela Cruz",
      street: "123 Main Street",
      barangay: "Barangay Centro",
      city: "Manila",
      province: "Metro Manila",
      postalCode: "1000",
    },
    subtotal: 2450,
    shippingFee: 0,
    total: 2450,
    statusHistory: [
      {
        status: "Order Placed",
        timestamp: "2026-01-10T10:30:00",
        description: "Your order has been received",
      },
      {
        status: "Order Confirmed",
        timestamp: "2026-01-10T11:00:00",
        description: "Your order has been confirmed",
      },
      {
        status: "Processing",
        timestamp: "2026-01-10T14:00:00",
        description: "Your order is being prepared",
      },
      {
        status: "Shipped",
        timestamp: "2026-01-11T09:00:00",
        description: "Your order has been shipped via J&T Express",
      },
    ],
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock search - in real app, this would call an API
    if (orderNumber === mockOrder.orderNumber) {
      setSearchedOrder(mockOrder);
      setNotFound(false);
    } else {
      setSearchedOrder(null);
      setNotFound(true);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    const variants: Record<
      OrderStatus,
      "warning" | "info" | "primary" | "success"
    > = {
      pending: "warning",
      confirmed: "info",
      processing: "info",
      ready_to_ship: "primary",
      shipped: "primary",
      delivered: "success",
    };
    return variants[status];
  };

  const getStatusIcon = (status: OrderStatus) => {
    if (status === "delivered") return CheckCircle;
    if (status === "shipped") return TruckIcon;
    return Clock;
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

  const StatusIcon = searchedOrder
    ? getStatusIcon(searchedOrder.status)
    : Clock;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">E-Commerce Store</span>
            </Link>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order number to track your package
          </p>
        </div>

        {/* Search Form */}
        <Card
          className="mb-8"
          content={
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Order Number</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="orderNumber"
                      type="text"
                      placeholder="ORD-20260110-00001"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  <Button type="submit" variant="primary">
                    Track Order
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  You can find your order number in the confirmation email
                </p>
              </div>
            </form>
          }
        />

        {/* Not Found Message */}
        {notFound && (
          <Card
            content={
              <div className="text-center py-8">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't find an order with that number. Please check and
                  try again.
                </p>
                <p className="text-sm text-muted-foreground">
                  Try: <code className="bg-muted px-2 py-1 rounded">ORD-20260110-00001</code>
                </p>
              </div>
            }
          />
        )}

        {/* Order Details */}
        {searchedOrder && (
          <div className="space-y-6">
            {/* Order Status */}
            <Card
              content={
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        Order {searchedOrder.orderNumber}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Placed on {formatDate(searchedOrder.createdAt)}
                      </p>
                    </div>
                    <Badge variant={getStatusBadge(searchedOrder.status)}>
                      {searchedOrder.status.replace(/_/g, " ").toUpperCase()}
                    </Badge>
                  </div>

                  {searchedOrder.status === "shipped" && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <TruckIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-blue-900">
                            Your order is on the way!
                          </p>
                          <p className="text-sm text-blue-700 mt-1">
                            Tracking Number:{" "}
                            <span className="font-mono">
                              {searchedOrder.trackingNumber}
                            </span>
                          </p>
                          <p className="text-sm text-blue-700">
                            Estimated Delivery:{" "}
                            {new Date(
                              searchedOrder.estimatedDelivery
                            ).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              }
            />

            {/* Status Timeline */}
            <Card
              title="Order Status"
              content={
                <div className="space-y-4">
                  {searchedOrder.statusHistory.map((status, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`rounded-full p-2 ${
                            index === searchedOrder.statusHistory.length - 1
                              ? "bg-primary text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <StatusIcon className="h-4 w-4" />
                        </div>
                        {index < searchedOrder.statusHistory.length - 1 && (
                          <div className="w-px h-12 bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{status.status}</h4>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(status.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {status.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              }
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Items */}
              <Card
                title="Order Items"
                content={
                  <div className="space-y-4">
                    {searchedOrder.items.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {item.productName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.variantDescription}
                          </p>
                          <p className="text-xs">
                            {formatCurrency(item.price)} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span>{formatCurrency(searchedOrder.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Shipping Fee:
                        </span>
                        <span>
                          {searchedOrder.shippingFee === 0 ? (
                            <Badge variant="success">Free</Badge>
                          ) : (
                            formatCurrency(searchedOrder.shippingFee)
                          )}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-primary">
                          {formatCurrency(searchedOrder.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                }
              />

              {/* Shipping Address */}
              <Card
                title="Shipping Address"
                content={
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="font-semibold">
                          {searchedOrder.shippingAddress.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {searchedOrder.shippingAddress.street}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {searchedOrder.shippingAddress.barangay}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {searchedOrder.shippingAddress.city},{" "}
                          {searchedOrder.shippingAddress.province}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {searchedOrder.shippingAddress.postalCode}
                        </p>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>

            {/* Actions */}
            <Card
              content={
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1">
                    Contact Support
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Invoice
                  </Button>
                  {searchedOrder.status === "delivered" && (
                    <Button variant="primary" className="flex-1">
                      Leave a Review
                    </Button>
                  )}
                </div>
              }
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          <p>&copy; 2026 E-Commerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
