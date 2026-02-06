import { Modal, Button } from "@/components";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/@raw-shadcn/Label";
import { Textarea } from "@/components/ui/@raw-shadcn/textarea";
import { Switch } from "@/components/ui/@raw-shadcn/switch";
import { Tabs, TabItem } from "@/components/ui/Tabs";
import { useToast } from "@/components/ui/Toast/useToast";
import { useState, useMemo } from "react";
import { Package, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";

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
  id?: string;
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
};

type ProductModalFormProps = {
  product?: ProductType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const getInitialFormData = (product?: ProductType | null): ProductType => {
  if (product && product.id) {
    return product;
  }
  return {
    name: "",
    description: "",
    shortDescription: "",
    category: "",
    brand: "",
    sku: "",
    basePrice: 0,
    images: [],
    isActive: true,
    isFeatured: false,
    tags: [],
    weight: 0,
    variants: [],
  };
};

export default function ProductModalForm({
  product,
  open,
  onOpenChange,
}: ProductModalFormProps) {
  const { success } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initialFormData = useMemo(() => getInitialFormData(product), [product]);
  const [formData, setFormData] = useState<ProductType>(initialFormData);

  // Reset form data when modal opens/closes or product changes
  if (open && JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
    setFormData(initialFormData);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      success(
        product?.id ? "Product Updated" : "Product Added",
        `${formData.name} has been ${product?.id ? "updated" : "added"} successfully`
      );
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  const tabs: TabItem[] = [
    {
      value: "basic",
      label: "Basic Info",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="name">
                Product Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price (₱) *</Label>
              <Input
                id="basePrice"
                type="number"
                value={formData.basePrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    basePrice: parseFloat(e.target.value) || 0,
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (grams) *</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    weight: parseFloat(e.target.value) || 0,
                  })
                }
                required
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shortDescription: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label htmlFor="isActive">Active Status</Label>
                <p className="text-xs text-muted-foreground">
                  Inactive products won't be visible in the store
                </p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label htmlFor="isFeatured">Featured Product</Label>
                <p className="text-xs text-muted-foreground">
                  Featured products appear on the homepage
                </p>
              </div>
              <Switch
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isFeatured: checked })
                }
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "variants",
      label: "Variants",
      icon: <Package className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Product Variants</h4>
              <p className="text-sm text-muted-foreground">
                Manage different variations of this product (Size, Color, etc.)
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                // Add new variant
                const newVariant: ProductVariant = {
                  id: `temp-${Date.now()}`,
                  sku: `${formData.sku}-VAR-${formData.variants.length + 1}`,
                  variantCombination: [],
                  priceAdjustment: 0,
                  stock: 0,
                  lowStockThreshold: 5,
                  isActive: true,
                };
                setFormData({
                  ...formData,
                  variants: [...formData.variants, newVariant],
                });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Variant
            </Button>
          </div>

          {formData.variants.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed rounded-lg">
              <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground mb-4">
                No variants added yet. This is a simple product.
              </p>
              <Button type="button" variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add First Variant
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.variants.map((variant, index) => (
                <div key={variant.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Variant {index + 1}</h5>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          variants: formData.variants.filter(
                            (_, i) => i !== index
                          ),
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>SKU</Label>
                      <Input
                        value={variant.sku}
                        onChange={(e) => {
                          const updated = [...formData.variants];
                          updated[index].sku = e.target.value;
                          setFormData({ ...formData, variants: updated });
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Price Adjustment (₱)</Label>
                      <Input
                        type="number"
                        value={variant.priceAdjustment}
                        onChange={(e) => {
                          const updated = [...formData.variants];
                          updated[index].priceAdjustment =
                            parseFloat(e.target.value) || 0;
                          setFormData({ ...formData, variants: updated });
                        }}
                      />
                      <p className="text-xs text-muted-foreground">
                        Final Price:{" "}
                        {formatCurrency(
                          formData.basePrice + variant.priceAdjustment
                        )}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Stock</Label>
                      <Input
                        type="number"
                        value={variant.stock}
                        onChange={(e) => {
                          const updated = [...formData.variants];
                          updated[index].stock = parseInt(e.target.value) || 0;
                          setFormData({ ...formData, variants: updated });
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Low Stock Threshold</Label>
                      <Input
                        type="number"
                        value={variant.lowStockThreshold}
                        onChange={(e) => {
                          const updated = [...formData.variants];
                          updated[index].lowStockThreshold =
                            parseInt(e.target.value) || 0;
                          setFormData({ ...formData, variants: updated });
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Note: Variant attributes (Size, Color, etc.) will be
                    configured in the full version
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={product?.id ? "Edit Product" : "Add New Product"}
      description={
        product?.id ? "Update product information" : "Add a new product to your inventory"
      }
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit}>
        <Tabs items={tabs} defaultValue="basic" />

        <div className="flex gap-3 mt-6 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : product?.id
              ? "Update Product"
              : "Add Product"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
