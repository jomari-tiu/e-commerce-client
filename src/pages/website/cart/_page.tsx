import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button, Badge } from "@/components";
import { Card } from "@/components/ui/@raw-shadcn/card";
import { Separator } from "@/components/ui/@raw-shadcn/separator";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  Package,
  User,
} from "lucide-react";

type CartItem = {
  id: string;
  productId: string;
  productName: string;
  variantDescription: string;
  sku: string;
  price: number;
  quantity: number;
  stock: number;
  image: string;
};

export default function CartPage() {
  const navigate = useNavigate();
  
  // Mock cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      productId: "1",
      productName: "Classic T-Shirt",
      variantDescription: "Size: L, Color: Red",
      sku: "TSH-L-RED",
      price: 500,
      quantity: 2,
      stock: 15,
      image: "https://placehold.co/100x100",
    },
    {
      id: "2",
      productId: "2",
      productName: "Running Shoes",
      variantDescription: "Size: 10",
      sku: "SHO-10-BLK",
      price: 1450,
      quantity: 1,
      stock: 8,
      image: "https://placehold.co/100x100",
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    setCartItems(
      cartItems.map((item) => {
        if (item.id === id && newQuantity <= item.stock) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 2000 ? 0 : 150;
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">E-Commerce Store</span>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Continue Shopping</span>
        </Link>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartItems.length > 0
              ? `You have ${cartItems.length} item(s) in your cart`
              : "Your cart is empty"}
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <Card
            content={
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h2 className="text-xl font-semibold mb-2">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground mb-6">
                  Start shopping to add items to your cart
                </p>
                <Button variant="primary" onClick={() => navigate("/")}>
                  Browse Products
                </Button>
              </div>
            }
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card
                content={
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 p-4 border rounded-lg"
                      >
                        <Link to={`/product/${item.productId}`}>
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-24 h-24 object-cover rounded"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${item.productId}`}
                            className="hover:text-primary"
                          >
                            <h3 className="font-semibold text-lg">
                              {item.productName}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.variantDescription}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            SKU: {item.sku}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                disabled={item.quantity >= item.stock}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                          {item.quantity >= item.stock && (
                            <Badge variant="warning" className="mt-2">
                              Max quantity reached
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatCurrency(item.price)} each
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />

              {/* Clear Cart Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card
                title="Order Summary"
                className="sticky top-24"
                content={
                  <div className="space-y-4">
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
                      {subtotal < 2000 && shippingFee > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Add {formatCurrency(2000 - subtotal)} more for free
                          shipping
                        </p>
                      )}
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-primary">
                          {formatCurrency(total)}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      className="w-full"
                      size="lg"
                      onClick={() => navigate("/checkout")}
                    >
                      Proceed to Checkout
                    </Button>

                    <div className="space-y-2 pt-4 border-t">
                      <p className="text-xs text-muted-foreground">
                        ✓ Secure checkout
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ✓ Free shipping on orders over ₱2,000
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ✓ Easy returns & exchanges
                      </p>
                    </div>
                  </div>
                }
              />
            </div>
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
