import { Modal, Badge } from "@/components";
import { Separator } from "@/components/ui/@raw-shadcn/separator";
import { formatCurrency } from "@/utils/formatCurrency";
import { Package, Tag, Box, TrendingUp } from "lucide-react";

type VariantCombination = {
  type: string;
  value: string;
};

type ProductVariant = {
  id: string;
  sku: string;
  variantCombination: VariantCombination[];
  priceAdjustment: number;
  stock: number;
  lowStockThreshold: number;
  isActive: boolean;
};

type ProductType = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  brand: string;
  sku: string;
  basePrice: number;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  weight: number;
  variants: ProductVariant[];
  totalStock: number;
  createdAt: string;
};

type ProductDetailModalProps = {
  product: ProductType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ProductDetailModal({
  product,
  open,
  onOpenChange,
}: ProductDetailModalProps) {
  if (!product) return null;

  const getVariantPrice = (variant: ProductVariant) => {
    return product.basePrice + variant.priceAdjustment;
  };

  const getStockBadge = (stock: number, threshold: number) => {
    if (stock === 0) return <Badge variant="danger">Out of Stock</Badge>;
    if (stock <= threshold) return <Badge variant="warning">Low Stock</Badge>;
    return <Badge variant="success">In Stock</Badge>;
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={product.name}
      description={`SKU: ${product.sku}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Product Images */}
        <div className="flex gap-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="w-24 h-24 object-cover rounded border"
            />
          ))}
        </div>

        {/* Product Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Category
            </h4>
            <p>{product.category}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Brand
            </h4>
            <p>{product.brand}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Base Price
            </h4>
            <p className="text-lg font-bold text-primary">
              {formatCurrency(product.basePrice)}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Weight
            </h4>
            <p>{product.weight}g</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <Badge variant={product.isActive ? "success" : "danger"}>
            {product.isActive ? "Active" : "Inactive"}
          </Badge>
          {product.isFeatured && <Badge variant="primary">Featured</Badge>}
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-sm font-medium">Tags</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <Badge key={index} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Description */}
        <div>
          <h4 className="text-sm font-medium mb-2">Description</h4>
          <p className="text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        <Separator />

        {/* Variants */}
        {product.variants.length > 0 ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-muted-foreground" />
              <h4 className="text-sm font-semibold">
                Product Variants ({product.variants.length})
              </h4>
            </div>
            <div className="space-y-3">
              {product.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">
                        {variant.variantCombination
                          .map((vc) => vc.value)
                          .join(" / ")}
                      </span>
                      {!variant.isActive && (
                        <Badge variant="danger" className="text-xs">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      SKU: {variant.sku}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Price: </span>
                        <span className="font-semibold">
                          {formatCurrency(getVariantPrice(variant))}
                        </span>
                        {variant.priceAdjustment !== 0 && (
                          <span className="text-xs text-muted-foreground ml-1">
                            ({variant.priceAdjustment > 0 ? "+" : ""}
                            {formatCurrency(variant.priceAdjustment)})
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Stock: </span>
                        <span className="font-semibold">{variant.stock}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStockBadge(variant.stock, variant.lowStockThreshold)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Stock Summary */}
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Box className="h-4 w-4" />
                  <span className="font-medium">Total Stock Across Variants</span>
                </div>
                <span className="text-lg font-bold">{product.totalStock}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              This is a simple product with no variants
            </p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <div>
                <span className="text-muted-foreground text-sm">
                  Total Stock:{" "}
                </span>
                <span className="text-lg font-bold">{product.totalStock}</span>
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Metadata */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <TrendingUp className="h-3 w-3" />
          <span>
            Created: {new Date(product.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Modal>
  );
}
