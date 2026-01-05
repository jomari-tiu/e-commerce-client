import * as React from "react";
import { format, isAfter, isBefore } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/utils/cn";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../@raw-shadcn/popover";
import { Calendar } from "../@raw-shadcn/calendar";

export type DatePickerMode = "single" | "range" | "multiple";

export type DatePickerValue<T extends DatePickerMode> = T extends "single"
  ? Date | undefined
  : T extends "range"
  ? DateRange | undefined
  : T extends "multiple"
  ? Date[] | undefined
  : never;

export type DatePickerFormatOptions = {
  /** Date format string (default: 'PPP' for single, 'PPP - PPP' for range) */
  format?: string;
  /** Return format for onValueChange callback */
  returnFormat?: "date" | "iso" | "timestamp" | "custom";
  /** Custom format string when returnFormat is 'custom' */
  customFormat?: string;
};

export type DatePickerProps<T extends DatePickerMode = "single"> = {
  /** Selection mode */
  mode?: T;
  /** Current value */
  value?: DatePickerValue<T>;
  /** Callback when value changes */
  onValueChange?: (
    value: DatePickerValue<T>,
    formatted?: string | string[]
  ) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disabled dates */
  disabledDates?: Date[] | ((date: Date) => boolean);
  /** Format options */
  formatOptions?: DatePickerFormatOptions;
  /** Show clear button */
  showClear?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Custom className */
  className?: string;
  /** Trigger className */
  triggerClassName?: string;
  /** Content className */
  contentClassName?: string;
  /** Popover align */
  align?: "start" | "center" | "end";
  /** Popover side */
  side?: "top" | "right" | "bottom" | "left";
  /** Show week numbers */
  showWeekNumbers?: boolean;
  /** Allow future dates */
  allowFuture?: boolean;
  /** Allow past dates */
  allowPast?: boolean;
};

