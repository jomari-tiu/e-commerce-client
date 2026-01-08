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
} from "react-icons/md";
import InventoryManagementPage from "@/pages/admin/inventory-management/_page";
import { WorkInProgress } from "@/components";
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
    Component: WorkInProgress,
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
    Component: WorkInProgress,
  },
  {
    label: "POS",
    Icon: MdOutlinePointOfSale,
    path: "/admin/pos",
    Component: WorkInProgress,
  },
  {
    label: "Settings",
    Icon: MdSettings,
    path: "/admin/settings",
    Component: WorkInProgress,
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
