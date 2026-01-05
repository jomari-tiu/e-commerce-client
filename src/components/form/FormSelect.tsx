import {
  useFormContext,
  Controller,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { Select, SelectOption, SelectValue } from '../ui/Select';

type SelectFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  className?: string;
  returnFullObject?: boolean; // If true, returns {value, label} object; if false, returns just the value string
};

export const FormSelect = <T extends FieldValues>({
  name,
  label,
  placeholder = 'Select an option...',
  options,
  disabled = false,
  className,
  returnFullObject = false,
}: SelectFieldProps<T>) => {
  const { control } = useFormContext();

  return (
    <div className={`mb-4 ${className || ''}`}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          // Convert the form value to SelectValue object for display
          const selectValue: SelectValue | null = field.value
            ? typeof field.value === 'string'
              ? (() => {
                  const option = options.find(opt => opt.value === field.value);
                  return option
                    ? { value: option.value, label: option.label }
                    : null;
                })()
              : field.value
            : null;

          const handleChange = (selectedOption: SelectValue | null) => {
            if (returnFullObject) {
              // Store the full object in the form
              field.onChange(selectedOption);
            } else {
              // Store only the value string (backward compatibility)
              field.onChange(selectedOption?.value || '');
            }
          };

          return (
            <>
              <Select
                label={label}
                placeholder={placeholder}
                options={options}
                value={selectValue}
                onValueChange={handleChange}
                disabled={disabled}
                className={fieldState.error ? 'border-red-500' : ''}
              />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};
