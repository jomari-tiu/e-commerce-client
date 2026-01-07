import ComponentSandbox from "@/components/ComponentSandbox";
import { createBrowserRouter } from "react-router";
import NotFoundPage from "@/pages/not-found/_page";

export const adminRoutes = createBrowserRouter([
  {
    path: "/sandbox",
    Component: ComponentSandbox,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
