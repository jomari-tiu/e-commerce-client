import {
  useFormContext,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import RadioGroup from "../ui/RadioButton/RadioGroup";
import { Text } from "../ui";

type RadioOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

type RadioGroupFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  options: RadioOption[];
  disabled?: boolean;
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export const FormRadioGroup = <T extends FieldValues>({
  name,
  label,
  options,
  disabled = false,
  className,
  orientation = "vertical",
}: RadioGroupFieldProps<T>) => {
  const { control } = useFormContext();

  return (
    <div className={`mb-4 ${className || ""}`}>
      {label && (
        <label className="block mb-3 font-medium text-gray-700">
          <Text size="sm" color="accent">
            {label}
          </Text>
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <RadioGroup
              options={options}
              onValueChange={field.onChange}
              value={field.value || ""}
              disabled={disabled}
              className={
                orientation === "horizontal"
                  ? "flex flex-wrap gap-6"
                  : "grid gap-3"
              }
            />
            {fieldState.error && (
              <p className="text-sm text-red-500 mt-2">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};
