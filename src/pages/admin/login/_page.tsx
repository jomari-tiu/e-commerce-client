import AdminLoginFormContainer from "./forms/LoginFormContainer";
import { Card } from "@/components/ui";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Admin Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to access the admin panel
          </p>
        </div>
        <AdminLoginFormContainer />
      </Card>
    </div>
  );
}
