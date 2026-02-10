import { Button, FormWrapper, useToast } from "@/components";
import { registerSchema, RegisterFormType } from "../../types/authSchema";
import RegisterFormFields from "./RegisterFormFields";
import { useMutate } from "@/lib/query";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function RegisterFormContainer() {
  const { success, error } = useToast();
  const navigate = useNavigate();

  const registerMutation = useMutate<RegisterFormType>({
    method: "post",
    url: "/api/auth/register",
    requireAuth: false,
    success: (response: any) => {
      // API returns { success: true, data: { token, user, type }, message }
      const authData = response?.data?.data || response?.data;
      if (authData?.token) {
        Cookie.set("_token", authData.token, { expires: 1 }); // 1 day expiration
        success(
          "Registration Successful",
          "Your account has been created successfully."
        );
        navigate("/");
      }
    },
    error: (err: any) => {
      const errorMessage =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Registration failed. Please try again.";
      error("Registration Failed", errorMessage);
    },
  });

  const handleSubmit = (data: RegisterFormType) => {
    registerMutation.mutate(data);
  };

  return (
    <FormWrapper
      schema={registerSchema}
      onSubmit={handleSubmit}
      isLoading={registerMutation.isPending}
    >
      <RegisterFormFields />
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="primary" type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Registering..." : "Register"}
        </Button>
      </div>
    </FormWrapper>
  );
}
