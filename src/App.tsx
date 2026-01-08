import { RouterProvider } from "react-router";
import { adminRoutes } from "./routes/adminRoutes";
// import { publicRoutes } from "./routes/publicRoutes";
function App() {
  return (
    <div className="h-screen w-full">
      <RouterProvider router={adminRoutes} />
    </div>
  );
}

export default App;
