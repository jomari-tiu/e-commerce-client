# Custom Select Components

This file provides two simplified select components built on top of the existing `select.tsx` components, following the same patterns as the custom dropdown components:

## CustomSelect

A simple select component that accepts options as props, built on Radix UI Select.

### Basic Usage

```tsx
import { CustomSelect } from '@/components/ui';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
  { value: 'option4', label: 'Option 4', separator: true }, // Adds separator after this item
];

function MyComponent() {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <CustomSelect
      label="Choose an option"
      placeholder="Select something..."
      options={options}
      value={selectedValue}
      onValueChange={setSelectedValue}
      size="default"
      required
      className="w-full"
    />
  );
}
```

### Props

- `options`: Array of `SelectOption` objects
- `onValueChange`: Callback function when an option is selected
- `placeholder`: Text shown when no option is selected
- `label`: Optional label above the select
- `value`: Currently selected value
- `disabled`: Whether the select is disabled
- `size`: Select size (`'default' | 'sm' | 'lg'`)
- `required`: Whether the field is required (adds red asterisk)
- `name`: Form field name for form integration
- `className`: Custom CSS class for the container
- `triggerClassName`: Custom CSS class for the trigger
- `contentClassName`: Custom CSS class for the content

## CsSelectMenu

An enhanced select with additional features like search, multiple selection, clearable options, and grouped options.

### Features

- **Searchable**: Filter options by typing
- **Multiple Selection**: Select multiple options (custom implementation)
- **Clearable**: Add clear button to reset selection
- **Grouped Options**: Support for separators and labels
- **Custom Styling**: All the same styling options as CustomSelect
- **Form Integration**: Proper form field support

### Usage Examples

#### Searchable Select

```tsx
import { CsSelectMenu } from '@/components/ui';

const options = [
  { type: 'label', label: 'Fruits' },
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { type: 'separator' },
  { type: 'label', label: 'Vegetables' },
  { value: 'carrot', label: 'Carrot' },
  { value: 'broccoli', label: 'Broccoli' },
];

function SearchableSelect() {
  const [value, setValue] = useState('');

  return (
    <CsSelectMenu
      label="Search and select"
      placeholder="Search items..."
      options={options}
      value={value}
      onValueChange={setValue}
      searchable
    />
  );
}
```

#### Multiple Selection

```tsx
function MultiSelectSelect() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <CsSelectMenu
      label="Choose multiple options"
      placeholder="Select multiple..."
      options={options}
      multiple
      values={values}
      onMultiValueChange={setValues}
    />
  );
}
```

#### Clearable Select

```tsx
function ClearableSelect() {
  const [value, setValue] = useState('');

  return (
    <CsSelectMenu
      label="Country"
      placeholder="Select a country..."
      options={countryOptions}
      value={value}
      onValueChange={setValue}
      searchable
      clearable
      onClear={() => console.log('Cleared!')}
    />
  );
}
```

### SelectOption Interface

```tsx
type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
  separator?: boolean; // Add separator after this item
};
```

### Advanced Options

For `CsSelectMenu`, options can also include:

```tsx
// Separator
{ type: 'separator' }

// Label/Group header
{ type: 'label', label: 'Group Name' }
```

## Key Differences from Dropdown Components

1. **Built on Radix Select**: Uses Radix UI Select primitives instead of DropdownMenu
2. **Form Integration**: Better form support with `name`, `required` attributes
3. **Multiple Selection**: Custom implementation for multi-select since Radix Select doesn't support it natively
4. **Clearable**: Built-in clear functionality
5. **Size Variants**: Different size options (sm, default, lg)

## Styling

Both components provide extensive styling options:

- Size variants (sm, default, lg)
- Custom CSS classes for container, trigger, and content
- Proper form styling with labels and required indicators
- Consistent with the design system

## Form Integration

```tsx
<form>
  <CustomSelect
    name="country"
    label="Country"
    placeholder="Select your country"
    options={countryOptions}
    value={formData.country}
    onValueChange={value => setFormData(prev => ({ ...prev, country: value }))}
    required
  />
</form>
```

## Examples

See `SelectExample.tsx` for complete working examples of both components with various configurations and use cases.
