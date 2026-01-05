/**
 * User Story: As a user filling out a form, I want to select dates using a calendar picker
 * with support for single dates, date ranges, and multiple dates, so that I can provide
 * date information efficiently. The date picker should show validation errors and integrate
 * seamlessly with form validation.
 */

import {
  useFormContext,
  Controller,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { DateRange } from 'react-day-picker';
import { DatePicker, DatePickerProps, DatePickerMode } from '../ui/DatePicker';
import { Text } from '../ui';

type FormDatePickerProps<
  T extends FieldValues,
  M extends DatePickerMode = 'single'
> = {
  name: FieldPath<T>;
  label?: string;
  mode?: M;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  // DatePicker specific props
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[] | ((date: Date) => boolean);
  formatOptions?: DatePickerProps<M>['formatOptions'];
  showClear?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  showWeekNumbers?: boolean;
  allowFuture?: boolean;
  allowPast?: boolean;
};

export const FormDatePicker = <
  T extends FieldValues,
  M extends DatePickerMode = 'single'
>({
  name,
  label,
  mode = 'single' as M,
  placeholder,
  disabled = false,
  className,
  minDate,
  maxDate,
  disabledDates,
  formatOptions,
  showClear = true,
  triggerClassName,
  contentClassName,
  align,
  side,
  showWeekNumbers,
  allowFuture,
  allowPast,
}: FormDatePickerProps<T, M>) => {
  const { control } = useFormContext();

  return (
    <div className={`mb-4 ${className || ''}`}>
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
        render={({ field, fieldState }) => {
          // Type-safe value handling based on mode
          const getValue = () => {
            if (mode === 'single') {
              return field.value as Date | undefined;
            } else if (mode === 'range') {
              return field.value as DateRange | undefined;
            } else if (mode === 'multiple') {
              return field.value as Date[] | undefined;
            }
            return field.value;
          };

          return (
            <>
              <DatePicker
                mode={mode}
                value={getValue() as any}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                placeholder={placeholder}
                disabled={disabled}
                minDate={minDate}
                maxDate={maxDate}
                disabledDates={disabledDates}
                formatOptions={formatOptions}
                showClear={showClear}
                triggerClassName={
                  fieldState.error
                    ? `border-red-500 ${triggerClassName || ''}`
                    : triggerClassName
                }
                contentClassName={contentClassName}
                align={align}
                side={side}
                showWeekNumbers={showWeekNumbers}
                allowFuture={allowFuture}
                allowPast={allowPast}
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

