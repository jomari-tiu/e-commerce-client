import { useState } from "react";
import { Button, Badge } from "@/components";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/@raw-shadcn/card";
import PageWrapper from "@/components/ui/PageWrapper";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Barcode,
  CreditCard,
} from "lucide-react";
import { Separator } from "@/components/ui/@raw-shadcn/separator";
import POSCheckoutModal from "./modals/POSCheckoutModal";

type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  image: string;
  category: string;
};

type CartItem = Product & {
  quantity: number;
  subtotal: number;
};

// Mock products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic T-Shirt - Red (L)",
    sku: "TSH-L-RED",
    price: 500,
    stock: 15,
    image: "https://placehold.co/100x100",
    category: "Clothing",
  },
  {
    id: "2",
    name: "Running Shoes - Black (10)",
    sku: "SHO-10-BLK",
    price: 1450,
    stock: 8,
    image: "https://placehold.co/100x100",
    category: "Footwear",
  },
  {
    id: "3",
    name: "Wireless Headphones",
    sku: "ELC-HP-001",
    price: 2500,
    stock: 12,
    image: "https://placehold.co/100x100",
    category: "Electronics",
  },
  {
    id: "4",
    name: "Sports Cap - Blue",
    sku: "ACC-CAP-BLU",
    price: 350,
    stock: 20,
    image: "https://placehold.co/100x100",
    category: "Accessories",
  },
  {
    id: "5",
    name: "Water Bottle - 1L",
    sku: "ACC-BTL-001",
    price: 250,
    stock: 30,
    image: "https://placehold.co/100x100",
    category: "Accessories",
  },
];

export default function POSPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  subtotal: (item.quantity + 1) * item.price,
                }
              : item
          )
        );
      }
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
          subtotal: product.price,
        },
      ]);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    if (newQuantity > item.stock) {
      return; // Don't allow quantity greater than stock
    }

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity * item.price,
            }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = subtotal * 0.12; // 12% VAT
  const total = subtotal + tax;

  return (
    <>
      <POSCheckoutModal
        open={showCheckout}
        onOpenChange={setShowCheckout}
        cart={cart}
        subtotal={subtotal}
        tax={tax}
        total={total}
        onComplete={() => {
          clearCart();
          setShowCheckout(false);
        }}
      />
      <PageWrapper title="Point of Sale" description="Process in-store sales">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          {/* Products Section */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Barcode className="h-4 w-4" />
              </Button>
            </div>

            {/* Products Grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => addToCart(product)}
                    content={
                      <div className="space-y-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-sm line-clamp-2">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.sku}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary">
                            {formatCurrency(product.price)}
                          </span>
                          <Badge
                            variant={product.stock > 10 ? "success" : "warning"}
                          >
                            Stock: {product.stock}
                          </Badge>
                        </div>
                      </div>
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="flex flex-col space-y-4">
            <Card
              title="Shopping Cart"
              description={`${cart.length} item(s)`}
              content={
                <div className="space-y-4">
                  {/* Cart Items */}
                  <div className="max-h-[calc(100vh-450px)] overflow-y-auto space-y-2">
                    {cart.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Cart is empty</p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-2 p-2 border rounded"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatCurrency(item.price)}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6 ml-auto"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-3 w-3 text-red-500" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">
                              {formatCurrency(item.subtotal)}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <Separator />

                  {/* Cart Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span>{formatCurrency(subtotal)}</span>
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

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      variant="primary"
                      className="w-full"
                      disabled={cart.length === 0}
                      onClick={() => setShowCheckout(true)}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Checkout
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={cart.length === 0}
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
