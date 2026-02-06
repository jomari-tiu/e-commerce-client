import { RouterProvider } from "react-router";
import { adminRoutes } from "./routes/adminRoutes";
import { publicRoutes } from "./routes/publicRoutes";

function App() {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const router = isAdminRoute ? adminRoutes : publicRoutes;

  return (
    <div className="h-screen w-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
