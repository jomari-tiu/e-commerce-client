/**
 * User Story: As a user filling out a form, I want to enter numeric data
 * with support for leading zeros and formatted thousand separators,
 * so that I can input financial values, phone numbers, and IDs clearly.
 */

import {
  useFormContext,
  Controller,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { Input, Text } from '../ui';
import { InputHTMLAttributes, useState, useEffect, useRef } from 'react';

type NumberInputFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  allowLeadingZero?: boolean;
  thousandSeperator?: boolean;
  autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete'];
  disabled?: boolean;
  readOnly?: boolean;
};

export const FormNumberInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  allowLeadingZero = false,
  thousandSeperator = false,
  autoComplete,
  disabled,
  readOnly,
}: NumberInputFieldProps<T>) => {
  const { control } = useFormContext();

  // Format number with thousand separators
  const formatWithSeparators = (value: string): string => {
    if (!value) return '';
    
    // Split into integer and decimal parts
    const parts = value.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];
    
    // Add thousand separators to integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Combine with decimal part if exists
    return decimalPart !== undefined 
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  };

  // Remove thousand separators for storage
  const removeFormatting = (value: string): string => {
    return value.replace(/,/g, '');
  };

  // Validate and clean numeric input
  const cleanNumericInput = (value: string): string => {
    // Allow only digits, single decimal point, and minus sign at start
    let cleaned = value.replace(/[^\d.-]/g, '');
    
    // Handle minus sign - only allow at the start
    const hasMinusAtStart = cleaned.startsWith('-');
    cleaned = cleaned.replace(/-/g, '');
    if (hasMinusAtStart) {
      cleaned = '-' + cleaned;
    }
    
    // Handle decimal point - only allow one
    const decimalIndex = cleaned.indexOf('.');
    if (decimalIndex !== -1) {
      const beforeDecimal = cleaned.substring(0, decimalIndex);
      const afterDecimal = cleaned.substring(decimalIndex + 1).replace(/\./g, '');
      cleaned = beforeDecimal + '.' + afterDecimal;
    }
    
    return cleaned;
  };

  // Convert to final value based on allowLeadingZero
  const convertToFinalValue = (value: string): string | number | undefined => {
    if (value === '' || value === '-' || value === '.') {
      return undefined;
    }

    const cleanValue = removeFormatting(value);
    
    if (allowLeadingZero) {
      // Keep as string to preserve leading zeros
      return cleanValue;
    } else {
      // Convert to number, which strips leading zeros
      const numValue = Number(cleanValue);
      return isNaN(numValue) ? undefined : numValue;
    }
  };

  return (
    <div className="mb-2">
      {label && (
        <label className="block mb-1 font-medium">
          <Text size="sm" color="accent">
            {label}
          </Text>
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, ...field }, fieldState }) => {
          // Local state for display value with formatting
          const [displayValue, setDisplayValue] = useState<string>(() => {
            if (value === undefined || value === null) return '';
            const strValue = String(value);
            return thousandSeperator ? formatWithSeparators(strValue) : strValue;
          });

          // Track if user is actively typing to prevent sync conflicts
          const isTypingRef = useRef(false);

          // Update display value when form value changes externally (not from user input)
          useEffect(() => {
            // Only sync if user is not actively typing
            if (!isTypingRef.current) {
              if (value === undefined || value === null) {
                setDisplayValue('');
              } else {
                const strValue = String(value);
                setDisplayValue(thousandSeperator ? formatWithSeparators(strValue) : strValue);
              }
            }
            // Reset typing flag after sync
            isTypingRef.current = false;
          }, [value]);

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // Mark that user is typing
            isTypingRef.current = true;
            
            const inputValue = e.target.value;
            
            // Clean the input
            const cleaned = cleanNumericInput(removeFormatting(inputValue));
            
            // Update display value with formatting if needed
            const formatted = thousandSeperator ? formatWithSeparators(cleaned) : cleaned;
            setDisplayValue(formatted);
            
            // Convert and store the final value
            const finalValue = convertToFinalValue(cleaned);
            onChange(finalValue);
          };

          return (
            <>
              <Input
                {...field}
                value={displayValue}
                onChange={handleChange}
                type="text"
                inputMode="decimal"
                placeholder={placeholder}
                autoComplete={autoComplete}
                disabled={disabled}
                readOnly={readOnly}
                className={`w-full rounded border p-2 ${
                  fieldState.error ? 'border-red-500' : 'border-gray-300'
                }`}
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

