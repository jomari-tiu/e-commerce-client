---
alwaysApply: true
---

# Co-location Pattern Rules for HRIS Project

## Core Principle

Follow the co-location pattern: files used in only ONE place stay LOCAL, files used in 2+ places go to SHARED folders.

## The Golden Rule

```
IF used in 1 place  → Keep it LOCAL (inside feature folder)
IF used in 2+ places → Move to SHARED folder
When in doubt → Start LOCAL, move when needed
```

## File Organization Rules

### 1. Creating New Files

- **ALWAYS** start by creating files inside the feature folder
- **NEVER** create shared files prematurely
- **ONLY** move to shared folders when a second usage appears

### 2. Folder Structure

```
pages/[feature-name]/
├── _page.tsx           # Main page component (required)
├── components/         # Components ONLY used in this page
├── hooks/              # Hooks ONLY used in this page
├── utils/              # Utils/helpers ONLY used in this page
├── schemas.ts          # Zod validation schemas
└── types.ts            # TypeScript types
```

### 3. Shared Folders Usage

Only use these for code used in 2+ features:

- `components/` - Shared UI components (Button, Input, etc.)
- `hooks/` - Shared custom hooks (useAuth, useToast, etc.)
- `utils/` - Shared utility functions
- `lib/` - Third-party library configurations
- `types/` - Shared TypeScript types

### 4. Naming Conventions

- Page files: `_page.tsx` (underscore prefix)
- Components: `ComponentName.tsx` (PascalCase)
- Hooks: `useHookName.ts` (camelCase with 'use' prefix)
- Utils: `utilName.ts` or `helpers.ts` (camelCase)
- Types: `types.ts` or `TypeName.ts`
- Schemas: `schemas.ts`

## Decision Tree

When creating a new file, ask:

**Is it a component?**

- Used in 1 place? → `pages/[feature]/components/ComponentName.tsx`
- Used in 2+ places? → `components/ui/ComponentName.tsx`

**Is it a hook?**

- Used in 1 place? → `pages/[feature]/hooks/useHookName.ts`
- Used in 2+ places? → `hooks/useHookName.ts`

**Is it a utility/helper?**

- Used in 1 place? → `pages/[feature]/utils/utilName.ts`
- Used in 2+ places? → `utils/utilName.ts`

**Is it a type/interface?**

- Used in 1 place? → `pages/[feature]/types.ts`
- Used in 2+ places? → `types/TypeName.ts`

## Common Mistakes to Avoid

### ❌ DON'T: Premature Abstraction

```typescript
// BAD: Creating shared util before second usage
src / utils / formatUserName.ts; // Only used in users page

// GOOD: Keep local until needed elsewhere
src / pages / users / utils / formatUserName.ts;
```

### ❌ DON'T: Type-Based Organization

```typescript
// BAD: Organizing by file type
src/components/
  ├── LoginForm.tsx      (only used in login)
  ├── UserCard.tsx       (only used in users)

// GOOD: Co-location by feature
src/pages/login/components/LoginForm.tsx
src/pages/users/components/UserCard.tsx
```

### ❌ DON'T: Create Empty Folders

```typescript
// BAD: Creating folders "just in case"
src/pages/simple-page/
  ├── _page.tsx
  ├── components/     ❌ Empty
  ├── hooks/          ❌ Empty

// GOOD: Only create what you need
src/pages/simple-page/
  └── _page.tsx       ✅
```

## Code Generation Instructions

When generating new features:

1. **Always create feature folder first**

   ```
   pages/[feature-name]/
   ```

2. **Create \_page.tsx as entry point**

   ```typescript
   export default function FeaturePage() {
     return <div>Feature content</div>;
   }
   ```

3. **Add subfolders ONLY as needed**
   - Need custom component? Create `components/` folder
   - Need custom hook? Create `hooks/` folder
   - Need helpers? Create `utils/` folder

4. **Follow naming conventions strictly**
   - Page: `_page.tsx`
   - Component: `ComponentName.tsx`
   - Hook: `useFeatureName.ts`
   - Schema: `schemas.ts`

5. **Never create files in shared folders unless:**
   - You can confirm it's used in 2+ features
   - You document where it's used in code comments

## Imports

Use absolute imports with @ alias:

```typescript
// ✅ GOOD
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

// ❌ BAD
import { Button } from "../../../components/ui/button";
```

## Examples

### Example 1: Creating Login Page

```
pages/login/
├── _page.tsx                    # Main login page
├── components/
│   └── LoginForm.tsx            # Form only used in login
└── schemas.ts                   # Login validation schema
```

### Example 2: Creating Employee Management

```
pages/employees/
├── _page.tsx                    # Employee list page
├── components/
│   ├── EmployeeTable.tsx        # Table only used here
│   ├── EmployeeFilters.tsx      # Filters only used here
│   └── EmployeeCard.tsx         # Card only used here
├── hooks/
│   └── useEmployees.ts          # Hook only used here
├── utils/
│   └── employeeHelpers.ts       # Helpers only used here
└── schemas.ts                   # Employee validation
```

