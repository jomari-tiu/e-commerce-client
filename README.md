# Design System with Form

A complete design system migrated from the HRIS Frontend application, featuring a comprehensive set of UI components and form utilities built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

### UI Components
- **Buttons & Badges** - Multiple variants with loading states
- **Cards** - Structured content containers
- **Calendar** - Date selection with react-day-picker
- **Form Controls**
  - Input, Textarea, Select
  - Checkbox (with card variants)
  - Radio buttons (with card variants)
  - Date pickers (single, range, multiple)
- **Dropdowns** - Menu and icon dropdowns
- **Toast Notifications** - Success, error, info, and warning toasts
- **Tables** - Sortable, filterable tables with selection
- **Sheets** - Slide-out panels
- **Other** - Avatars, separators, switches, labels, and more

### Form Components
- **FormWrapper** - Integrated with React Hook Form and Zod validation
- **FormInput** - Text, email, password, number inputs
- **FormSelect** - Dropdown selects with search
- **FormCheckbox** - Checkbox fields
- **FormRadioGroup** - Radio button groups
- **FormTextarea** - Multi-line text inputs
- **ComprehensiveFormExample** - Full example implementation

## 📦 Tech Stack

- **React 19** - Latest React version
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS 4** - Utility-first CSS
- **Radix UI** - Accessible primitives
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **date-fns** - Date utilities
- **Lucide React** - Icon library

## 🛠️ Installation

```bash
npm install
```

## 🏃 Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

## 🏗️ Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 📁 Project Structure

```
design-system-with-form/
├── src/
│   ├── components/
│   │   ├── ui/                 # UI components
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── Checkbox/       # Checkbox variants
│   │   │   ├── DatePicker/     # Date picker variants
│   │   │   ├── Dropdown/       # Dropdown variants
│   │   │   ├── RadioButton/    # Radio button variants
│   │   │   ├── Select/         # Select component
│   │   │   ├── Sheet/          # Sheet component
│   │   │   ├── Table/          # Table component
│   │   │   ├── Toast/          # Toast notifications
│   │   │   └── ...             # Other UI components
│   │   ├── form/               # Form components
│   │   │   ├── FormWrapper/
│   │   │   ├── FormInput.tsx
│   │   │   ├── FormSelect.tsx
│   │   │   ├── FormCheckbox.tsx
│   │   │   ├── FormRadioGroup.tsx
│   │   │   ├── FormTextArea.tsx
│   │   │   └── FormExample.tsx
│   │   └── index.ts
│   ├── lib/
│   │   └── utils.ts           # CN utility (clsx + tailwind-merge)
│   ├── utils/
│   │   └── cn.ts              # CN utility (alternative path)
│   ├── styles/
│   │   └── globals.css        # Global styles & Tailwind config
│   ├── App.tsx
│   └── main.tsx
├── components.json            # shadcn/ui config
├── tailwind.config.ts         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── vite.config.ts             # Vite configuration
└── tsconfig.json              # TypeScript configuration
```

## 🎨 Usage Examples

### Basic Button

```tsx
import { Button } from '@/components/ui';

function MyComponent() {
  return (
    <Button variant="primary" onClick={() => console.log('Clicked!')}>
      Click Me
    </Button>
  );
}
```

### Toast Notifications

```tsx
import { useToast } from '@/components/ui';

function MyComponent() {
  const { success, error, info } = useToast();

  return (
    <Button onClick={() => success('Success!', 'Operation completed')}>
      Show Toast
    </Button>
  );
}
```

### Form with Validation

```tsx
import { FormWrapper, FormInput, FormSelect } from '@/components/form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Please select a role'),
});

function MyForm() {
  const handleSubmit = (data: z.infer<typeof schema>) => {
    console.log('Form data:', data);
  };

  return (
    <FormWrapper
      schema={schema}
      onSubmit={handleSubmit}
      defaultValues={{ name: '', email: '', role: '' }}
    >
      <FormInput name="name" label="Name" placeholder="Enter your name" />
      <FormInput name="email" label="Email" type="email" placeholder="Enter your email" />
      <FormSelect
        name="role"
        label="Role"
        options={[
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
        ]}
      />
      <Button type="submit" variant="primary">Submit</Button>
    </FormWrapper>
  );
}
```

### Date Picker

```tsx
import { DatePicker } from '@/components/ui';
import { useState } from 'react';

function MyComponent() {
  const [date, setDate] = useState<Date>();

  return (
    <DatePicker
      mode="single"
      value={date}
      onValueChange={setDate}
      placeholder="Select a date"
    />
  );
}
```

## 🎯 Path Aliases

The project uses TypeScript path aliases for clean imports:

- `@/components` - Components directory
- `@/lib` - Library utilities
- `@/utils` - Utility functions
- `@/hooks` - Custom hooks

## 🎨 Theming

The design system supports light and dark modes through CSS variables. Customize colors in `src/styles/globals.css`:

```css
:root {
  --color-primary: #3b82f6;
  --color-success: #16a34a;
  --color-warning: #f59e0b;
  --color-danger: #b45b55;
  --color-info: #2563eb;
}
```

## 📝 Component Documentation

Each component folder includes a README.md with detailed usage instructions:
- `/src/components/ui/Checkbox/README.md`
- `/src/components/ui/DatePicker/README.md`
- `/src/components/ui/Dropdown/README.md`
- `/src/components/ui/RadioButton/README.md`
- `/src/components/ui/Select/README.md`
- `/src/components/ui/Sheet/README.md`
- `/src/components/ui/Table/README.md`
- `/src/components/form/README.md`

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom color variables and the `tailwindcss-animate` plugin.

### TypeScript
Strict mode enabled with path mapping for clean imports.

### Vite
Configured with React plugin and Tailwind CSS Vite plugin for optimal development experience.

## 📄 Migration Notes

This design system was successfully migrated from the HRIS Frontend application with the following changes:

1. **Dependencies**: All required npm packages installed (Radix UI, React Hook Form, Zod, etc.)
2. **Configuration**: Updated Vite, TypeScript, Tailwind, and PostCSS configs
3. **Styling**: Migrated global CSS with shadcn/ui theme variables
4. **Utilities**: Created cn utility in both `/lib/utils` and `/utils/cn` for compatibility
5. **Components**: Copied all UI and form components with folder structure intact
6. **Import Paths**: Standardized to use `@/utils/cn` for consistency
7. **Index Exports**: Maintained existing index files for clean imports
8. **Main Entry**: Updated to import globals.css and include Toaster component

## 🤝 Contributing

This is a design system template. Feel free to customize and extend it for your needs.

## 📜 License

MIT
