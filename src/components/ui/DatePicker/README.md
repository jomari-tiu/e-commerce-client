# DatePicker Component

A comprehensive date picker component built with React, Radix UI, and react-day-picker. Supports single date, date range, and multiple date selection with extensive customization options.

## Features

- **Multiple Selection Modes**: Single date, date range, and multiple dates
- **Date Validation**: Min/max dates, disabled dates, future/past restrictions
- **Flexible Formatting**: Multiple return formats (Date, ISO, timestamp, custom)
- **Accessibility**: Built on Radix UI primitives with full keyboard navigation
- **Customizable**: Variants, sizes, styling options
- **TypeScript**: Full type safety with generic support

## Components

### DatePicker (Base Component)

The main component that supports all modes through a generic type parameter.

### SingleDatePicker

Specialized component for single date selection.

### DateRangePicker

Specialized component for date range selection with additional range validation.

### MultipleDatePicker

Specialized component for multiple date selection with count limits.

## Usage

### Basic Single Date Picker

```tsx
import { SingleDatePicker } from '@/components/ui/DatePicker';

const [date, setDate] = useState<Date | undefined>();

<SingleDatePicker
  value={date}
  onValueChange={(date, formatted) => {
    setDate(date);
    console.log('Formatted:', formatted);
  }}
  placeholder="Select a date"
/>;
```

### Date Range Picker

```tsx
import { DateRangePicker } from '@/components/ui/DatePicker';
import { DateRange } from 'react-day-picker';

const [range, setRange] = useState<DateRange | undefined>();

<DateRangePicker
  value={range}
  onValueChange={(range, formatted) => {
    setRange(range);
  }}
  maxDays={30}
  formatOptions={{
    returnFormat: 'iso',
  }}
/>;
```

### Multiple Date Picker

```tsx
import { MultipleDatePicker } from '@/components/ui/DatePicker';

const [dates, setDates] = useState<Date[] | undefined>();

<MultipleDatePicker
  value={dates}
  onValueChange={(dates, formatted) => {
    setDates(dates);
  }}
  maxDates={5}
/>;
```

### With Date Restrictions

```tsx
import { addDays, subDays } from 'date-fns';

<SingleDatePicker
  value={date}
  onValueChange={setDate}
  minDate={subDays(new Date(), 7)}
  maxDate={addDays(new Date(), 30)}
  disabledDates={date => {
    const day = date.getDay();
    return day === 0 || day === 6; // Disable weekends
  }}
/>;
```

### Custom Formatting

```tsx
<SingleDatePicker
  value={date}
  onValueChange={(date, formatted) => {
    // formatted will be in custom format
    console.log(formatted); // "2024-12-25"
  }}
  formatOptions={{
    format: 'dd/MM/yyyy', // Display format
    returnFormat: 'custom',
    customFormat: 'yyyy-MM-dd', // Return format
  }}
/>
```

## Props

### Common Props (All Components)

| Prop            | Type                  | Default       | Description                 |
| --------------- | --------------------- | ------------- | --------------------------- |
| `value`         | Date/DateRange/Date[] | undefined     | Current value               |
| `onValueChange` | Function              | undefined     | Callback when value changes |
| `placeholder`   | string                | "Pick a date" | Placeholder text            |
| `minDate`       | Date                  | undefined     | Minimum selectable date     |
| `maxDate`       | Date                  | undefined     | Maximum selectable date     |
| `disabledDates` | Date[]/Function       | undefined     | Disabled dates              |
| `formatOptions` | Object                | {}            | Formatting options          |
| `showClear`     | boolean               | true          | Show clear button           |
| `disabled`      | boolean               | false         | Disabled state              |
| `variant`       | string                | "outline"     | Button variant              |
| `size`          | string                | "default"     | Button size                 |
| `className`     | string                | undefined     | Custom className            |
| `align`         | string                | "start"       | Popover alignment           |
| `side`          | string                | "bottom"      | Popover side                |
| `allowFuture`   | boolean               | true          | Allow future dates          |
| `allowPast`     | boolean               | true          | Allow past dates            |

### DateRangePicker Specific

| Prop      | Type   | Default   | Description           |
| --------- | ------ | --------- | --------------------- |
| `maxDays` | number | undefined | Maximum days in range |
| `minDays` | number | undefined | Minimum days in range |

### MultipleDatePicker Specific

| Prop       | Type   | Default   | Description             |
| ---------- | ------ | --------- | ----------------------- |
| `maxDates` | number | undefined | Maximum number of dates |
| `minDates` | number | undefined | Minimum number of dates |

## Format Options

### Return Formats

- `date` (default): Returns native Date objects
- `iso`: Returns ISO 8601 strings
- `timestamp`: Returns Unix timestamps
- `custom`: Returns custom formatted strings

### Display Formats

Uses date-fns format strings:

- `PPP`: Dec 25, 2024
- `dd/MM/yyyy`: 25/12/2024
- `yyyy-MM-dd`: 2024-12-25
- `EEEE, MMMM do, yyyy`: Wednesday, December 25th, 2024

## Examples

See `DatePickerExample.tsx` for comprehensive usage examples including:

- Basic usage for all modes
- Date restrictions and validation
- Custom formatting
- Different variants and sizes
- Disabled dates logic

## Accessibility

- Full keyboard navigation support
- ARIA labels and descriptions
- Screen reader friendly
- Focus management
- High contrast support

## Dependencies

- `react-day-picker`: Calendar functionality
- `date-fns`: Date formatting and manipulation
- `@radix-ui/react-popover`: Popover primitive
- `lucide-react`: Icons
- `class-variance-authority`: Variant styling
