import { useState } from "react";
import { Link, useParams } from "react-router";
import { Button, Badge } from "@/components";
import { Card } from "@/components/ui/@raw-shadcn/card";
import { Separator } from "@/components/ui/@raw-shadcn/separator";
import RadioGroup from "@/components/ui/RadioButton/RadioGroup";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  ShoppingCart,
  Star,
  TruckIcon,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
  Package,
  User,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast/useToast";

type Review = {
  id: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  isVerifiedPurchase: boolean;
};

export default function ProductDetailPage() {
  const { uuid } = useParams();
  const { success } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data
  const product = {
    id: uuid || "1",
    name: "Classic T-Shirt",
    description:
      "Made from premium cotton, this classic t-shirt offers exceptional comfort and durability. Perfect for everyday wear, it features a relaxed fit and breathable fabric that keeps you cool throughout the day. The timeless design makes it a versatile addition to any wardrobe.",
    shortDescription: "Comfortable cotton t-shirt with modern fit",
    basePrice: 500,
    category: "Clothing",
    brand: "Premium Basics",
    sku: "TSH-001",
    rating: 4.5,
    reviewCount: 24,
    stock: 45,
    images: [
      "https://placehold.co/600x600",
      "https://placehold.co/600x600/blue/white",
      "https://placehold.co/600x600/red/white",
    ],
    variants: {
      sizes: [
        { value: "S", label: "Small", available: true },
        { value: "M", label: "Medium", available: true },
        { value: "L", label: "Large", available: true },
        { value: "XL", label: "Extra Large", available: false },
      ],
      colors: [
        { value: "red", label: "Red", available: true },
        { value: "blue", label: "Blue", available: true },
        { value: "black", label: "Black", available: true },
      ],
    },
  };

  // Mock reviews
  const reviews: Review[] = [
    {
      id: "1",
      customerName: "Juan Dela Cruz",
      rating: 5,
      title: "Excellent quality!",
      comment:
        "Really love this t-shirt. The fabric is soft and comfortable. Highly recommended!",
      date: "2026-01-05",
      isVerifiedPurchase: true,
    },
    {
      id: "2",
      customerName: "Maria Santos",
      rating: 4,
      title: "Good value for money",
      comment: "Nice shirt, fits well. The color is exactly as shown in the pictures.",
      date: "2026-01-03",
      isVerifiedPurchase: true,
    },
    {
      id: "3",
      customerName: "Pedro Reyes",
      rating: 5,
      title: "Perfect fit!",
      comment: "Ordered size M and it fits perfectly. Will definitely buy more!",
      date: "2025-12-28",
      isVerifiedPurchase: true,
    },
  ];

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return;
    }
    success(
      "Added to Cart",
      `${product.name} (${selectedSize}, ${selectedColor}) × ${quantity}`
    );
  };

  const updateQuantity = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

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
                  0
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Products</span>
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="primary">{product.category}</Badge>
                <Badge variant="success">In Stock</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.shortDescription}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              {renderStars(product.rating)}
              <span className="text-sm">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div>
              <div className="text-4xl font-bold text-primary">
                {formatCurrency(product.basePrice)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                SKU: {product.sku}
              </p>
            </div>

            <Separator />

            {/* Variants */}
            <div className="space-y-4">
              {/* Size Selection */}
              <div>
                <Label className="mb-3">
                  Size <span className="text-red-500">*</span>
                </Label>
                  <RadioGroup
                    options={product.variants.sizes.map((size) => ({
                      value: size.value,
                      label: size.label,
                      disabled: !size.available,
                    }))}
                    value={selectedSize}
                    onValueChange={(value: string) => setSelectedSize(value)}
                    orientation="horizontal"
                  />
              </div>

              {/* Color Selection */}
              <div>
                <Label className="mb-3">
                  Color <span className="text-red-500">*</span>
                </Label>
                  <RadioGroup
                    options={product.variants.colors.map((color) => ({
                      value: color.value,
                      label: color.label,
                      disabled: !color.available,
                    }))}
                    value={selectedColor}
                    onValueChange={(value: string) => setSelectedColor(value)}
                    orientation="horizontal"
                  />
              </div>

              {/* Quantity */}
              <div>
                <Label className="mb-3">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} available
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Add to Cart */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>

            {/* Features */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <TruckIcon className="h-5 w-5 text-muted-foreground" />
                <span>Free shipping on orders over ₱2,000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span>Secure payment & buyer protection</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Package className="h-5 w-5 text-muted-foreground" />
                <span>Fast delivery via J&T Express</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <Card
          title="Product Description"
          className="mb-8"
          content={
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              <div>
                <h4 className="font-semibold mb-2">Brand</h4>
                <p className="text-muted-foreground">{product.brand}</p>
              </div>
            </div>
          }
        />

        {/* Reviews */}
        <Card
          title="Customer Reviews"
          description={`${product.reviewCount} reviews`}
          content={
            <div className="space-y-6">
              {/* Review Summary */}
              <div className="flex items-center gap-8 pb-6 border-b">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">
                    {product.rating}
                  </div>
                  {renderStars(product.rating)}
                  <p className="text-sm text-muted-foreground mt-2">
                    Based on {product.reviewCount} reviews
                  </p>
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">
                            {review.customerName}
                          </span>
                          {review.isVerifiedPurchase && (
                            <Badge variant="success" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          }
        />
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

// Helper Label component
function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <label className={`block text-sm font-medium mb-2 ${className}`}>
      {children}
    </label>
  );
}
