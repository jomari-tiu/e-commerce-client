import { Button, IconMenuDropdown, Table, Badge } from "@/components";
import PageWrapper from "@/components/ui/PageWrapper";
import TableFilter from "@/components/ui/TableFilter";
import { useState } from "react";
import ProductModalForm from "./modals/ProductModalForm";
import { Edit, Trash2, Eye, Package } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";
import ProductDetailModal from "./modals/ProductDetailModal";

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

// Mock products with variants
const products: ProductType[] = [
  {
    id: "1",
    name: "Classic T-Shirt",
    description: "Premium cotton t-shirt with modern fit",
    shortDescription: "Comfortable cotton t-shirt",
    category: "Clothing",
    brand: "Premium Basics",
    sku: "TSH-001",
    basePrice: 500,
    images: ["https://placehold.co/100x100"],
    isActive: true,
    isFeatured: true,
    tags: ["clothing", "casual", "cotton"],
    weight: 200,
    variants: [
      {
        id: "v1",
        sku: "TSH-001-S-RED",
        variantCombination: [
          { type: "Size", value: "S" },
          { type: "Color", value: "Red" },
        ],
        priceAdjustment: 0,
        stock: 15,
        lowStockThreshold: 5,
        isActive: true,
      },
      {
        id: "v2",
        sku: "TSH-001-M-RED",
        variantCombination: [
          { type: "Size", value: "M" },
          { type: "Color", value: "Red" },
        ],
        priceAdjustment: 0,
        stock: 25,
        lowStockThreshold: 10,
        isActive: true,
      },
      {
        id: "v3",
        sku: "TSH-001-L-BLUE",
        variantCombination: [
          { type: "Size", value: "L" },
          { type: "Color", value: "Blue" },
        ],
        priceAdjustment: 50,
        stock: 8,
        lowStockThreshold: 10,
        isActive: true,
      },
    ],
    totalStock: 48,
    createdAt: "2026-01-01T00:00:00",
  },
  {
    id: "2",
    name: "Running Shoes",
    description: "Lightweight and comfortable running shoes",
    shortDescription: "Professional running shoes",
    category: "Footwear",
    brand: "SportPro",
    sku: "SHO-001",
    basePrice: 1450,
    images: ["https://placehold.co/100x100"],
    isActive: true,
    isFeatured: false,
    tags: ["shoes", "sports", "running"],
    weight: 450,
    variants: [
      {
        id: "v4",
        sku: "SHO-001-9-BLK",
        variantCombination: [{ type: "Size", value: "9" }],
        priceAdjustment: 0,
        stock: 12,
        lowStockThreshold: 5,
        isActive: true,
      },
      {
        id: "v5",
        sku: "SHO-001-10-BLK",
        variantCombination: [{ type: "Size", value: "10" }],
        priceAdjustment: 0,
        stock: 8,
        lowStockThreshold: 5,
        isActive: true,
      },
    ],
    totalStock: 20,
    createdAt: "2026-01-02T00:00:00",
  },
  {
    id: "3",
    name: "Wireless Headphones",
    description: "Premium sound quality with noise cancellation",
    shortDescription: "Bluetooth headphones",
    category: "Electronics",
    brand: "AudioTech",
    sku: "ELC-001",
    basePrice: 2500,
    images: ["https://placehold.co/100x100"],
    isActive: true,
    isFeatured: true,
    tags: ["electronics", "audio", "wireless"],
    weight: 250,
    variants: [], // No variants - simple product
    totalStock: 30,
    createdAt: "2026-01-03T00:00:00",
  },
];

