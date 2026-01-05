import { useState } from 'react';
import { SingleDatePicker } from './ui/DatePicker';
import { Card } from './ui/@raw-shadcn/card';

export const DatePickerClearTest = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="p-6 space-y-4">
      <Card
        title="Clear Button Test"
        description="Test the clear button functionality"
        content={
          <div className="space-y-4">
            <SingleDatePicker
              value={date}
              onValueChange={(newDate) => {
                console.log('Date changed:', newDate);
                setDate(newDate);
              }}
              placeholder="Select a date"
              showClear={true}
            />
            <div className="text-sm text-gray-600">
              <p>Current value: {date ? date.toLocaleDateString() : 'No date selected'}</p>
              <p>Value type: {date ? typeof date : 'undefined'}</p>
            </div>
            <button
              onClick={() => setDate(new Date())}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Set to Today
            </button>
            <button
              onClick={() => setDate(undefined)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
            >
              Clear Programmatically
            </button>
          </div>
        }
      />
    </div>
  );
};

