# Switch Component

This directory contains a custom Switch component built on top of Radix UI primitives, following the same pattern as other form components in the design system.

## Components

### Switch

A toggle switch component with the following features:

- Basic on/off functionality
- Label support
- Description text support
- Different sizes (sm, default, lg)
- Disabled state
- Required field indication
- Accessible and keyboard navigable

## Usage

### Basic Switch

```tsx
import { Switch } from '@/components/ui/Switch';

function MyComponent() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      label="Enable notifications"
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  );
}
```

### Switch with Description

```tsx
<Switch
  label="Email Notifications"
  description="Receive email updates and alerts"
  checked={emailEnabled}
  onCheckedChange={setEmailEnabled}
/>
```

### Required Switch

```tsx
<Switch
  label="I agree to the terms and conditions"
  description="You must agree to continue"
  checked={agreed}
  onCheckedChange={setAgreed}
  required
/>
```

### Different Sizes

```tsx
<Switch
  label="Small Switch"
  checked={value}
  onCheckedChange={setValue}
  size="sm"
/>

<Switch
  label="Default Switch"
  checked={value}
  onCheckedChange={setValue}
  size="default"
/>

<Switch
  label="Large Switch"
  checked={value}
  onCheckedChange={setValue}
  size="lg"
/>
```

### Disabled State

```tsx
<Switch
  label="Disabled Switch"
  description="This switch is disabled"
  checked={false}
  onCheckedChange={() => {}}
  disabled
/>
```

### Settings Group Example

```tsx
import { Switch } from '@/components/ui/Switch';

function SettingsPanel() {
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    sms: true,
  });

  return (
    <div className="space-y-3">
      <Switch
        label="Email Notifications"
        description="Receive email updates"
        checked={settings.email}
        onCheckedChange={(checked) =>
          setSettings({ ...settings, email: checked })
        }
      />
      <Switch
        label="Push Notifications"
        description="Get push notifications"
        checked={settings.push}
        onCheckedChange={(checked) =>
          setSettings({ ...settings, push: checked })
        }
      />
      <Switch
        label="SMS Notifications"
        description="Receive text messages"
        checked={settings.sms}
        onCheckedChange={(checked) =>
          setSettings({ ...settings, sms: checked })
        }
      />
    </div>
  );
}
```

## Props

### Switch Props

- `label`: Switch label text
- `description`: Optional description text below the label
- `checked`: Whether the switch is checked (on)
- `onCheckedChange`: Callback function when the switch state changes
- `disabled`: Disable the switch
- `required`: Show required indicator (red asterisk)
- `size`: Switch size (`'sm'` | `'default'` | `'lg'`)
- `name`: Form field name for form integration
- `id`: Custom ID for the switch element
- `className`: Custom CSS class for the container
- `switchClassName`: Custom CSS class for the switch element
- `labelClassName`: Custom CSS class for the label text

## Styling

The component uses Tailwind CSS classes and can be customized using the various className props:

- `className`: Main container styling
- `switchClassName`: Switch element styling
- `labelClassName`: Label text styling

### Size Variants

- **sm**: Height 5, Width 9
- **default**: Height 6, Width 11
- **lg**: Height 7, Width 14

## Accessibility

The Switch component is built with accessibility in mind:

- Proper ARIA attributes via Radix UI
- Keyboard navigation support (Space/Enter to toggle)
- Focus visible states
- Disabled state properly communicated to screen readers
- Label properly associated with switch element

## Features

### Label and Description

Switches can have both a label and a description to provide context:

- Labels are displayed in medium font weight
- Descriptions are shown below labels in smaller, muted text
- Required fields show a red asterisk

### State Management

The component is fully controlled - you manage the state:

```tsx
const [checked, setChecked] = useState(false);

<Switch
  checked={checked}
  onCheckedChange={setChecked}
  label="My Switch"
/>
```

### Visual Feedback

- Active state: Primary color background
- Inactive state: Gray background
- Disabled state: Reduced opacity
- Focus state: Ring outline for keyboard navigation
- Smooth transitions between states

## Examples

See `SwitchExample.tsx` for comprehensive usage examples including:

- Single switches
- Switches with and without descriptions
- Required switches
- Disabled states
- Different sizes
- Settings groups
- Privacy controls
- Compact layouts

