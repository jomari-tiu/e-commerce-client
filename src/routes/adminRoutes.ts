import { createBrowserRouter, RouteObject } from "react-router";
import NotFoundPage from "@/pages/not-found/_page";
import AdminLayout from "@/pages/admin/admin-layout";
import { AiFillHome, AiFillProduct } from "react-icons/ai";
import ProductManagementPage from "@/pages/admin/product-management/_page";
import {
  MdBorderColor,
  MdInventory,
  MdOutlinePointOfSale,
  MdSettings,
  MdPeople,
} from "react-icons/md";
import InventoryManagementPage from "@/pages/admin/inventory-management/_page";
import OrderManagementPage from "@/pages/admin/order-management/_page";
import POSPage from "@/pages/admin/pos/_page";
import StaffManagementPage from "@/pages/admin/staff-management/_page";
import SettingsPage from "@/pages/admin/settings/_page";
import DashboardPage from "@/pages/admin/dashboard/_page";
import ComponentSandbox from "@/components/ComponentSandbox";

type SidebarMenuItem = RouteObject & {
  label: string;
  Icon: React.ElementType;
};

export const adminRoutesConfig: SidebarMenuItem[] = [
  {
    label: "Dashboard",
    Icon: AiFillHome,
    path: "/admin/dashboard",
    Component: DashboardPage,
  },
  {
    label: "Products",
    Icon: AiFillProduct,
    path: "/admin/products",
    Component: ProductManagementPage,
  },
  {
    label: "Inventory",
    Icon: MdInventory,
    path: "/admin/inventory",
    Component: InventoryManagementPage,
  },
  {
    label: "Orders",
    Icon: MdBorderColor,
    path: "/admin/orders",
    Component: OrderManagementPage,
  },
  {
    label: "POS",
    Icon: MdOutlinePointOfSale,
    path: "/admin/pos",
    Component: POSPage,
  },
  {
    label: "Staff",
    Icon: MdPeople,
    path: "/admin/staff",
    Component: StaffManagementPage,
  },
  {
    label: "Settings",
    Icon: MdSettings,
    path: "/admin/settings",
    Component: SettingsPage,
  },
  {
    label: "Sandbox",
    Icon: MdSettings,
    path: "/admin/sandbox",
    Component: ComponentSandbox,
  },
];

export const adminRoutes = createBrowserRouter([
  {
    path: "/admin",
    Component: AdminLayout,
    children: adminRoutesConfig.map((item) => ({
      path: item.path,
      Component: item.Component as React.ComponentType<any>,
    })),
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
