# RadioButton Components

This directory contains custom radio button components built on top of Radix UI primitives, following the same pattern as the Select components.

## Components

### CustomRadioGroup

A simple, customizable radio group component with the following features:

- Basic radio button functionality with labels
- Vertical and horizontal orientations
- Different sizes (sm, default, lg)
- Support for descriptions
- Disabled options
- Required field indication

### CsRadioGroup (Advanced)

An advanced radio group component with additional features:

- All features from CustomRadioGroup
- Cards and tiles layout options
- Icon support
- Badge display
- Recommended option highlighting
- Multi-column grid layouts
- Custom styling options

## Usage

### Basic Usage

```tsx
import { CustomRadioGroup } from '@/components/ui/RadioButton';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

<CustomRadioGroup
  label="Choose an option"
  options={options}
  value={value}
  onValueChange={setValue}
  required
/>;
```

### Advanced Usage with Cards Layout

```tsx
import { CsRadioGroup } from '@/components/ui/RadioButton';

const planOptions = [
  {
    value: 'basic',
    label: 'Basic Plan',
    description: 'Perfect for individuals',
    badge: '$9/month',
  },
  {
    value: 'pro',
    label: 'Pro Plan',
    description: 'Best for growing businesses',
    badge: '$29/month',
    recommended: true,
  },
];

<CsRadioGroup
  label="Choose your plan"
  options={planOptions}
  value={selectedPlan}
  onValueChange={setSelectedPlan}
  layout="cards"
  columns={2}
/>;
```

### Tiles Layout with Icons

```tsx
import { CsRadioGroup } from '@/components/ui/RadioButton';
import { Star, Zap } from 'lucide-react';

const featureOptions = [
  {
    value: 'performance',
    label: 'Performance',
    description: 'Optimized for speed',
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    badge: 'Fast',
  },
  {
    value: 'premium',
    label: 'Premium',
    description: 'All features included',
    icon: <Star className="w-6 h-6 text-purple-500" />,
    badge: 'Popular',
    recommended: true,
  },
];

<CsRadioGroup
  label="Select features"
  options={featureOptions}
  value={selectedFeature}
  onValueChange={setSelectedFeature}
  layout="tiles"
  columns={2}
  showIcons
  showBadges
/>;
```

## Props

### CustomRadioGroup Props

- `options`: Array of radio options with value, label, disabled, and description
- `onValueChange`: Callback when selection changes
- `value`: Currently selected value
- `disabled`: Disable entire group
- `label`: Group label
- `required`: Show required indicator
- `orientation`: 'vertical' | 'horizontal'
- `size`: 'sm' | 'default' | 'lg'
- Various className props for styling

### CsRadioGroup Props

All CustomRadioGroup props plus:

- `layout`: 'default' | 'cards' | 'tiles'
- `columns`: Number of columns for grid layouts
- `showIcons`: Whether to display icons
- `showBadges`: Whether to display badges
- Advanced option type with icon, badge, and recommended properties

## Styling

The components use Tailwind CSS classes and can be customized using the various className props:

- `className`: Main container styling
- `groupClassName`: Radio group container styling
- `itemClassName`: Individual radio item styling
- `labelClassName`: Label styling
- `cardClassName`: Card/tile container styling (CsRadioGroup only)
