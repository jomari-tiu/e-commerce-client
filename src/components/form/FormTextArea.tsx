import {
  useFormContext,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Textarea } from "../ui/@raw-shadcn/textarea";
import { Text } from "../ui";

type TextareaFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  showCharCount?: boolean;
};

export const FormTextarea = <T extends FieldValues>({
  name,
  label,
  placeholder,
  rows = 3,
  disabled = false,
  className,
  maxLength,
  showCharCount = false,
}: TextareaFieldProps<T>) => {
  const { control } = useFormContext();

  return (
    <div className={`mb-4 ${className || ""}`}>
      {label && (
        <label className="block mb-1 font-medium text-gray-700">
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
            <Textarea
              {...field}
              placeholder={placeholder}
              rows={rows}
              disabled={disabled}
              maxLength={maxLength}
              className={`w-full ${
                fieldState.error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : ""
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
              {showCharCount && maxLength && (
                <p className="text-xs text-gray-500 ml-auto">
                  {field.value?.length || 0}/{maxLength}
                </p>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
};