export const DatePicker = <T extends DatePickerMode = "single">({
  mode = "single" as T,
  value,
  onValueChange,
  placeholder,
  minDate,
  maxDate,
  disabledDates,
  formatOptions = {},
  showClear = true,
  disabled = false,
  className,
  triggerClassName,
  contentClassName,
  align = "start",
  side = "bottom",
  showWeekNumbers = false,
  allowFuture = true,
  allowPast = true,
  ...props
}: DatePickerProps<T>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const {
    format: formatString,
    returnFormat = "date",
    customFormat,
  } = formatOptions;

  // Format value for display
  const formatDisplayValue = React.useCallback(
    (val: DatePickerValue<T>): string => {
      if (!val) return "";

      const displayFormat =
        formatString || (mode === "range" ? "PPP - PPP" : "PPP");

      try {
        if (mode === "single" && val instanceof Date) {
          return format(val, displayFormat);
        }

        if (
          mode === "range" &&
          val &&
          typeof val === "object" &&
          "from" in val
        ) {
          const range = val as DateRange;
          if (range.from && range.to) {
            const fromFormat = formatString ? formatString.split(" - ")[0]?.trim() || "PPP" : "PPP";
            const toFormat = formatString ? formatString.split(" - ")[1]?.trim() || "PPP" : "PPP";
            return `${format(range.from, fromFormat)} - ${format(range.to, toFormat)}`;
          } else if (range.from) {
            const fromFormat = formatString ? formatString.split(" - ")[0]?.trim() || "PPP" : "PPP";
            return format(range.from, fromFormat);
          }
        }

        if (mode === "multiple" && Array.isArray(val)) {
          const dateFormat = formatString || "PPP";
          return val.map((date) => format(date, dateFormat)).join(", ");
        }
      } catch (error) {
        console.warn("DatePicker: Error formatting display value:", error);
      }

      return "";
    },
    [mode, formatString]
  );

  // Format value for callback
  const formatReturnValue = React.useCallback(
    (val: DatePickerValue<T>) => {
      if (!val) return undefined;

      try {
        switch (returnFormat) {
          case "iso":
            if (mode === "single" && val instanceof Date) {
              return val.toISOString();
            }
            if (mode === "range" && typeof val === "object" && "from" in val) {
              const range = val as DateRange;
              return {
                from: range.from?.toISOString(),
                to: range.to?.toISOString(),
              };
            }
            if (mode === "multiple" && Array.isArray(val)) {
              return val.map((date) => date.toISOString());
            }
            break;

          case "timestamp":
            if (mode === "single" && val instanceof Date) {
              return val.getTime();
            }
            if (mode === "range" && typeof val === "object" && "from" in val) {
              const range = val as DateRange;
              return {
                from: range.from?.getTime(),
                to: range.to?.getTime(),
              };
            }
            if (mode === "multiple" && Array.isArray(val)) {
              return val.map((date) => date.getTime());
            }
            break;

          case "custom":
            if (!customFormat) break;
            if (mode === "single" && val instanceof Date) {
              return format(val, customFormat);
            }
            if (mode === "range" && typeof val === "object" && "from" in val) {
              const range = val as DateRange;
              return {
                from: range.from ? format(range.from, customFormat) : undefined,
                to: range.to ? format(range.to, customFormat) : undefined,
              };
            }
            if (mode === "multiple" && Array.isArray(val)) {
              return val.map((date) => format(date, customFormat));
            }
            break;

          case "date":
          default:
            return val;
        }
      } catch (error) {
        console.warn("DatePicker: Error formatting return value:", error);
      }

      return val;
    },
    [mode, returnFormat, customFormat]
  );

  // Check if date is disabled
  const isDateDisabled = React.useCallback(
    (date: Date): boolean => {
      if (!allowPast && isBefore(date, new Date())) return true;
      if (!allowFuture && isAfter(date, new Date())) return true;
      if (minDate && isBefore(date, minDate)) return true;
      if (maxDate && isAfter(date, maxDate)) return true;

      if (disabledDates) {
        if (Array.isArray(disabledDates)) {
          return disabledDates.some(
            (disabledDate) =>
              format(date, "yyyy-MM-dd") === format(disabledDate, "yyyy-MM-dd")
          );
        } else if (typeof disabledDates === "function") {
          return disabledDates(date);
        }
      }

      return false;
    },
    [allowPast, allowFuture, minDate, maxDate, disabledDates]
  );

  // Handle date selection
  const handleSelect = React.useCallback(
    (selectedValue: Date | DateRange | Date[] | undefined) => {
      if (!onValueChange) return;

      const typedValue = selectedValue as DatePickerValue<T>;
      const formattedValue = formatReturnValue(typedValue);

      onValueChange(typedValue, formattedValue as string | string[]);

      // Close popover for single mode
      if (mode === "single" && selectedValue) {
        setIsOpen(false);
      }
    },
    [mode, onValueChange, formatReturnValue]
  );

  // Handle clear
  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (onValueChange) {
        onValueChange(undefined as DatePickerValue<T>, undefined as any);
      }
    },
    [onValueChange]
  );

  const displayValue = value ? formatDisplayValue(value) : "";
  const hasValue = Boolean(displayValue);

  // Sync input value when value prop changes
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = displayValue;
    }
  }, [displayValue]);

  return (
    <div className={cn("relative", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "relative flex items-center w-full text-left bg-transparent border-none p-0",
              disabled && "cursor-not-allowed"
            )}
          >
            <div className="relative flex items-center w-full">
              <div className="absolute left-3 z-10 flex items-center justify-center text-gray-500 pointer-events-none">
                <CalendarIcon className="h-4 w-4" />
              </div>
              <input
                ref={inputRef}
                readOnly
                disabled={disabled}
                defaultValue={displayValue}
                placeholder={placeholder || "Pick a date"}
                className={cn(
                  "flex h-10 py-2 w-full rounded-md border border-gray-300 bg-background text-base ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm cursor-pointer",
                  "pl-10",
                  hasValue && showClear && !disabled ? "pr-10" : "pr-3",
                  !hasValue && "text-muted-foreground",
                  triggerClassName
                )}
                tabIndex={-1}
                onFocus={(e) => e.target.blur()}
                {...props}
              />
              {hasValue && showClear && !disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 z-20 flex items-center justify-center hover:bg-gray-100 rounded p-1"
                  aria-label="Clear selection"
                  tabIndex={-1}
                >
                  <X className="h-4 w-4 opacity-50 hover:opacity-100 transition-opacity" />
                </button>
              )}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-auto p-0", contentClassName)}
          align={align}
          side={side}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Calendar
            mode={mode as any}
            selected={value as any}
            onSelect={handleSelect as any}
            disabled={isDateDisabled}
            initialFocus
            showWeekNumber={showWeekNumbers}
            numberOfMonths={mode === "range" ? 2 : 1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

DatePicker.displayName = "DatePicker";
