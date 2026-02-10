import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import { Outlet } from "react-router";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AdminLayout() {
  return (
    <ProtectedRoute requireStaff={true}>
      <main className="flex h-full">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <Outlet />
        </main>
      </main>
    </ProtectedRoute>
  );
}