### Example 3: Shared Component

```
components/ui/
└── Button.tsx                   # Used in 10+ pages
```

## Enforcement

Before creating any file, verify:

- [ ] Is this file used ONLY in this feature? → Create locally
- [ ] Is this file used in 2+ features? → Create in shared
- [ ] Not sure? → Start locally, move later if needed

## Migration

When a local file becomes used in multiple places:

1. Move file from `pages/[feature]/` to appropriate shared folder
2. Update all imports
3. Document where it's used in code comments

## Documentation

Add comments for shared files:

```typescript
/**
 * Shared Button component
 * Used in: Login, Dashboard, Employees, Settings
 * Last updated: 2025-11-16
 */
export const Button = () => { ... }
```

## Remember

**The only rule: 1 usage = LOCAL, 2+ usages = SHARED**

When in doubt, start local. It's easier to move a file to shared later than to clean up prematurely shared files.

---

## Additional Project Rules

### TypeScript Rules

- Always use TypeScript strict mode
- Never use `any` type - use `unknown` or proper types
- Always define return types for functions
- Use type inference where possible, explicit types where clarity is needed
- Prefer interfaces for object shapes, types for unions/intersections

### React Best Practices

- Use functional components with hooks (no class components)
- Always destructure props in function parameters
- Use proper dependency arrays in useEffect/useCallback/useMemo
- Prefer composition over prop drilling - use Context for deep state
- Keep components small and focused (< 200 lines)

### Error Handling

- Always wrap async operations in try-catch blocks
- Use toast notifications for user-facing errors
- Log errors to console in development
- Never swallow errors silently
- Provide user-friendly error messages

### Form Handling

- Use React Hook Form with Zod validation
- Always use FormWrapper component for forms
- Create schemas.ts file for all validation schemas
- Show field-level errors with proper error messages
- Disable submit button while form is submitting

### API Integration

- Use TanStack Query (React Query) for all API calls
- Define API functions in lib/[feature]-api.ts files
- Use proper loading and error states
- Implement optimistic updates where appropriate
- Cache API responses with appropriate staleTime

### State Management

- Use React Context for global state (auth, theme, etc.)
- Use local state (useState) for component-specific state
- Use TanStack Query for server state
- Avoid prop drilling beyond 2 levels
- Keep state as close to where it's used as possible

### Styling Rules

- Use Tailwind CSS for all styling
- Follow mobile-first approach (design for mobile, then desktop)
- Use the design system colors and spacing from tailwind.config
- Prefer utility classes over custom CSS
- Group related utility classes together for readability

### Code Quality

- Write self-documenting code with clear variable names
- Add comments for complex logic or business rules
- Keep functions small (< 30 lines ideally)
- Use early returns to reduce nesting
- Avoid code duplication - extract to functions/components

### Security

- Never commit sensitive data (API keys, passwords, tokens)
- Always validate and sanitize user input
- Use environment variables for configuration
- Implement proper authentication checks
- Use HTTPS for all API calls in production

### Performance

- Lazy load routes and heavy components
- Memoize expensive calculations with useMemo
- Use useCallback for functions passed as props
- Optimize images and assets
- Implement pagination for large lists

### Testing (When Implemented)

- Write unit tests for utility functions
- Write integration tests for API calls
- Test error scenarios and edge cases
- Aim for >80% code coverage
- Use React Testing Library for component tests

### Git Commit Messages

- Use conventional commits format: type(scope): message
- Types: feat, fix, docs, style, refactor, test, chore
- Keep first line under 72 characters
- Add detailed description if needed
- Reference issue numbers when applicable

### Documentation

- Add JSDoc comments for shared/exported functions
- Document complex algorithms and business logic
- Keep README.md up to date
- Document API endpoints and their usage
- Add code examples for reusable components

---

## Project-Specific Rules

### HRIS Application

- Employee data is sensitive - always validate permissions
- Use proper role-based access control (admin, hr, employee)
- Implement audit logs for sensitive operations
- Follow data privacy regulations
- Validate all employee-related operations server-side

### Authentication

- Store JWT tokens in localStorage (already implemented)
- Auto-refresh tokens on 401 responses
- Clear all auth data on logout
- Redirect to login on authentication failures
- Show appropriate loading states during auth operations

### Forms and Validation

- All forms must have loading states
- Show validation errors inline with fields
- Disable submit button during API calls
- Show success messages after successful operations
- Clear form on successful submission (if appropriate)

### UI/UX Guidelines

- Show loading indicators for operations >300ms
- Provide feedback for all user actions
- Use toast notifications for success/error messages
- Implement proper empty states
- Add confirmation dialogs for destructive actions

---

## When to Break These Rules

Document exceptions with comments:

```typescript
// EXCEPTION: Using any here because third-party library types are incorrect
// TODO: Create proper type definitions
const data: any = externalLibrary.getData();
```

Always discuss breaking rules with the team first.
