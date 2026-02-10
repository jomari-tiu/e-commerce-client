import { Button, FormWrapper, useToast } from "@/components";
import { loginSchema, LoginFormType } from "../../types/authSchema";
import LoginFormFields from "./LoginFormFields";
import { useMutate } from "@/lib/query";
import Cookie from "js-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginFormContainer() {
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  const loginMutation = useMutate<LoginFormType>({
    method: "post",
    url: "/api/auth/login",
    requireAuth: false,
    success: (response: any) => {
      // API returns { success: true, data: { token, user, type }, message }
      const authData = response?.data?.data || response?.data;
      if (authData?.token) {
        Cookie.set("_token", authData.token, { expires: 1 }); // 1 day expiration
        success("Login Successful", "You have been logged in successfully.");
        
        // Redirect to return URL if available, otherwise use default logic
        if (returnUrl) {
          navigate(returnUrl);
        } else {
          // Redirect based on user type
          if (authData.type === "staff") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }
      }
    },
    error: (err: any) => {
      const errorMessage =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Login failed. Please try again.";
      error("Login Failed", errorMessage);
    },
  });

  const handleSubmit = (data: LoginFormType) => {
    // Always set type to "customer" for customer login
    loginMutation.mutate({ ...data, type: "customer" });
  };

  return (
    <FormWrapper
      schema={loginSchema}
      defaultValues={{ type: "customer" }}
      onSubmit={handleSubmit}
      isLoading={loginMutation.isPending}
    >
      <LoginFormFields />
      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="primary"
          type="submit"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </div>
    </FormWrapper>
  );
}
