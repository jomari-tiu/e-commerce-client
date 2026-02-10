import { createBrowserRouter } from "react-router";
import NotFoundPage from "@/pages/not-found/_page";
import LandingPage from "@/pages/website/landing-page/_page";
import ProductDetailPage from "@/pages/website/[product-detail]/_page";
import CartPage from "@/pages/website/cart/_page";
import CheckoutPage from "@/pages/website/checkout/_page";
import OrderTrackingPage from "@/pages/website/order-tracking/_page";
import LoginPage from "@/pages/auth/login/_page";
import RegisterPage from "@/pages/auth/register/_page";
import AdminLoginPage from "@/pages/admin/login/_page";

export const publicRoutes = createBrowserRouter([
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
    path: "/admin/login",
    Component: AdminLoginPage,
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
    path: "*",
    Component: NotFoundPage,
  },
]);
