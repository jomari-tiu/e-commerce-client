# Sheet Component

A simple and flexible sheet/drawer component built on top of Radix UI Dialog, providing slide-out panels from any side of the screen with smooth animations.

## Quick Start

```tsx
import { Sheet } from '@/components/ui/Sheet';
import { Button } from '@/components/ui/button';

// Basic usage - children become the sheet content
<Sheet trigger={<Button>Open Sheet</Button>} side="right" size="md">
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Sheet Title</h3>
    <p>Any content you want goes here!</p>
    <Button>Action Button</Button>
  </div>
</Sheet>;
```

## API

### Props

```tsx
interface SheetProps {
  children: React.ReactNode; // Content of the sheet
  trigger: React.ReactNode; // Element that opens the sheet
  side?: 'top' | 'right' | 'bottom' | 'left'; // Position (default: 'right')
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'; // Size (default: 'md')
  className?: string; // Container className
  contentClassName?: string; // Sheet content className
  showCloseButton?: boolean; // Show X button (default: true)
  open?: boolean; // Controlled state
  onOpenChange?: (open: boolean) => void; // State change handler
  defaultOpen?: boolean; // Default open state
}
```

## Examples

### Basic Form Sheet

```tsx
<Sheet trigger={<Button>Add User</Button>} side="right" size="lg">
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold">Create User</h3>
      <p className="text-sm text-gray-600">Fill in the user details</p>
    </div>

    <form className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <Button type="submit">Create User</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </form>
  </div>
</Sheet>
```

### Navigation Sheet

```tsx
<Sheet trigger={<Button variant="ghost">Menu</Button>} side="left" size="sm">
  <nav className="space-y-4">
    <h3 className="font-semibold">Navigation</h3>
    <div className="space-y-2">
      <a href="#" className="block p-2 rounded hover:bg-gray-100">
        Dashboard
      </a>
      <a href="#" className="block p-2 rounded hover:bg-gray-100">
        Users
      </a>
      <a href="#" className="block p-2 rounded hover:bg-gray-100">
        Settings
      </a>
    </div>
  </nav>
</Sheet>
```

### Bottom Action Sheet

```tsx
<Sheet trigger={<Button>Actions</Button>} side="bottom" size="md">
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Quick Actions</h3>
    <div className="grid grid-cols-2 gap-2">
      <Button>Edit</Button>
      <Button>Share</Button>
      <Button>Copy</Button>
      <Button variant="danger">Delete</Button>
    </div>
  </div>
</Sheet>
```

### Controlled Sheet

```tsx
const [isOpen, setIsOpen] = useState(false);

<Sheet
  trigger={<Button>Controlled</Button>}
  open={isOpen}
  onOpenChange={setIsOpen}
>
  <div>
    <h3>Controlled Sheet</h3>
    <Button onClick={() => setIsOpen(false)}>Close Programmatically</Button>
  </div>
</Sheet>;
```

## Positions & Sizes

### Positions (side prop)

- `top`: Slides from top
- `right`: Slides from right (default)
- `bottom`: Slides from bottom
- `left`: Slides from left

### Sizes (size prop)

- `sm`: Small (320px width / 33% height)
- `md`: Medium (500px width / 50% height) - default
- `lg`: Large (600px width / 66% height)
- `xl`: Extra large (700px width / 75% height)
- `full`: Full width/height

## Usage Guidelines

1. **Keep content focused** - Use sheets for related tasks that don't require full attention
2. **Choose appropriate side** - Right/left for most cases, bottom for mobile-friendly actions
3. **Size appropriately** - Start with 'md', increase for forms, decrease for simple actions
4. **Provide clear triggers** - Use descriptive button text or recognizable icons
5. **Handle mobile** - Test on mobile devices, consider bottom sheets for better UX

### Best Practices

- Always provide meaningful content in children
- Use consistent positioning across your application
- Include proper headings and structure in your content
- Handle loading states within your sheet content
- Ensure keyboard navigation works (Escape to close)
- Test on different screen sizes

## Migration from Old Sheet Components

If you were using the old complex sheet components:

```tsx
// Old ActionSheet
<ActionSheet
  actions={[{label: 'Edit', onClick: handleEdit}]}
  title="Actions"
/>

// New simplified approach
<Sheet trigger={<Button>Actions</Button>}>
  <div className="space-y-4">
    <h3>Actions</h3>
    <Button onClick={handleEdit}>Edit</Button>
  </div>
</Sheet>
```

The new Sheet component is more flexible - you build the content exactly how you want it!
