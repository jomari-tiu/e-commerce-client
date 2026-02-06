import { useState } from "react";
import { Button, IconMenuDropdown, Table, Badge } from "@/components";
import PageWrapper from "@/components/ui/PageWrapper";
import TableFilter from "@/components/ui/TableFilter";
import { Tabs, TabItem } from "@/components/ui/Tabs";
import { Package, TrendingUp, TrendingDown, AlertCircle, Plus } from "lucide-react";
import RestockModal from "./modals/RestockModal";
import StockAdjustmentModal from "./modals/StockAdjustmentModal";
import StockMovementDetailModal from "./modals/StockMovementDetailModal";

type InventoryItem = {
  id: string;
  productId: string;
  productName: string;
  variantSku: string | null;
  variantDescription: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  lowStockThreshold: number;
  reorderPoint: number;
  reorderQuantity: number;
  lastRestocked: string;
  restockedBy: string;
};

type StockMovement = {
  id: string;
  productName: string;
  variantSku: string | null;
  type: "restock" | "sale" | "return" | "adjustment" | "damage";
  quantity: number;
  remainingStock: number;
  reference: string;
  notes: string;
  createdAt: string;
  createdBy: string;
};

// Mock inventory data
const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    productId: "1",
    productName: "Classic T-Shirt",
    variantSku: "TSH-001-S-RED",
    variantDescription: "Size: S, Color: Red",
    currentStock: 15,
    reservedStock: 3,
    availableStock: 12,
    lowStockThreshold: 5,
    reorderPoint: 10,
    reorderQuantity: 50,
    lastRestocked: "2026-01-05T10:00:00",
    restockedBy: "John Admin",
  },
  {
    id: "2",
    productId: "1",
    productName: "Classic T-Shirt",
    variantSku: "TSH-001-M-RED",
    variantDescription: "Size: M, Color: Red",
    currentStock: 25,
    reservedStock: 5,
    availableStock: 20,
    lowStockThreshold: 10,
    reorderPoint: 15,
    reorderQuantity: 50,
    lastRestocked: "2026-01-05T10:00:00",
    restockedBy: "John Admin",
  },
  {
    id: "3",
    productId: "1",
    productName: "Classic T-Shirt",
    variantSku: "TSH-001-L-BLUE",
    variantDescription: "Size: L, Color: Blue",
    currentStock: 3,
    reservedStock: 1,
    availableStock: 2,
    lowStockThreshold: 10,
    reorderPoint: 10,
    reorderQuantity: 50,
    lastRestocked: "2025-12-28T14:00:00",
    restockedBy: "Maria Santos",
  },
  {
    id: "4",
    productId: "2",
    productName: "Running Shoes",
    variantSku: "SHO-001-9-BLK",
    variantDescription: "Size: 9",
    currentStock: 12,
    reservedStock: 2,
    availableStock: 10,
    lowStockThreshold: 5,
    reorderPoint: 8,
    reorderQuantity: 30,
    lastRestocked: "2026-01-01T00:00:00",
    restockedBy: "John Admin",
  },
  {
    id: "5",
    productId: "3",
    productName: "Wireless Headphones",
    variantSku: null,
    variantDescription: "No variants",
    currentStock: 30,
    reservedStock: 8,
    availableStock: 22,
    lowStockThreshold: 8,
    reorderPoint: 15,
    reorderQuantity: 50,
    lastRestocked: "2026-01-03T00:00:00",
    restockedBy: "John Admin",
  },
];

// Mock stock movements
const stockMovements: StockMovement[] = [
  {
    id: "1",
    productName: "Classic T-Shirt",
    variantSku: "TSH-001-M-RED",
    type: "sale",
    quantity: -2,
    remainingStock: 25,
    reference: "ORD-20260110-00001",
    notes: "Sold via online order",
    createdAt: "2026-01-10T10:30:00",
    createdBy: "System",
  },
  {
    id: "2",
    productName: "Running Shoes",
    variantSku: "SHO-001-9-BLK",
    type: "sale",
    quantity: -1,
    remainingStock: 12,
    reference: "POS-20260110-00001",
    notes: "Sold via POS",
    createdAt: "2026-01-10T08:45:00",
    createdBy: "Maria Santos",
  },
  {
    id: "3",
    productName: "Classic T-Shirt",
    variantSku: "TSH-001-S-RED",
    type: "restock",
    quantity: 50,
    remainingStock: 15,
    reference: "INV-2026-001",
    notes: "Monthly restock from supplier",
    createdAt: "2026-01-05T10:00:00",
    createdBy: "John Admin",
  },
  {
    id: "4",
    productName: "Wireless Headphones",
    variantSku: null,
    type: "return",
    quantity: 2,
    remainingStock: 30,
    reference: "RET-2026-005",
    notes: "Customer return - defective unit",
    createdAt: "2026-01-09T14:20:00",
    createdBy: "Maria Santos",
  },
  {
    id: "5",
    productName: "Classic T-Shirt",
    variantSku: "TSH-001-L-BLUE",
    type: "adjustment",
    quantity: -3,
    remainingStock: 3,
    reference: "ADJ-2026-003",
    notes: "Stock count correction",
    createdAt: "2026-01-08T16:00:00",
    createdBy: "John Admin",
  },
];

