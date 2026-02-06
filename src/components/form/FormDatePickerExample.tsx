import { z } from 'zod';
import { useState } from 'react';
import FormWrapper from './FormWrapper/FormWrapper';
import { useTypedFormFields } from './FormWrapper/useTypedFormFields';
import { Button, useToast } from '../ui';
import type { DateRange as _DateRange } from 'react-day-picker';

// Schema for single date example
const singleDateFormSchema = z.object({
  birthDate: z.date({
    required_error: 'Please select your birth date',
  }),
  appointmentDate: z.date().optional(),
});

type SingleDateFormData = z.infer<typeof singleDateFormSchema>;

// Schema for date range example
const dateRangeFormSchema = z.object({
  vacationDates: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .refine((data) => data.from !== undefined, {
      message: 'Please select a start date',
    }),
});

type DateRangeFormData = z.infer<typeof dateRangeFormSchema>;

// Schema for multiple dates example
const multipleDatesFormSchema = z.object({
  meetingDates: z
    .array(z.date())
    .min(1, 'Please select at least one meeting date')
    .max(5, 'You can select up to 5 meeting dates'),
});

type MultipleDatesFormData = z.infer<typeof multipleDatesFormSchema>;

// Single Date Form
const SingleDateForm = () => {
  const { FormDatePicker } = useTypedFormFields<SingleDateFormData>();

  return (
    <>
      <FormDatePicker
        name="birthDate"
        label="Birth Date"
        placeholder="Select your birth date"
        maxDate={new Date()}
        showClear={true}
      />
      <FormDatePicker
        name="appointmentDate"
        label="Appointment Date (Optional)"
        placeholder="Select appointment date"
        minDate={new Date()}
        disabledDates={(date) => {
          const day = date.getDay();
          return day === 0 || day === 6; // Disable weekends
        }}
      />
    </>
  );
};

// Date Range Form
const DateRangeForm = () => {
  const { FormDatePicker } = useTypedFormFields<DateRangeFormData>();

  return (
    <>
      <FormDatePicker
        name="vacationDates"
        label="Vacation Dates"
        placeholder="Select vacation date range"
        mode="range"
        minDate={new Date()}
        showClear={true}
      />
    </>
  );
};

// Multiple Dates Form
const MultipleDatesForm = () => {
  const { FormDatePicker } = useTypedFormFields<MultipleDatesFormData>();

  return (
    <>
      <FormDatePicker
        name="meetingDates"
        label="Meeting Dates (Select 1-5 dates)"
        placeholder="Select multiple meeting dates"
        mode="multiple"
        minDate={new Date()}
        showClear={true}
      />
    </>
  );
};

export const FormDatePickerExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { success } = useToast();

  const handleSingleDateSubmit = async (data: SingleDateFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Single date form:', data);
    success('Success!', 'Single date form submitted successfully!');
    setIsLoading(false);
  };

  const handleDateRangeSubmit = async (data: DateRangeFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Date range form:', data);
    success('Success!', 'Date range form submitted successfully!');
    setIsLoading(false);
  };

  const handleMultipleDatesSubmit = async (data: MultipleDatesFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Multiple dates form:', data);
    success('Success!', 'Multiple dates form submitted successfully!');
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">FormDatePicker Examples</h2>
        <p className="text-gray-600 mb-6">
          DatePicker integrated with React Hook Form for form validation and state management
        </p>
      </div>

      {/* Single Date Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Single Date Selection</h3>
        <FormWrapper
          schema={singleDateFormSchema}
          onSubmit={handleSingleDateSubmit}
          isLoading={isLoading}
          resetOnSubmit={false}
        >
          <SingleDateForm />
          <div className="flex justify-end pt-4">
            <Button type="submit" variant="primary">
              Submit Single Date
            </Button>
          </div>
        </FormWrapper>
      </div>

      {/* Date Range Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Date Range Selection</h3>
        <FormWrapper
          schema={dateRangeFormSchema}
          onSubmit={handleDateRangeSubmit}
          isLoading={isLoading}
          resetOnSubmit={false}
        >
          <DateRangeForm />
          <div className="flex justify-end pt-4">
            <Button type="submit" variant="primary">
              Submit Date Range
            </Button>
          </div>
        </FormWrapper>
      </div>

      {/* Multiple Dates Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Multiple Dates Selection</h3>
        <FormWrapper
          schema={multipleDatesFormSchema}
          onSubmit={handleMultipleDatesSubmit}
          isLoading={isLoading}
          resetOnSubmit={false}
        >
          <MultipleDatesForm />
          <div className="flex justify-end pt-4">
            <Button type="submit" variant="primary">
              Submit Multiple Dates
            </Button>
          </div>
        </FormWrapper>
      </div>

      {/* Features List */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Features</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ Single, range, and multiple date selection modes</li>
          <li>✓ Form validation with Zod schema</li>
          <li>✓ Min/max date restrictions</li>
          <li>✓ Disabled dates (e.g., weekends)</li>
          <li>✓ Custom date formatting</li>
          <li>✓ Clear button support</li>
          <li>✓ Error messages on validation failure</li>
          <li>✓ Fully integrated with React Hook Form</li>
        </ul>
      </div>
    </div>
  );
};

