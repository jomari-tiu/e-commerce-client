import { createBrowserRouter } from "react-router";
import NotFoundPage from "@/pages/not-found/_page";
import AdminLayout from "@/pages/admin/admin-layout";
import LandingPage from "@/pages/website/landing-page/_page";
import ProductDetailPage from "@/pages/website/[product-detail]/_page";
import CartPage from "@/pages/website/cart/_page";
import CheckoutPage from "@/pages/website/checkout/_page";
import OrderTrackingPage from "@/pages/website/order-tracking/_page";
import LoginPage from "@/pages/auth/login/_page";
import RegisterPage from "@/pages/auth/register/_page";
import AdminLoginPage from "@/pages/admin/login/_page";
import DashboardPage from "@/pages/admin/dashboard/_page";
import ProductManagementPage from "@/pages/admin/product-management/_page";
import InventoryManagementPage from "@/pages/admin/inventory-management/_page";
import OrderManagementPage from "@/pages/admin/order-management/_page";
import POSPage from "@/pages/admin/pos/_page";
import StaffManagementPage from "@/pages/admin/staff-management/_page";
import SettingsPage from "@/pages/admin/settings/_page";
import ComponentSandbox from "@/components/ComponentSandbox";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/product/:uuid",
    Component: ProductDetailPage,
  },
  {
    path: "/cart",
    Component: CartPage,
  },
  {
    path: "/checkout",
    Component: CheckoutPage,
  },
  {
    path: "/orders/track",
    Component: OrderTrackingPage,
  },
  {
    path: "/admin/login",
    Component: AdminLoginPage,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "dashboard",
        Component: DashboardPage,
      },
      {
        path: "products",
        Component: ProductManagementPage,
      },
      {
        path: "inventory",
        Component: InventoryManagementPage,
      },
      {
        path: "orders",
        Component: OrderManagementPage,
      },
      {
        path: "pos",
        Component: POSPage,
      },
      {
        path: "staff",
        Component: StaffManagementPage,
      },
      {
        path: "settings",
        Component: SettingsPage,
      },
      {
        path: "sandbox",
        Component: ComponentSandbox,
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
