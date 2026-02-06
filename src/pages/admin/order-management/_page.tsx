import { Button, IconMenuDropdown, Table, Badge } from "@/components";
import PageWrapper from "@/components/ui/PageWrapper";
import TableFilter from "@/components/ui/TableFilter";
import { useState } from "react";
import { Eye, Truck, XCircle, CheckCircle } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";
import OrderDetailModal from "./modals/OrderDetailModal";

type OrderStatus = 
  | "pending" 
  | "confirmed" 
  | "processing" 
  | "ready_to_ship" 
  | "shipped" 
  | "delivered" 
  | "cancelled" 
  | "refunded";

type OrderType = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: OrderStatus;
  orderType: "online" | "pos";
  createdAt: string;
  itemCount: number;
};

// Mock data
const orders: OrderType[] = [
  {
    id: "1",
    orderNumber: "ORD-20260110-00001",
    customerName: "Juan Dela Cruz",
    customerEmail: "juan@example.com",
    total: 2450,
    status: "pending",
    orderType: "online",
    createdAt: "2026-01-10T10:30:00",
    itemCount: 3,
  },
  {
    id: "2",
    orderNumber: "ORD-20260110-00002",
    customerName: "Maria Santos",
    customerEmail: "maria@example.com",
    total: 1890,
    status: "processing",
    orderType: "online",
    createdAt: "2026-01-10T09:15:00",
    itemCount: 2,
  },
  {
    id: "3",
    orderNumber: "POS-20260110-00001",
    customerName: "Walk-in Customer",
    customerEmail: "-",
    total: 3250,
    status: "delivered",
    orderType: "pos",
    createdAt: "2026-01-10T08:45:00",
    itemCount: 5,
  },
  {
    id: "4",
    orderNumber: "ORD-20260109-00156",
    customerName: "Pedro Reyes",
    customerEmail: "pedro@example.com",
    total: 5600,
    status: "shipped",
    orderType: "online",
    createdAt: "2026-01-09T16:20:00",
    itemCount: 4,
  },
  {
    id: "5",
    orderNumber: "ORD-20260109-00155",
    customerName: "Ana Garcia",
    customerEmail: "ana@example.com",
    total: 1500,
    status: "delivered",
    orderType: "online",
    createdAt: "2026-01-09T14:10:00",
    itemCount: 1,
  },
];

export default function OrderManagementPage() {
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [filters, setFilters] = useState<{
    search: string;
    sortBy: keyof OrderType;
    orderBy: "asc" | "desc";
  }>({
    search: "",
    sortBy: "createdAt",
    orderBy: "desc",
  });

  const getStatusBadge = (status: OrderStatus) => {
    const variants: Record<OrderStatus, "warning" | "info" | "primary" | "success" | "danger" | "default"> = {
      pending: "warning",
      confirmed: "info",
      processing: "info",
      ready_to_ship: "primary",
      shipped: "primary",
      delivered: "success",
      cancelled: "danger",
      refunded: "danger",
    };
    return variants[status] || "default";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleViewOrder = (row: OrderType) => {
    setSelectedOrder(row);
  };

  const handleUpdateStatus = (row: OrderType, status: OrderStatus) => {
    console.log("Update order status:", row.id, status);
    // TODO: Implement status update
  };

  return (
    <>
      <OrderDetailModal
        order={selectedOrder}
        open={selectedOrder !== null}
        onOpenChange={() => setSelectedOrder(null)}
      />
      <PageWrapper
        title="Order Management"
        description="Manage and track all customer orders"
      >
        <TableFilter
          filters={filters}
          setFilters={setFilters}
          actions={
            <div className="flex gap-2">
              <Button variant="outline">Export Orders</Button>
            </div>
          }
        />
        <Table
          data={orders}
          sortable
          striped
          hoverable
          sort={{
            column: filters.sortBy,
            direction: filters.orderBy,
          }}
          onSortChange={(
            column: keyof OrderType,
            direction: "asc" | "desc"
          ) => setFilters({ ...filters, sortBy: column, orderBy: direction })}
        >
          {({ Column }) => (
            <>
              <Column 
                id="orderNumber" 
                name="orderNumber" 
                header="Order Number" 
                sortable 
                render={({ value, row }: { value: string; row: OrderType }) => (
                  <div>
                    <div className="font-medium">{value}</div>
                    <div className="text-xs text-muted-foreground">
                      {row.orderType === "pos" ? "POS" : "Online"}
                    </div>
                  </div>
                )}
              />
              <Column
                id="customerName"
                name="customerName"
                header="Customer"
                sortable
                render={({ value, row }: { value: string; row: OrderType }) => (
                  <div>
                    <div className="font-medium">{value}</div>
                    {row.customerEmail !== "-" && (
                      <div className="text-xs text-muted-foreground">
                        {row.customerEmail}
                      </div>
                    )}
                  </div>
                )}
              />
              <Column
                id="itemCount"
                name="itemCount"
                header="Items"
                sortable
                render={({ value }) => (
                  <span className="text-sm">{value} item(s)</span>
                )}
              />
              <Column
                id="total"
                name="total"
                header="Total"
                sortable
                render={({ value }) => (
                  <span className="font-semibold">{formatCurrency(value)}</span>
                )}
              />
              <Column
                id="status"
                name="status"
                header="Status"
                sortable
                render={({ value }: { value: OrderStatus }) => (
                  <Badge variant={getStatusBadge(value)}>
                    {value.replace(/_/g, " ")}
                  </Badge>
                )}
              />
              <Column
                id="createdAt"
                name="createdAt"
                header="Date"
                sortable
                render={({ value }) => (
                  <span className="text-sm">{formatDate(value)}</span>
                )}
              />
              <Column
                id="actions"
                header="Actions"
                width="100px"
                sticky="right"
                render={({ row }: { row: OrderType }) => (
                  <IconMenuDropdown
                    variant="primary"
                    items={[
                      {
                        label: "View Details",
                        onClick: () => handleViewOrder(row),
                        icon: <Eye className="h-4 w-4" />,
                      },
                      { type: "separator" },
                      ...(row.status === "pending"
                        ? [
                            {
                              label: "Confirm Order",
                              onClick: () => handleUpdateStatus(row, "confirmed"),
                              icon: <CheckCircle className="h-4 w-4" />,
                            },
                          ]
                        : []),
                      ...(row.status === "confirmed" || row.status === "processing"
                        ? [
                            {
                              label: "Mark as Shipped",
                              onClick: () => handleUpdateStatus(row, "shipped"),
                              icon: <Truck className="h-4 w-4" />,
                            },
                          ]
                        : []),
                      ...(row.status === "shipped"
                        ? [
                            {
                              label: "Mark as Delivered",
                              onClick: () => handleUpdateStatus(row, "delivered"),
                              icon: <CheckCircle className="h-4 w-4" />,
                            },
                          ]
                        : []),
                      { type: "separator" },
                      {
                        label: "Cancel Order",
                        onClick: () => handleUpdateStatus(row, "cancelled"),
                        icon: <XCircle className="h-4 w-4" />,
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
