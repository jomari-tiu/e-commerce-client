import * as React from 'react';
import { DatePicker, DatePickerProps } from './DatePicker';

export type SingleDatePickerProps = Omit<DatePickerProps<'single'>, 'mode'> & {
  value?: Date;
  onValueChange?: (date: Date | undefined, formatted?: string) => void;
};

export const SingleDatePicker = React.forwardRef<
  HTMLInputElement,
  SingleDatePickerProps
>(({ ...props }, _ref) => {
  return <DatePicker mode="single" {...props} />;
});

SingleDatePicker.displayName = 'SingleDatePicker';
