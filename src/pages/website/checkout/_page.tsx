import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Button, Badge } from "@/components";
import { Card } from "@/components/ui/@raw-shadcn/card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/@raw-shadcn/Label";
import RadioGroup from "@/components/ui/RadioButton/RadioGroup";
import { Separator } from "@/components/ui/@raw-shadcn/separator";
import { formatCurrency } from "@/utils/formatCurrency";
import { Package, ArrowLeft, CreditCard, TruckIcon } from "lucide-react";
import { useToast } from "@/components/ui/Toast/useToast";
import { useGet } from "@/lib/query";
import { instance } from "@/lib/query";
import Cookie from "js-cookie";

type CartItem = {
  id: string;
  productName: string;
  variantDescription: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Get or create session ID for guest checkout
  useEffect(() => {
    let session = localStorage.getItem("sessionId");
    if (!session) {
      session = crypto.randomUUID();
      localStorage.setItem("sessionId", session);
    }
    setSessionId(session);
  }, []);

  // Fetch cart
  const { data: cartData, isLoading: cartLoading } = useGet<{
    success: boolean;
    data: {
      items: Array<{
        uuid: string;
        product: {
          name: string;
          images: string[];
        };
        variantSku?: {
          sku: string;
          variantCombination: Array<{ type: string; value: string }>;
        };
        combinationDisplay?: string;
        unitPrice: number;
        quantity: number;
        subtotal: number;
      }>;
      subtotal: number;
      itemCount: number;
    };
  }>({
    url: "/api/cart",
    key: ["cart"],
    params: {},
    headers: sessionId ? { "x-session-id": sessionId } : {},
    enabled: !!sessionId,
  });

  const cartItems: CartItem[] =
    cartData?.data?.items?.map((item) => ({
      id: item.uuid,
      productName: item.product.name,
      variantDescription: item.combinationDisplay || "",
      price: item.unitPrice,
      quantity: item.quantity,
      image: item.product.images[0] || "https://placehold.co/80x80",
    })) || [];

  const [formData, setFormData] = useState({
    // Customer Info
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    // Shipping Address
    street: "",
    barangay: "",
    city: "",
    province: "",
    postalCode: "",
    landmark: "",
    // Payment
    paymentMethod: "gcash",
  });

  const subtotal = cartData?.data?.subtotal || 0;
  const shippingFee = subtotal >= 2000 ? 0 : 150;
  const tax = (subtotal - 0) * 0.12; // 12% tax
  const total = subtotal + shippingFee + tax;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (cartItems.length === 0) {
      showError("Cart Empty", "Please add items to your cart before checkout");
      setIsProcessing(false);
      return;
    }

    const orderData = {
      customerInfo: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
      },
      shippingAddress: {
        street: formData.street,
        barangay: formData.barangay,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        landmark: formData.landmark || undefined,
      },
      paymentMethod: formData.paymentMethod === "cod" ? "cash" : (formData.paymentMethod as "gcash" | "cash" | "card"),
      shippingMethod: "jnt" as const,
      notes: undefined,
    };

    try {
      const token = Cookie.get("_token");
      const headers: any = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      if (sessionId) {
        headers["x-session-id"] = sessionId;
      }

      const response = await instance.post("/api/orders", orderData, { headers });
      const order = response.data.data;

      if (order.paymentUrl && formData.paymentMethod === "gcash") {
        // Redirect to GCash payment
        window.location.href = order.paymentUrl;
      } else {
        success("Order Placed!", `Your order ${order.orderNumber} has been confirmed`);
        navigate(`/orders/track?orderNumber=${order.orderNumber}`);
      }
    } catch (err: any) {
      showError(
        "Order Failed",
        err.response?.data?.message || "Failed to create order. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    {
      value: "gcash",
      label: "GCash",
      description: "Pay securely with GCash",
    },
    {
      value: "cod",
      label: "Cash on Delivery",
      description: "Pay when you receive",
    },
  ];

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!cartData || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4">
            <Link to="/" className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">E-Commerce Store</span>
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some items to your cart before checkout
          </p>
          <Link to="/">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">E-Commerce Store</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Cart</span>
        </Link>

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card
                title="Customer Information"
                content={
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Juan"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Dela Cruz"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+63 912 345 6789"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                }
              />

              {/* Shipping Address */}
              <Card
                title="Shipping Address"
                content={
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">
                        Street Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="street"
                        type="text"
                        placeholder="123 Main Street"
                        value={formData.street}
                        onChange={(e) =>
                          setFormData({ ...formData, street: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="barangay">
                        Barangay <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="barangay"
                        type="text"
                        placeholder="Barangay Centro"
                        value={formData.barangay}
                        onChange={(e) =>
                          setFormData({ ...formData, barangay: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="Manila"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="province">
                          Province <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="province"
                          type="text"
                          placeholder="Metro Manila"
                          value={formData.province}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              province: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalCode">
                        Postal Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="postalCode"
                        type="text"
                        placeholder="1000"
                        value={formData.postalCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            postalCode: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="landmark">Landmark (Optional)</Label>
                      <Input
                        id="landmark"
                        type="text"
                        placeholder="Near City Hall"
                        value={formData.landmark}
                        onChange={(e) =>
                          setFormData({ ...formData, landmark: e.target.value })
                        }
                      />
                    </div>
                  </div>
                }
              />

              {/* Payment Method */}
              <Card
                title="Payment Method"
                content={
                  <div className="space-y-4">
                    <RadioGroup
                      options={paymentMethods.map((method) => ({
                        value: method.value,
                        label: (
                          <div>
                            <div className="font-medium">{method.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {method.description}
                            </div>
                          </div>
                        ) as any,
                      }))}
                      value={formData.paymentMethod}
                      onValueChange={(value: string) =>
                        setFormData({
                          ...formData,
                          paymentMethod: value,
                        })
                      }
                      orientation="vertical"
                    />

                    {formData.paymentMethod === "gcash" && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">
                              GCash Payment
                            </p>
                            <p className="text-xs text-blue-700 mt-1">
                              You will be redirected to GCash to complete your
                              payment securely.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === "cod" && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <TruckIcon className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-green-900">
                              Cash on Delivery
                            </p>
                            <p className="text-xs text-green-700 mt-1">
                              Pay with cash when your order is delivered to your
                              doorstep.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                }
              />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card
                title="Order Summary"
                className="sticky top-24"
                content={
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-1">
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
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span>{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Shipping Fee:
                        </span>
                        <span>
                          {shippingFee === 0 ? (
                            <Badge variant="success">Free</Badge>
                          ) : (
                            formatCurrency(shippingFee)
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (12%):</span>
                        <span>{formatCurrency(tax)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-primary">
                          {formatCurrency(total)}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>

                    <div className="space-y-1 pt-4 border-t">
                      <p className="text-xs text-muted-foreground">
                        ✓ Secure checkout
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ✓ Your information is protected
                      </p>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </form>
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
