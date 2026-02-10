import { useTypedFormFields } from "@/components";
import { RegisterFormType } from "../../types/authSchema";

export default function RegisterFormFields() {
  const { FormInput } = useTypedFormFields<RegisterFormType>();
  return (
    <>
      <FormInput
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
        autoComplete="given-name"
      />
      <FormInput
        name="lastName"
        label="Last Name"
        placeholder="Enter your last name"
        autoComplete="family-name"
      />
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
        placeholder="Enter your password (min. 6 characters)"
        autoComplete="new-password"
      />
      <FormInput
        name="phone"
        label="Phone (Optional)"
        type="tel"
        placeholder="Enter your phone number"
        autoComplete="tel"
      />
    </>
  );
}
