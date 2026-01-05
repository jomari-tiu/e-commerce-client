# Checkbox Components

This directory contains custom checkbox components built on top of Radix UI primitives, following the same pattern as the Select components.

## Components

### CustomCheckbox

A single checkbox component with the following features:

- Basic checkbox functionality with label
- Support for descriptions
- Different sizes (sm, default, lg)
- Disabled state
- Required field indication

### CustomCheckboxGroup

A group of checkboxes with the following features:

- Multiple selection
- Vertical and horizontal orientations
- Different sizes (sm, default, lg)
- Support for descriptions
- Disabled options
- Required field indication

### CsCheckboxGroup (Advanced)

An advanced checkbox group component with additional features:

- All features from CustomCheckboxGroup
- Cards and tiles layout options
- Icon support
- Badge display
- Price display
- Recommended option highlighting
- Multi-column grid layouts
- Select All functionality
- Custom styling options

## Usage

### Single Checkbox

```tsx
import { CustomCheckbox } from '@/components/ui/Checkbox';

<CustomCheckbox
  label="I agree to the terms and conditions"
  description="Please read our terms carefully"
  checked={checked}
  onCheckedChange={setChecked}
  required
/>;
```

### Basic Checkbox Group

```tsx
import { CustomCheckboxGroup } from '@/components/ui/Checkbox';

const options = [
  { value: 'option1', label: 'Option 1', description: 'Description 1' },
  { value: 'option2', label: 'Option 2', description: 'Description 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

<CustomCheckboxGroup
  label="Select your preferences"
  options={options}
  values={selectedValues}
  onValuesChange={setSelectedValues}
  required
/>;
```

### Advanced Checkbox Group with Cards Layout

```tsx
import { CsCheckboxGroup } from '@/components/ui/Checkbox';

const featureOptions = [
  {
    value: 'analytics',
    label: 'Analytics Dashboard',
    description: 'Advanced analytics and reporting',
    badge: 'Popular',
    price: '+$10/month',
  },
  {
    value: 'api',
    label: 'API Access',
    description: 'Full REST API access',
    badge: 'Developer',
    price: '+$15/month',
    recommended: true,
  },
];

<CsCheckboxGroup
  label="Choose additional features"
  options={featureOptions}
  values={selectedFeatures}
  onValuesChange={setSelectedFeatures}
  layout="cards"
  columns={2}
  allowSelectAll
/>;
```

### Tiles Layout with Icons

```tsx
import { CsCheckboxGroup } from '@/components/ui/Checkbox';
import { Star, Zap } from 'lucide-react';

const serviceOptions = [
  {
    value: 'performance',
    label: 'Performance',
    description: 'CDN and optimization',
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    badge: 'Fast',
    price: '$15/month',
    recommended: true,
  },
  {
    value: 'security',
    label: 'Security',
    description: 'Advanced security features',
    icon: <Shield className="w-6 h-6 text-red-500" />,
    badge: 'Secure',
    price: '$12/month',
  },
];

<CsCheckboxGroup
  label="Select services"
  options={serviceOptions}
  values={selectedServices}
  onValuesChange={setSelectedServices}
  layout="tiles"
  columns={2}
  showIcons
  showBadges
  allowSelectAll
/>;
```

## Props

### CustomCheckbox Props

- `label`: Checkbox label
- `description`: Optional description text
- `checked`: Whether checkbox is checked
- `onCheckedChange`: Callback when checked state changes
- `disabled`: Disable the checkbox
- `required`: Show required indicator
- `size`: 'sm' | 'default' | 'lg'
- Various className props for styling

### CustomCheckboxGroup Props

- `options`: Array of checkbox options with value, label, disabled, and description
- `values`: Array of currently selected values
- `onValuesChange`: Callback when selection changes
- `label`: Group label
- `disabled`: Disable entire group
- `required`: Show required indicator
- `orientation`: 'vertical' | 'horizontal'
- `size`: 'sm' | 'default' | 'lg'
- Various className props for styling

### CsCheckboxGroup Props

All CustomCheckboxGroup props plus:

- `layout`: 'default' | 'cards' | 'tiles'
- `columns`: Number of columns for grid layouts
- `showIcons`: Whether to display icons
- `showBadges`: Whether to display badges
- `allowSelectAll`: Enable select all functionality
- `selectAllLabel`: Label for select all checkbox
- Advanced option type with icon, badge, price, and recommended properties

## Styling

The components use Tailwind CSS classes and can be customized using the various className props:

- `className`: Main container styling
- `groupClassName`: Checkbox group container styling
- `checkboxClassName`: Individual checkbox styling
- `labelClassName`: Label styling
- `cardClassName`: Card/tile container styling (CsCheckboxGroup only)

## Features

### Select All

The advanced checkbox group supports "Select All" functionality:

- Automatically selects/deselects all non-disabled options
- Shows indeterminate state when partially selected
- Can be customized with `selectAllLabel`

### Layout Options

- **Default**: Standard vertical or horizontal list
- **Cards**: Card-based layout with borders and padding
- **Tiles**: Centered tile layout with icons

### Visual Indicators

- Recommended badges for highlighted options
- Price display for options with pricing
- Icons for visual categorization
- Custom badges for additional context
