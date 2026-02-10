import { useTypedFormFields } from "@/components";
import { LoginFormType } from "@/pages/auth/types/authSchema";

export default function AdminLoginFormFields() {
  const { FormInput } = useTypedFormFields<LoginFormType>();
  return (
    <>
      <FormInput
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        autoComplete="email"
      />
      <FormInput
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        autoComplete="current-password"
      />
    </>
  );
}
