# Tabs Component

This directory contains a custom Tabs component built on top of Radix UI primitives, following the same pattern as other components in the design system.

## Components

### Tabs

A tabs component for organizing content into separate views with the following features:

- Tab items configured via props
- Controlled and uncontrolled modes
- Horizontal and vertical orientations
- Different sizes (sm, default, lg)
- Icon support
- Disabled tabs
- Keyboard navigation
- Accessible and ARIA compliant

## Usage

### Basic Tabs

```tsx
import { Tabs, TabItem } from '@/components/ui/Tabs';

const tabs: TabItem[] = [
  {
    value: 'tab1',
    label: 'Tab 1',
    content: <div>Content for tab 1</div>,
  },
  {
    value: 'tab2',
    label: 'Tab 2',
    content: <div>Content for tab 2</div>,
  },
  {
    value: 'tab3',
    label: 'Tab 3',
    content: <div>Content for tab 3</div>,
  },
];

function MyComponent() {
  return <Tabs items={tabs} />;
}
```

### Controlled Tabs

```tsx
import { Tabs } from '@/components/ui/Tabs';
import { useState } from 'react';

function MyComponent() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <Tabs
      items={tabs}
      value={activeTab}
      onValueChange={setActiveTab}
    />
  );
}
```

### Tabs with Icons

```tsx
import { Home, Settings, User } from 'lucide-react';

const tabsWithIcons: TabItem[] = [
  {
    value: 'home',
    label: 'Home',
    icon: <Home className="w-4 h-4" />,
    content: <div>Home content</div>,
  },
  {
    value: 'settings',
    label: 'Settings',
    icon: <Settings className="w-4 h-4" />,
    content: <div>Settings content</div>,
  },
  {
    value: 'profile',
    label: 'Profile',
    icon: <User className="w-4 h-4" />,
    content: <div>Profile content</div>,
  },
];

<Tabs items={tabsWithIcons} />
```

### Disabled Tabs

```tsx
const tabsWithDisabled: TabItem[] = [
  {
    value: 'tab1',
    label: 'Enabled Tab',
    content: <div>Content here</div>,
  },
  {
    value: 'tab2',
    label: 'Disabled Tab',
    content: <div>You cannot see this</div>,
    disabled: true,
  },
];

<Tabs items={tabsWithDisabled} />
```

### Vertical Tabs

```tsx
<Tabs
  items={tabs}
  orientation="vertical"
/>
```

### Different Sizes

```tsx
// Small
<Tabs items={tabs} size="sm" />

// Default
<Tabs items={tabs} size="default" />

// Large
<Tabs items={tabs} size="lg" />
```

### Default Value

```tsx
<Tabs
  items={tabs}
  defaultValue="tab2"
/>
```

## Props

### Tabs Props

- `items`: Array of `TabItem` objects (required)
- `defaultValue`: Initial tab value (uncontrolled mode)
- `value`: Current tab value (controlled mode)
- `onValueChange`: Callback when tab changes (controlled mode)
- `orientation`: Tab orientation (`'horizontal'` | `'vertical'`)
- `size`: Tabs size (`'sm'` | `'default'` | `'lg'`)
- `className`: Custom CSS class for the container
- `tabsListClassName`: Custom CSS class for the tabs list
- `tabsTriggerClassName`: Custom CSS class for tab triggers
- `tabsContentClassName`: Custom CSS class for tab content

### TabItem Type

```tsx
type TabItem = {
  value: string;           // Unique identifier for the tab
  label: string;           // Display text for the tab
  content: React.ReactNode; // Content to show when tab is active
  disabled?: boolean;      // Whether the tab is disabled
  icon?: React.ReactNode;  // Optional icon to display
};
```

## Styling

The component uses Tailwind CSS classes and can be customized using the various className props:

- `className`: Main container styling
- `tabsListClassName`: Tabs list container styling
- `tabsTriggerClassName`: Individual tab trigger styling
- `tabsContentClassName`: Tab content area styling

### Size Variants

- **sm**: Height 8, Text xs
- **default**: Height 10, Text sm
- **lg**: Height 12, Text base

## Accessibility

The Tabs component is built with accessibility in mind:

- Proper ARIA attributes via Radix UI
- Keyboard navigation (Arrow keys to move between tabs)
- Focus visible states
- Disabled state properly communicated to screen readers
- Automatic focus management

### Keyboard Shortcuts

- `Tab`: Move focus into and out of the tabs
- `Arrow Left/Right` (horizontal): Navigate between tabs
- `Arrow Up/Down` (vertical): Navigate between tabs
- `Home`: Go to first tab
- `End`: Go to last tab

## Modes

### Uncontrolled Mode

The component manages its own state:

```tsx
<Tabs items={tabs} defaultValue="tab1" />
```

### Controlled Mode

You manage the state:

```tsx
const [value, setValue] = useState('tab1');

<Tabs
  items={tabs}
  value={value}
  onValueChange={setValue}
/>
```

## Features

### Icons

Tabs can include icons alongside labels:

- Icons are displayed before the label text
- Proper spacing is maintained
- Icons should be sized appropriately (w-4 h-4 recommended)

### Orientation

Support for both horizontal and vertical layouts:

- **Horizontal** (default): Tabs displayed in a row
- **Vertical**: Tabs displayed in a column, useful for sidebars

### Disabled State

Individual tabs can be disabled:

- Disabled tabs cannot be selected
- Proper visual feedback (reduced opacity)
- Keyboard navigation skips disabled tabs

### Responsive Design

The component is responsive by default:

- Horizontal tabs wrap on small screens if needed
- Vertical tabs work well on mobile devices
- Content area adjusts to available space

## Complex Example

```tsx
import { Tabs, TabItem } from '@/components/ui/Tabs';
import { User, Bell, Lock, CreditCard } from 'lucide-react';

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const settingsTabs: TabItem[] = [
    {
      value: 'profile',
      label: 'Profile',
      icon: <User className="w-4 h-4" />,
      content: <ProfileSettings />,
    },
    {
      value: 'notifications',
      label: 'Notifications',
      icon: <Bell className="w-4 h-4" />,
      content: <NotificationSettings />,
    },
    {
      value: 'security',
      label: 'Security',
      icon: <Lock className="w-4 h-4" />,
      content: <SecuritySettings />,
    },
    {
      value: 'billing',
      label: 'Billing',
      icon: <CreditCard className="w-4 h-4" />,
      content: <BillingSettings />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <Tabs
        items={settingsTabs}
        value={activeTab}
        onValueChange={setActiveTab}
      />
    </div>
  );
}
```

## Raw Components

For more control, you can use the raw Radix UI components directly:

```tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui/Tabs';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

## Examples

See `TabsExample.tsx` for comprehensive usage examples including:

- Basic tabs
- Tabs with icons
- Controlled tabs
- Different sizes
- Vertical orientation
- Disabled tabs
- Complex account settings example

