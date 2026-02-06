import { Card } from "@/components/ui/@raw-shadcn/card";
import PageWrapper from "@/components/ui/PageWrapper";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  DollarSign,
  AlertCircle 
} from "lucide-react";

export default function DashboardPage() {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: "Total Revenue",
      value: "₱125,430",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Total Orders",
      value: "342",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Products",
      value: "156",
      change: "+5",
      trend: "up",
      icon: Package,
      color: "text-purple-600",
    },
    {
      title: "Customers",
      value: "1,234",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-orange-600",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-20260110-00001",
      customer: "Juan Dela Cruz",
      total: "₱2,450",
      status: "pending",
      date: "Jan 10, 2026",
    },
    {
      id: "ORD-20260110-00002",
      customer: "Maria Santos",
      total: "₱1,890",
      status: "processing",
      date: "Jan 10, 2026",
    },
    {
      id: "ORD-20260109-00156",
      customer: "Pedro Reyes",
      total: "₱3,250",
      status: "shipped",
      date: "Jan 9, 2026",
    },
    {
      id: "ORD-20260109-00155",
      customer: "Ana Garcia",
      total: "₱1,500",
      status: "delivered",
      date: "Jan 9, 2026",
    },
  ];

  const lowStockItems = [
    { name: "Classic T-Shirt - Red (Size M)", stock: 3, threshold: 10 },
    { name: "Running Shoes - Black (Size 10)", stock: 5, threshold: 15 },
    { name: "Wireless Headphones", stock: 2, threshold: 8 },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "warning" as const,
      processing: "info" as const,
      shipped: "primary" as const,
      delivered: "success" as const,
      cancelled: "danger" as const,
    };
    return variants[status as keyof typeof variants] || "default";
  };

  return (
    <PageWrapper title="Dashboard" description="Welcome back! Here's an overview of your store.">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              content={
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-sm text-green-600">
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              }
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card
          title="Recent Orders"
          description="Latest orders from your store"
          content={
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{order.id}</p>
                      <Badge variant={getStatusBadge(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.customer}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{order.total}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          }
        />

        {/* Low Stock Alert */}
        <Card
          title="Low Stock Alert"
          description="Products that need restocking"
          content={
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 border border-orange-200 rounded-lg bg-orange-50"
                >
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Current stock:
                      </span>
                      <Badge variant="warning">{item.stock}</Badge>
                      <span className="text-xs text-muted-foreground">
                        / Threshold: {item.threshold}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      </div>
    </PageWrapper>
  );
}
