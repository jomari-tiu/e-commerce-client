# Breadcrumbs Component

A flexible and customizable breadcrumb navigation component built on top of shadcn/ui primitives.

## Features

- ✅ **Prop-based API** - Easy to use with simple props
- ✅ **Link Support** - Use `href` for navigation links
- ✅ **Click Handlers** - Use `onClick` for programmatic navigation
- ✅ **Collapsible** - Automatically collapses long paths with dropdown
- ✅ **Custom Separators** - Use any React node as separator
- ✅ **Accessible** - Built with proper ARIA attributes
- ✅ **Responsive** - Works great on all screen sizes

## Usage

### Basic Usage

```tsx
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const items = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "Current Page" },
];

<Breadcrumbs items={items} />;
```

### With Click Handlers

```tsx
const items = [
  { title: "Home", onClick: () => navigate("/") },
  { title: "Settings", onClick: () => navigate("/settings") },
  { title: "Profile" },
];

<Breadcrumbs items={items} />;
```

### Collapsed Breadcrumbs

For long paths, use `maxItems` to limit visible items. Hidden items will be shown in a dropdown.

```tsx
<Breadcrumbs items={longPathItems} maxItems={4} />
```

### Custom Separator

```tsx
import { Slash } from "lucide-react";

<Breadcrumbs items={items} separator={<Slash className="h-4 w-4" />} />;
```

## Props

### BreadcrumbsProps

| Prop        | Type                   | Default        | Description                     |
| ----------- | ---------------------- | -------------- | ------------------------------- |
| `items`     | `BreadcrumbItemType[]` | required       | Array of breadcrumb items       |
| `separator` | `React.ReactNode`      | `ChevronRight` | Custom separator element        |
| `maxItems`  | `number`               | `undefined`    | Maximum items before collapsing |
| `className` | `string`               | `undefined`    | Additional CSS classes          |

### BreadcrumbItemType

| Prop      | Type                    | Description                          |
| --------- | ----------------------- | ------------------------------------ |
| `title`   | `string`                | Display text for the breadcrumb item |
| `href`    | `string` (optional)     | URL for navigation (renders as link) |
| `onClick` | `() => void` (optional) | Click handler (alternative to href)  |

## Examples

See `BreadcrumbsExample.tsx` for comprehensive examples including:

- Basic breadcrumbs with links
- Breadcrumbs with click handlers
- Collapsed breadcrumbs for long paths
- Custom separators
- Custom styling

## Notes

- The last item in the array is always treated as the current page (not clickable)
- You can use either `href` or `onClick`, but `href` takes precedence
- When using `maxItems`, the first item and last (maxItems - 1) items are always visible
- The component returns `null` if no items are provided
