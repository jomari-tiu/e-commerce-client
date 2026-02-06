import { createBrowserRouter } from "react-router";
import NotFoundPage from "@/pages/not-found/_page";
import LandingPage from "@/pages/website/landing-page/_page";
import ProductDetailPage from "@/pages/website/[product-detail]/_page";
import CartPage from "@/pages/website/cart/_page";
import CheckoutPage from "@/pages/website/checkout/_page";
import OrderTrackingPage from "@/pages/website/order-tracking/_page";

export const publicRoutes = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
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
