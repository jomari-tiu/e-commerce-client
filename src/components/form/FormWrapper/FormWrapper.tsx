import React from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui";

// Generic type for form wrapper props
type FormWrapperProps<T extends z.ZodType<any, any, any>> = {
  schema: T;
  defaultValues?: Partial<z.infer<T>>;
  onSubmit: SubmitHandler<z.infer<T>>;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  resetOnSubmit?: boolean;
};

const FormWrapper = <T extends z.ZodType<any, any, any>>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className = "space-y-4",
  isLoading = false,
  resetOnSubmit = false,
}: FormWrapperProps<T>) => {
  const { error: showErrorToast } = useToast();

  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as z.infer<T>,
    mode: "onChange",
  });

  const handleSubmit: SubmitHandler<z.infer<T>> = async (data) => {
    try {
      await onSubmit(data);
      if (resetOnSubmit) {
        methods.reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showErrorToast(
        "Form Submission Failed",
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className={className}>
        <fieldset
          disabled={isLoading}
          className={
            isLoading ? "opacity-50 cursor-not-allowed animate-pulse" : ""
          }
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};

export default FormWrapper;

export type { FormWrapperProps };
