import * as React from 'react';
import { DatePicker, DatePickerProps } from './DatePicker';

export type MultipleDatePickerProps = Omit<
  DatePickerProps<'multiple'>,
  'mode'
> & {
  value?: Date[];
  onValueChange?: (
    dates: Date[] | undefined,
    formatted?: string | string[]
  ) => void;
  /** Maximum number of dates that can be selected */
  maxDates?: number;
  /** Minimum number of dates that must be selected */
  minDates?: number;
};

export const MultipleDatePicker = React.forwardRef<
  HTMLInputElement,
  MultipleDatePickerProps
>(({ maxDates, minDates, onValueChange, value, ...props }, _ref) => {
  const handleValueChange = React.useCallback(
    (dates: Date[] | undefined, formatted?: string | string[]) => {
      // If dates is undefined (clearing), pass it through immediately
      if (!dates) {
        onValueChange?.(dates, formatted);
        return;
      }

      // Validate constraints only when we have dates
      if (maxDates && dates.length > maxDates) {
        console.warn(
          `MultipleDatePicker: Selected dates exceed maximum of ${maxDates}`
        );
        return;
      }

      if (minDates && dates.length < minDates) {
        console.warn(
          `MultipleDatePicker: Selected dates are less than minimum of ${minDates}`
        );
        // Don't return here as user might still be selecting
      }

      onValueChange?.(dates, formatted);
    },
    [maxDates, minDates, onValueChange]
  );

  return (
    <DatePicker
      mode="multiple"
      value={value}
      onValueChange={handleValueChange}
      placeholder="Pick multiple dates"
      {...props}
    />
  );
});

MultipleDatePicker.displayName = 'MultipleDatePicker';
