import { useTypedFormFields } from "@/components";
import { LoginFormType } from "../../types/authSchema";

export default function LoginFormFields() {
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
