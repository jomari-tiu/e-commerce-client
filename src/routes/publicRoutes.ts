import { createBrowserRouter } from "react-router";
import NotFoundPage from "@/pages/not-found/_page";
import LandingPage from "@/pages/website/landing-page/_page";
import ProductDetailPage from "@/pages/website/[product-detail]/_page";

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
    path: "*",
    Component: NotFoundPage,
  },
]);
