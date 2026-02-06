import { useState } from "react";
import { Link } from "react-router";
import { Button, Badge } from "@/components";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/@raw-shadcn/card";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  Search,
  ShoppingCart,
  User,
  Star,
  TruckIcon,
  Shield,
  Package,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  shortDescription: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
};

// Mock products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic T-Shirt",
    shortDescription: "Comfortable cotton t-shirt",
    price: 500,
    image: "https://placehold.co/400x400",
    category: "Clothing",
    rating: 4.5,
    reviewCount: 24,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Running Shoes",
    shortDescription: "Lightweight running shoes",
    price: 1450,
    image: "https://placehold.co/400x400",
    category: "Footwear",
    rating: 4.8,
    reviewCount: 56,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Wireless Headphones",
    shortDescription: "Premium sound quality",
    price: 2500,
    image: "https://placehold.co/400x400",
    category: "Electronics",
    rating: 4.7,
    reviewCount: 89,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Sports Cap",
    shortDescription: "Adjustable sports cap",
    price: 350,
    image: "https://placehold.co/400x400",
    category: "Accessories",
    rating: 4.3,
    reviewCount: 12,
    isFeatured: false,
  },
  {
    id: "5",
    name: "Water Bottle",
    shortDescription: "1L stainless steel",
    price: 250,
    image: "https://placehold.co/400x400",
    category: "Accessories",
    rating: 4.6,
    reviewCount: 34,
    isFeatured: false,
  },
  {
    id: "6",
    name: "Denim Jeans",
    shortDescription: "Classic fit denim",
    price: 1200,
    image: "https://placehold.co/400x400",
    category: "Clothing",
    rating: 4.4,
    reviewCount: 45,
    isFeatured: false,
  },
];

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(mockProducts.map((p) => p.category))),
  ];

  const featuredProducts = mockProducts.filter((p) => p.isFeatured);

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Actions */}
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

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Welcome to Our Store
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                Discover amazing products at unbeatable prices. Shop now and
                enjoy free shipping on orders over ₱2,000!
              </p>
              <div className="flex gap-4">
                <Button variant="primary" size="lg">
                  Shop Now
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://placehold.co/600x400"
                alt="Hero"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <TruckIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Orders over ₱2,000
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">
                  100% secure transactions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  J&T Express shipping
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group"
              >
                <Card
                  className="h-full hover:shadow-lg transition-shadow"
                  content={
                    <div className="space-y-3">
                      <div className="relative overflow-hidden rounded-lg bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge
                          variant="primary"
                          className="absolute top-2 right-2"
                        >
                          Featured
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {product.category}
                        </p>
                        <h3 className="font-semibold text-lg">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {product.shortDescription}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {product.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          {formatCurrency(product.price)}
                        </span>
                        <Button variant="primary" size="sm">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  }
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">All Products</h2>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "primary" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group"
              >
                <Card
                  className="h-full hover:shadow-lg transition-shadow"
                  content={
                    <div className="space-y-3">
                      <div className="relative overflow-hidden rounded-lg bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {product.category}
                        </p>
                        <h3 className="font-semibold">{product.name}</h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">
                          {product.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {formatCurrency(product.price)}
                        </span>
                      </div>
                    </div>
                  }
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">About Us</h3>
              <p className="text-sm text-gray-400">
                Your trusted online store for quality products at great prices.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Contact Us</li>
                <li>Shipping Info</li>
                <li>Returns</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>My Account</li>
                <li>Order Tracking</li>
                <li>Wishlist</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: info@store.com</li>
                <li>Phone: +63 912 345 6789</li>
                <li>Address: Manila, Philippines</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 E-Commerce Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
