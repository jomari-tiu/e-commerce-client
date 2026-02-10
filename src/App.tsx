import { RouterProvider } from "react-router";
import { router } from "./routes";

function App() {
  return (
    <div className="h-screen w-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
