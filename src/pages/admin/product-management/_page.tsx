import { Button, IconMenuDropdown, Table } from "@/components";
import PageWrapper from "@/components/ui/PageWrapper";
import TableFilter from "@/components/ui/TableFilter";
import { useState } from "react";
import ProductModalForm from "./modals/ProductModalForm";
import { Edit, Trash2 } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";
import { ProductFormType } from "./types/productFormSchema";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";

type ProductType = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

const products: ProductType[] = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    stock: 10,
  },
  {
    id: 2,
    name: "Product 2",
    price: 2000,
    stock: 20,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    stock: 30,
  },
];

export default function ProductManagementPage() {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductFormType | null>(null);
  const [selectedProductToDelete, setSelectedProductToDelete] =
    useState<ProductFormType | null>(null);
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
    setSelectedProductToDelete(row);
  };

  return (
    <>
      <ProductModalForm
        open={selectedProduct !== null}
        defaultValues={selectedProduct ?? undefined}
        onOpenChange={() => setSelectedProduct(null)}
      />
      <DeleteConfirmationModal
        product={selectedProductToDelete}
        open={selectedProductToDelete !== null}
        onOpenChange={() => setSelectedProductToDelete(null)}
        onDelete={() => setSelectedProductToDelete(null)}
      />
      <PageWrapper
        title="Product Management"
        description="Manage your products"
      >
        <TableFilter
          filters={filters}
          setFilters={setFilters}
          actions={
            <ProductModalForm
              trigger={<Button variant="primary">Add Product</Button>}
            />
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
              <Column id="name" name="name" header="Name" sortable />
              <Column
                id="price"
                name="price"
                header="Price"
                sortable
                render={({ value }) => formatCurrency(value)}
              />
              <Column id="stock" name="stock" header="Stock" sortable />
              <Column
                id="actions"
                header="Actions"
                width="100px"
                sticky="right"
                render={({ row }: { row: any }) => (
                  <IconMenuDropdown
                    variant="primary"
                    items={[
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