export default function InventoryManagementPage() {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [selectedMovement, setSelectedMovement] = useState<StockMovement | null>(null);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  const [filters, setFilters] = useState<{
    search: string;
    sortBy: string;
    orderBy: "asc" | "desc";
  }>({
    search: "",
    sortBy: "productName",
    orderBy: "asc",
  });

  const getStockStatus = (item: InventoryItem) => {
    if (item.availableStock === 0) {
      return { label: "Out of Stock", variant: "danger" as const };
    }
    if (item.availableStock <= item.lowStockThreshold) {
      return { label: "Low Stock", variant: "warning" as const };
    }
    if (item.availableStock <= item.reorderPoint) {
      return { label: "Reorder Soon", variant: "info" as const };
    }
    return { label: "In Stock", variant: "success" as const };
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "restock":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "sale":
        return <TrendingDown className="h-4 w-4 text-blue-600" />;
      case "return":
        return <TrendingUp className="h-4 w-4 text-orange-600" />;
      case "adjustment":
        return <AlertCircle className="h-4 w-4 text-purple-600" />;
      case "damage":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getMovementBadge = (type: string) => {
    const variants = {
      restock: "success" as const,
      sale: "primary" as const,
      return: "warning" as const,
      adjustment: "info" as const,
      damage: "danger" as const,
    };
    return variants[type as keyof typeof variants] || "default";
  };

  const lowStockItems = inventoryItems.filter(
    (item) => item.availableStock <= item.lowStockThreshold
  );

  const tabs: TabItem[] = [
    {
      value: "inventory",
      label: "Current Inventory",
      icon: <Package className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <TableFilter
            filters={filters}
            setFilters={setFilters}
            actions={
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowRestockModal(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Restock
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdjustmentModal(true)}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Adjust Stock
                </Button>
              </div>
            }
          />
          <Table
            data={inventoryItems}
            sortable
            striped
            hoverable
          >
            {({ Column }) => (
              <>
                <Column
                  id="productName"
                  name="productName"
                  header="Product"
                  sortable
                  render={({ value, row }: { value: string; row: InventoryItem }) => (
                    <div>
                      <div className="font-medium">{value}</div>
                      {row.variantSku && (
                        <>
                          <div className="text-xs text-muted-foreground">
                            {row.variantDescription}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            SKU: {row.variantSku}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                />
                <Column
                  id="currentStock"
                  name="currentStock"
                  header="Current"
                  sortable
                  render={({ value }) => (
                    <span className="font-semibold">{value}</span>
                  )}
                />
                <Column
                  id="reservedStock"
                  name="reservedStock"
                  header="Reserved"
                  sortable
                  render={({ value }) => (
                    <span className="text-orange-600 font-medium">{value}</span>
                  )}
                />
                <Column
                  id="availableStock"
                  name="availableStock"
                  header="Available"
                  sortable
                  render={({ row }: { row: InventoryItem }) => {
                    const status = getStockStatus(row);
                    return (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {row.availableStock}
                        </span>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                    );
                  }}
                />
                <Column
                  id="lowStockThreshold"
                  name="lowStockThreshold"
                  header="Threshold"
                  render={({ value }) => (
                    <span className="text-sm text-muted-foreground">{value}</span>
                  )}
                />
                <Column
                  id="lastRestocked"
                  name="lastRestocked"
                  header="Last Restocked"
                  sortable
                  render={({ value, row }: { value: string; row: InventoryItem }) => (
                    <div>
                      <div className="text-sm">
                        {new Date(value).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        by {row.restockedBy}
                      </div>
                    </div>
                  )}
                />
                <Column
                  id="actions"
                  header="Actions"
                  width="100px"
                  sticky="right"
                  render={({ row }: { row: InventoryItem }) => (
                    <IconMenuDropdown
                      variant="primary"
                      items={[
                        {
                          label: "Restock",
                          onClick: () => {
                            setSelectedItem(row);
                            setShowRestockModal(true);
                          },
                          icon: <TrendingUp className="h-4 w-4" />,
                        },
                        {
                          label: "Adjust Stock",
                          onClick: () => {
                            setSelectedItem(row);
                            setShowAdjustmentModal(true);
                          },
                          icon: <AlertCircle className="h-4 w-4" />,
                        },
                      ]}
                    />
                  )}
                />
              </>
            )}
          </Table>
        </div>
      ),
    },
    {
      value: "movements",
      label: "Stock Movements",
      icon: <TrendingUp className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Complete history of all stock changes
            </p>
          </div>
          <Table data={stockMovements} striped hoverable>
            {({ Column }) => (
              <>
                <Column
                  id="createdAt"
                  name="createdAt"
                  header="Date & Time"
                  sortable
                  render={({ value }) => (
                    <div className="text-sm">
                      {new Date(value).toLocaleString()}
                    </div>
                  )}
                />
                <Column
                  id="type"
                  name="type"
                  header="Type"
                  render={({ value }) => (
                    <div className="flex items-center gap-2">
                      {getMovementIcon(value)}
                      <Badge variant={getMovementBadge(value)}>
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                      </Badge>
                    </div>
                  )}
                />
                <Column
                  id="productName"
                  name="productName"
                  header="Product"
                  render={({ value, row }: { value: string; row: StockMovement }) => (
                    <div>
                      <div className="font-medium">{value}</div>
                      {row.variantSku && (
                        <div className="text-xs text-muted-foreground">
                          SKU: {row.variantSku}
                        </div>
                      )}
                    </div>
                  )}
                />
                <Column
                  id="quantity"
                  name="quantity"
                  header="Quantity"
                  render={({ value }) => (
                    <span
                      className={`font-semibold ${
                        value > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {value > 0 ? "+" : ""}
                      {value}
                    </span>
                  )}
                />
                <Column
                  id="remainingStock"
                  name="remainingStock"
                  header="After"
                  render={({ value }) => (
                    <span className="font-medium">{value}</span>
                  )}
                />
                <Column
                  id="reference"
                  name="reference"
                  header="Reference"
                  render={({ value }) => (
                    <span className="text-sm font-mono">{value}</span>
                  )}
                />
                <Column
                  id="createdBy"
                  name="createdBy"
                  header="By"
                  render={({ value }) => (
                    <span className="text-sm">{value}</span>
                  )}
                />
              </>
            )}
          </Table>
        </div>
      ),
    },
    {
      value: "alerts",
      label: "Low Stock Alerts",
      icon: <AlertCircle className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-orange-900">
                Low Stock Alert
              </h3>
            </div>
            <p className="text-sm text-orange-800">
              {lowStockItems.length} item(s) are currently below the low stock
              threshold and need restocking.
            </p>
          </div>

          {lowStockItems.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed rounded-lg">
              <Package className="h-12 w-12 mx-auto mb-3 text-green-600 opacity-50" />
              <p className="text-sm text-muted-foreground">
                All items are well stocked! 🎉
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockItems.map((item) => {
                const status = getStockStatus(item);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-white"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{item.productName}</div>
                      {item.variantSku && (
                        <div className="text-sm text-muted-foreground">
                          {item.variantDescription}
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Available:{" "}
                          </span>
                          <span className="font-semibold text-orange-600">
                            {item.availableStock}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Threshold:{" "}
                          </span>
                          <span className="font-semibold">
                            {item.lowStockThreshold}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Reorder:{" "}
                          </span>
                          <span className="font-semibold">
                            {item.reorderQuantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={status.variant}>{status.label}</Badge>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowRestockModal(true);
                        }}
                      >
                        Restock Now
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <RestockModal
        open={showRestockModal}
        onOpenChange={setShowRestockModal}
        item={selectedItem}
        onClose={() => {
          setShowRestockModal(false);
          setSelectedItem(null);
        }}
      />
      <StockAdjustmentModal
        open={showAdjustmentModal}
        onOpenChange={setShowAdjustmentModal}
        item={selectedItem}
        onClose={() => {
          setShowAdjustmentModal(false);
          setSelectedItem(null);
        }}
      />
      <StockMovementDetailModal
        open={selectedMovement !== null}
        onOpenChange={() => setSelectedMovement(null)}
        movement={selectedMovement}
      />
      <PageWrapper
        title="Inventory Management"
        description="Track and manage stock levels across all products and variants"
      >
        <Tabs items={tabs} defaultValue="inventory" />
      </PageWrapper>
    </>
  );
}