export default function ProductManagementPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [productToDelete, setProductToDelete] = useState<ProductType | null>(
    null
  );
  const [productToView, setProductToView] = useState<ProductType | null>(null);
  const [filters, setFilters] = useState<{
    search: string;
    sortBy: keyof ProductType;
    orderBy: "asc" | "desc";
  }>({
    search: "",
    sortBy: "name",
    orderBy: "asc",
  });

  const handleProductEdit = (row: ProductType) => {
    setSelectedProduct(row);
  };

  const handleProductDelete = (row: ProductType) => {
    setProductToDelete(row);
  };

  const handleProductView = (row: ProductType) => {
    setProductToView(row);
  };

  const getStockStatus = (product: ProductType) => {
    if (product.variants.length === 0) {
      // Simple product
      if (product.totalStock === 0) return { label: "Out of Stock", variant: "danger" as const };
      if (product.totalStock <= 10) return { label: "Low Stock", variant: "warning" as const };
      return { label: "In Stock", variant: "success" as const };
    } else {
      // Product with variants
      const lowStockVariants = product.variants.filter(
        (v) => v.stock <= v.lowStockThreshold && v.stock > 0
      );
      const outOfStockVariants = product.variants.filter((v) => v.stock === 0);

      if (outOfStockVariants.length === product.variants.length) {
        return { label: "Out of Stock", variant: "danger" as const };
      }
      if (lowStockVariants.length > 0) {
        return { label: `Low Stock (${lowStockVariants.length} variants)`, variant: "warning" as const };
      }
      return { label: "In Stock", variant: "success" as const };
    }
  };

  return (
    <>
      <ProductModalForm
        open={selectedProduct !== null}
        product={selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      />
      <DeleteConfirmationModal
        product={productToDelete}
        open={productToDelete !== null}
        onOpenChange={() => setProductToDelete(null)}
        onDelete={() => {
          console.log("Delete product:", productToDelete?.id);
          setProductToDelete(null);
        }}
      />
      <ProductDetailModal
        product={productToView}
        open={productToView !== null}
        onOpenChange={() => setProductToView(null)}
      />
      <PageWrapper
        title="Product Management"
        description="Manage your products and variants"
      >
        <TableFilter
          filters={filters}
          setFilters={setFilters}
          actions={
            <Button
              variant="primary"
              onClick={() => setSelectedProduct({} as ProductType)}
            >
              Add Product
            </Button>
          }
        />
        <Table
          data={products}
          sortable
          striped
          hoverable
          sort={{
            column: filters.sortBy,
            direction: filters.orderBy,
          }}
          onSortChange={(
            column: keyof ProductType,
            direction: "asc" | "desc"
          ) => setFilters({ ...filters, sortBy: column, orderBy: direction })}
        >
          {({ Column }) => (
            <>
              <Column
                id="name"
                name="name"
                header="Product"
                sortable
                render={({ value, row }: { value: string; row: ProductType }) => (
                  <div className="flex items-center gap-3">
                    <img
                      src={row.images[0]}
                      alt={value}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium">{value}</div>
                      <div className="text-xs text-muted-foreground">
                        SKU: {row.sku}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {row.category} • {row.brand}
                      </div>
                    </div>
                  </div>
                )}
              />
              <Column
                id="basePrice"
                name="basePrice"
                header="Base Price"
                sortable
                render={({ value }) => (
                  <div className="font-medium">{formatCurrency(value)}</div>
                )}
              />
              <Column
                id="variants"
                name="variants"
                header="Variants"
                render={({ row }: { row: ProductType }) => (
                  <div>
                    {row.variants.length === 0 ? (
                      <Badge variant="default">Simple Product</Badge>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {row.variants.length} variants
                        </span>
                      </div>
                    )}
                  </div>
                )}
              />
              <Column
                id="totalStock"
                name="totalStock"
                header="Total Stock"
                sortable
                render={({ row }: { row: ProductType }) => {
                  const status = getStockStatus(row);
                  return (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{row.totalStock}</span>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                  );
                }}
              />
              <Column
                id="isActive"
                name="isActive"
                header="Status"
                sortable
                render={({ value, row }: { value: boolean; row: ProductType }) => (
                  <div className="flex items-center gap-2">
                    <Badge variant={value ? "success" : "danger"}>
                      {value ? "Active" : "Inactive"}
                    </Badge>
                    {row.isFeatured && (
                      <Badge variant="primary">Featured</Badge>
                    )}
                  </div>
                )}
              />
              <Column
                id="actions"
                header="Actions"
                width="100px"
                sticky="right"
                render={({ row }: { row: ProductType }) => (
                  <IconMenuDropdown
                    variant="primary"
                    items={[
                      {
                        label: "View Details",
                        onClick: () => handleProductView(row),
                        icon: <Eye className="h-4 w-4" />,
                      },
                      {
                        label: "Edit",
                        onClick: () => handleProductEdit(row),
                        icon: <Edit className="h-4 w-4" />,
                      },
                      { type: "separator" },
                      {
                        label: "Delete",
                        onClick: () => handleProductDelete(row),
                        icon: <Trash2 className="h-4 w-4" />,
                        destructive: true,
                      },
                    ]}
                  />
                )}
              />
            </>
          )}
        </Table>
      </PageWrapper>
    </>
  );
}
