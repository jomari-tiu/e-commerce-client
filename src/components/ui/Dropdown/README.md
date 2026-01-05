# Dropdown Components

A collection of flexible dropdown components with different levels of complexity and customization.

## Components

### 1. MenuDropdown (Action Menu)

A menu dropdown for actions with onClick handlers. Perfect for context menus, action buttons, and navigation menus.

```tsx
import { MenuDropdown, IconMenuDropdown } from '@/components/ui/Dropdown';
import { Edit, Trash2, Settings } from 'lucide-react';

const menuItems = [
  {
    label: 'Edit',
    onClick: () => console.log('Edit clicked'),
    icon: <Edit className="h-4 w-4" />,
  },
  {
    label: 'Delete',
    onClick: () => console.log('Delete clicked'),
    icon: <Trash2 className="h-4 w-4" />,
    destructive: true,
  },
  { type: 'separator' },
  {
    label: 'Settings',
    onClick: () => console.log('Settings clicked'),
    icon: <Settings className="h-4 w-4" />,
  },
];

// Button trigger
<MenuDropdown
  items={menuItems}
  triggerText="Actions"
  variant="outline"
/>

// Icon trigger (three dots)
<IconMenuDropdown items={menuItems} />
```

**Menu Item Types:**

- `{ label, onClick, icon?, disabled?, destructive? }` - Clickable menu item
- `{ type: 'separator' }` - Visual separator
- `{ type: 'label', label }` - Section label

**Props:**

- `items`: Array of menu items with onClick handlers
- `triggerText`: Text for button trigger
- `triggerIcon`: Icon for button trigger
- `variant`: Button color variant
- `size`: Button size
- `align`: Menu alignment ('start', 'center', 'end')
- `side`: Menu position ('top', 'right', 'bottom', 'left')
- `children`: Custom trigger element

### 2. Dropdown (Select/Form Field)

A basic dropdown component with color variants, perfect for most use cases.

```tsx
import { Dropdown } from '@/components/ui/Dropdown';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

<Dropdown
  label="Choose an option"
  placeholder="Select something..."
  options={options}
  value={selectedValue}
  onSelect={setSelectedValue}
  variant="primary"
  size="default"
/>;
```

**Props:**

- `options`: Array of `DropdownOption` objects
- `onSelect`: Callback function when an option is selected
- `placeholder`: Text shown when no option is selected
- `label`: Optional label for the dropdown
- `value`: Currently selected value
- `disabled`: Disable the dropdown
- `variant`: Color variant ('default', 'primary', 'success', 'danger', 'warning', 'info', 'ghost', 'outline')
- `size`: Size variant ('default', 'sm', 'lg', 'icon')
- `align`: Menu alignment ('start', 'center', 'end')
- `side`: Menu side ('top', 'right', 'bottom', 'left')
- `showChevron`: Show/hide the chevron icon

### 2. CustomDropdown (Extended)

An extended dropdown with separators and more customization options.

```tsx
import { CustomDropdown } from '@/components/ui/Dropdown';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', separator: true },
  { value: 'option3', label: 'Option 3' },
];

<CustomDropdown options={options} onSelect={handleSelect} variant="primary" />;
```

### 3. CsDropdownMenu (Advanced)

A fully-featured dropdown with search, multi-select, and advanced options.

```tsx
import { CsDropdownMenu } from '@/components/ui/Dropdown';

const advancedOptions = [
  { type: 'label', label: 'Fruits' },
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { type: 'separator' },
  { type: 'label', label: 'Vegetables' },
  { value: 'carrot', label: 'Carrot' },
];

<CsDropdownMenu
  options={advancedOptions}
  onSelect={handleSelect}
  searchable
  multiple
  values={selectedValues}
  onMultiSelect={setSelectedValues}
/>;
```

## Color Variants

All dropdown components support the same color variants as the Button component:

- `default`: Default gray styling
- `primary`: Primary brand color
- `success`: Green for success states
- `danger`: Red for error/danger states
- `warning`: Yellow/orange for warnings
- `info`: Blue for informational states
- `ghost`: Transparent with hover effects
- `outline`: Bordered with transparent background

## Usage Guidelines

1. **Use `MenuDropdown`** for action menus, context menus, and clickable options (NOT for selecting values)
2. **Use `IconMenuDropdown`** for space-efficient action menus (three dots icon)
3. **Use `Dropdown`** for simple form field selection with consistent styling
4. **Use `CustomDropdown`** when you need separators in selection dropdowns
5. **Use `CsDropdownMenu`** for complex selection scenarios requiring search, multi-select, or grouped options

### When to Use What

**Menu vs Select:**

- **Menu** = Actions (Edit, Delete, Settings) → Use `MenuDropdown`
- **Select** = Choose a value (Country, Status, Category) → Use `Dropdown`

## Examples

Check `DropdownExample.tsx` for comprehensive usage examples of all variants and features.
