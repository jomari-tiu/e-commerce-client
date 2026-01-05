import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { DatePicker, DatePickerProps } from './DatePicker';

export type DateRangePickerProps = Omit<DatePickerProps<'range'>, 'mode'> & {
  value?: DateRange;
  onValueChange?: (
    range: DateRange | undefined,
    formatted?: string | string[]
  ) => void;
  /** Maximum number of days that can be selected */
  maxDays?: number;
  /** Minimum number of days that must be selected */
  minDays?: number;
};

export const DateRangePicker = React.forwardRef<
  HTMLInputElement,
  DateRangePickerProps
>(({ maxDays, minDays, onValueChange, value, ...props }, _ref) => {
  const handleValueChange = React.useCallback(
    (range: DateRange | undefined, formatted?: string | string[]) => {
      // If range is undefined (clearing), pass it through immediately
      if (!range) {
        onValueChange?.(range, formatted);
        return;
      }

      // Validate range constraints only when we have a complete range
      if (range.from && range.to) {
        const daysDiff = Math.ceil(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (maxDays && daysDiff > maxDays) {
          console.warn(
            `DateRangePicker: Selected range exceeds maximum of ${maxDays} days`
          );
          return;
        }

        if (minDays && daysDiff < minDays) {
          console.warn(
            `DateRangePicker: Selected range is less than minimum of ${minDays} days`
          );
          return;
        }
      }

      onValueChange?.(range, formatted);
    },
    [maxDays, minDays, onValueChange]
  );

  return (
    <DatePicker
      mode="range"
      value={value}
      onValueChange={handleValueChange}
      placeholder="Pick a date range"
      {...props}
    />
  );
});

DateRangePicker.displayName = 'DateRangePicker';
