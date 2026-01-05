import * as React from 'react';
import { addDays, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { SingleDatePicker } from './SingleDatePicker';
import { DateRangePicker } from './DateRangePicker';
import { MultipleDatePicker } from './MultipleDatePicker';

export const DatePickerExample = () => {
  const [singleDate, setSingleDate] = React.useState<Date | undefined>();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [multipleDates, setMultipleDates] = React.useState<
    Date[] | undefined
  >();
  const [restrictedDate, setRestrictedDate] = React.useState<
    Date | undefined
  >();

  return (
    <div className="space-y-8 p-6 max-w-2xl">
      <h2 className="text-2xl font-bold">DatePicker Examples</h2>

      {/* Basic Single Date Picker */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Single Date Picker</h3>
        <SingleDatePicker
          value={singleDate}
          onValueChange={(date, formatted) => {
            setSingleDate(date);
            console.log('Single date:', { date, formatted });
          }}
          placeholder="Select a date"
        />
        {singleDate && (
          <p className="text-sm text-gray-600">
            Selected: {singleDate.toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Date Range Picker */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Date Range Picker</h3>
        <DateRangePicker
          value={dateRange}
          onValueChange={(range, formatted) => {
            setDateRange(range);
            console.log('Date range:', { range, formatted });
          }}
          // maxDays={30}
          formatOptions={{
            returnFormat: 'iso',
          }}
        />
        {dateRange?.from && (
          <p className="text-sm text-gray-600">
            Range: {dateRange.from.toLocaleDateString()}
            {dateRange.to && ` - ${dateRange.to.toLocaleDateString()}`}
          </p>
        )}
      </div>

      {/* Multiple Date Picker */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Multiple Date Picker</h3>
        <MultipleDatePicker
          value={multipleDates}
          onValueChange={(dates, formatted) => {
            setMultipleDates(dates);
            console.log('Multiple dates:', { dates, formatted });
          }}
          maxDates={5}
          formatOptions={{
            returnFormat: 'timestamp',
          }}
        />
        {multipleDates && multipleDates.length > 0 && (
          <p className="text-sm text-gray-600">
            Selected {multipleDates.length} dates:{' '}
            {multipleDates.map(date => date.toLocaleDateString()).join(', ')}
          </p>
        )}
      </div>

      {/* Restricted Date Picker */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Restricted Date Picker</h3>
        <p className="text-sm text-gray-600">
          Only allows dates from 7 days ago to 30 days in the future
        </p>
        <SingleDatePicker
          value={restrictedDate}
          onValueChange={(date, formatted) => {
            setRestrictedDate(date);
            console.log('Restricted date:', { date, formatted });
          }}
          minDate={subDays(new Date(), 7)}
          maxDate={addDays(new Date(), 30)}
          placeholder="Select within range"
        />
        {restrictedDate && (
          <p className="text-sm text-gray-600">
            Selected: {restrictedDate.toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Custom Format Example */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Custom Format</h3>
        <SingleDatePicker
          onValueChange={(date, formatted) => {
            console.log('Custom format:', { date, formatted });
          }}
          formatOptions={{
            format: 'dd/MM/yyyy',
            returnFormat: 'custom',
            customFormat: 'yyyy-MM-dd',
          }}
          placeholder="DD/MM/YYYY format"
        />
      </div>

      {/* Disabled Dates Example */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Disabled Weekends</h3>
        <SingleDatePicker
          onValueChange={(date, formatted) => {
            console.log('Weekday only:', { date, formatted });
          }}
          disabledDates={date => {
            const day = date.getDay();
            return day === 0 || day === 6; // Disable Sunday (0) and Saturday (6)
          }}
          placeholder="Weekdays only"
        />
      </div>

      {/* No Clear Button Example */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">No Clear Button</h3>
        <SingleDatePicker
          onValueChange={(date, formatted) => {
            console.log('No clear:', { date, formatted });
          }}
          showClear={false}
          placeholder="Cannot clear selection"
        />
      </div>

      {/* Different Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Examples</h3>
        <div className="flex flex-wrap gap-4">
          <SingleDatePicker placeholder="Basic DatePicker" />
          <SingleDatePicker placeholder="Another Example" />
          <SingleDatePicker placeholder="Third Example" />
          <SingleDatePicker placeholder="Fourth Example" />
        </div>
      </div>
    </div>
  );
};
