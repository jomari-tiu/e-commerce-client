/**
 * User Story: As a user filling out a form, I want to check/uncheck boxes for boolean
 * options (like accepting terms, enabling notifications, etc.), so that I can indicate
 * my preferences clearly. The checkbox should show validation errors and integrate
 * seamlessly with form validation.
 */

import {
  useFormContext,
  Controller,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import Checkbox from '../ui/Checkbox/Checkbox';
import { Text } from '../ui';

type CheckboxFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
};

export const FormCheckbox = <T extends FieldValues>({
  name,
  label,
  description,
  disabled = false,
  className,
}: CheckboxFieldProps<T>) => {
  const { control } = useFormContext();

  return (
    <div className={`mb-4 ${className || ''}`}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className="flex items-start space-x-3">
              <Checkbox
                id={name}
                checked={field.value || false}
                onCheckedChange={field.onChange}
                disabled={disabled}
                className={fieldState.error ? 'border-red-500' : ''}
              />
              <div className="grid gap-1.5 leading-none">
                {label && (
                  <label
                    htmlFor={name}
                    className="text-sm font-medium text-gray-700 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Text size="sm" color="accent">
                      {label}
                    </Text>
                  </label>
                )}
                {description && (
                  <p className="text-xs text-gray-500">{description}</p>
                )}
              </div>
            </div>
            {fieldState.error && (
              <p className="text-sm text-red-500 mt-2 ml-7">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};
