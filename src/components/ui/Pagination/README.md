# Pagination Component

A fully-featured, accessible pagination component built on top of shadcn/ui, with a simple props-based interface.

## Features

- ✅ **Simple API**: Easy-to-use props-based interface
- ✅ **Smart Page Display**: Automatically shows ellipsis when there are many pages
- ✅ **Customizable**: Control sibling pages, show/hide first/last buttons
- ✅ **Multiple Sizes**: Small, default, and large sizes
- ✅ **Accessible**: Built with accessibility in mind
- ✅ **Keyboard Navigation**: Full keyboard support
- ✅ **TypeScript**: Full type safety
- ✅ **Flexible**: Works with any data pagination logic

## Installation

The pagination component is already installed in this design system. It uses:

- `@/components/ui/@raw-shadcn/pagination` - Base shadcn/ui pagination primitives
- `@/components/ui/Pagination` - Props-based wrapper component

## Basic Usage

```tsx
import { Pagination } from '@/components/ui';

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
```

## With Table Data

```tsx
import { useState, useMemo } from 'react';
import { Pagination } from '@/components/ui';

function TableWithPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, data]);

  return (
    <>
      <Table data={paginatedData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
```

## With Page Size Selector

```tsx
import { useState } from 'react';
import { Pagination, Select } from '@/components/ui';

function PaginationWithPageSize() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState({ value: '10', label: '10 per page' });
  
  const pageSizeOptions = [
    { value: '5', label: '5 per page' },
    { value: '10', label: '10 per page' },
    { value: '20', label: '20 per page' },
  ];
  
  const itemsPerPage = parseInt(pageSize.value);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startItem} to {endItem} of {totalItems} items
        </p>
        <Select
          options={pageSizeOptions}
          value={pageSize}
          onValueChange={(value) => {
            setPageSize(value!);
            setCurrentPage(1); // Reset to first page
          }}
          size="sm"
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | **Required** | Current active page (1-indexed) |
| `totalPages` | `number` | **Required** | Total number of pages |
| `onPageChange` | `(page: number) => void` | **Required** | Callback when page changes |
| `siblingCount` | `number` | `1` | Number of page buttons to show before/after current page |
| `showPreviousNext` | `boolean` | `true` | Whether to show Previous/Next buttons |
| `showFirstLast` | `boolean` | `false` | Whether to show first/last page buttons |
| `previousLabel` | `string` | `undefined` | Custom text for Previous button |
| `nextLabel` | `string` | `undefined` | Custom text for Next button |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size of pagination buttons |
| `className` | `string` | `undefined` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable all pagination controls |

## Examples

### Different Sizes

```tsx
<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
  size="sm"
/>

<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
  size="default"
/>

<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
  size="lg"
/>
```

### Extended with More Siblings

```tsx
<Pagination
  currentPage={page}
  totalPages={50}
  onPageChange={setPage}
  siblingCount={2}
  showFirstLast={true}
/>
```

### Compact (No Siblings)

```tsx
<Pagination
  currentPage={page}
  totalPages={20}
  onPageChange={setPage}
  siblingCount={0}
/>
```

### Without Previous/Next Buttons

```tsx
<Pagination
  currentPage={page}
  totalPages={8}
  onPageChange={setPage}
  showPreviousNext={false}
/>
```

### Custom Button Labels

```tsx
<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
  previousLabel="← Prev"
  nextLabel="Next →"
/>
```

### Disabled State

```tsx
<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
  disabled
/>
```

## Page Range Algorithm

The pagination component uses a smart algorithm to display page numbers:

- For **small page counts** (≤7 pages): All pages are shown
- For **large page counts**: Shows current page with siblings and ellipsis
- **Ellipsis** appears when there are hidden pages between ranges
- **First/Last** buttons can be enabled for quick navigation

Example progression (siblingCount=1):

```
Page 1:   [1] 2 3 ... 50
Page 2:   1 [2] 3 ... 50
Page 3:   1 2 [3] 4 ... 50
Page 4:   1 ... 3 [4] 5 ... 50
Page 25:  1 ... 24 [25] 26 ... 50
Page 50:  1 ... 48 49 [50]
```

## Integration with Tables

The Pagination component integrates seamlessly with the Table component. See the [TableExample](../Table/TableExample.tsx) for a complete implementation with:

- Data slicing based on current page and page size
- Page size selector
- Item range display (e.g., "Showing 1 to 10 of 95 items")
- Automatic page reset when changing page size

## Accessibility

- Uses semantic HTML (`<nav>` with pagination role)
- Proper ARIA labels for navigation
- `aria-current="page"` for active page
- Keyboard navigable
- Screen reader friendly

## Styling

The component uses Tailwind CSS and inherits the design system's theme. Customize by:

1. Passing `className` prop for container styling
2. Modifying button variants in `@raw-shadcn/pagination.tsx`
3. Adjusting size classes in `Pagination.tsx`

## Best Practices

1. **Always reset to page 1** when changing filters or page size
2. **Show item counts** to give users context
3. **Use appropriate siblingCount** based on screen size
4. **Consider mobile**: Use smaller sizes on mobile devices
5. **Persist page state** in URL query params for shareable links
6. **Handle edge cases**: 0 pages, 1 page (component returns null)

## Examples in Sandbox

See the Component Sandbox for live examples:
- Basic pagination
- With page size selector
- Different sizes and configurations
- Integration with tables

Navigate to **Pagination** in the sidebar to explore all examples.

