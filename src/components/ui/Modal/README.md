# Modal Component

A modal component built on top of Radix UI's Dialog primitive. Provides a flexible and accessible way to display content in an overlay.

## Usage

### Basic Modal

```tsx
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';

<Modal
  trigger={<Button>Open Modal</Button>}
  title="Modal Title"
  description="Modal description"
  showFooter={false}
>
  <div>Your content here</div>
</Modal>
```

### Modal with Actions

```tsx
<Modal
  trigger={<Button variant="primary">Edit Profile</Button>}
  title="Edit Profile"
  description="Make changes to your profile here"
  onPrimaryAction={(close) => {
    // Handle save
    console.log('Saving...');
    close(); // Close the modal
  }}
  onSecondaryAction={(close) => {
    console.log('Cancelled');
    close();
  }}
  primaryActionText="Save Changes"
  secondaryActionText="Cancel"
  primaryActionVariant="primary"
>
  <form>
    {/* Your form fields here */}
  </form>
</Modal>
```

### Modal with Close Function in Children

You can access the close function directly in your content by passing a function as children:

```tsx
<Modal
  trigger={<Button>Open Modal</Button>}
  title="Custom Close"
  showFooter={false}
>
  {(close) => (
    <div>
      <p>Your content here</p>
      <button onClick={close}>Custom Close Button</button>
      <button onClick={async () => {
        await saveData();
        close(); // Close after async operation
      }}>
        Save and Close
      </button>
    </div>
  )}
</Modal>
```

### Modal with onOpen Callback

Get access to the close function when the modal opens:

```tsx
const [closeModal, setCloseModal] = useState<(() => void) | null>(null);

<Modal
  trigger={<Button>Open Modal</Button>}
  title="Modal with onOpen"
  onOpen={(close) => {
    setCloseModal(() => close);
    console.log('Modal opened, close function stored');
  }}
>
  <div>Your content here</div>
</Modal>

{/* Close modal from outside */}
{closeModal && (
  <button onClick={closeModal}>Close from Outside</button>
)}
```

### Confirmation Modal

```tsx
<Modal
  trigger={<Button variant="danger">Delete</Button>}
  title="Are you sure?"
  description="This action cannot be undone."
  onPrimaryAction={(close) => {
    // Handle delete
    deleteItem();
    close();
  }}
  onSecondaryAction={(close) => close()}
  primaryActionText="Yes, delete"
  secondaryActionText="Cancel"
  primaryActionVariant="danger"
  maxWidth="md"
>
  <p>This will permanently delete the item.</p>
</Modal>
```

### Controlled Modal

```tsx
const [open, setOpen] = useState(false);

<Modal
  trigger={<Button>Open</Button>}
  title="Controlled Modal"
  open={open}
  onOpenChange={setOpen}
  onPrimaryAction={(close) => {
    // Handle action
    close();
  }}
>
  <div>Content</div>
</Modal>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `React.ReactNode` | - | Element that triggers the modal (required) |
| `title` | `string` | - | Modal title |
| `description` | `string` | - | Modal description/subtitle |
| `children` | `React.ReactNode \| (close: () => void) => React.ReactNode` | - | Main content of the modal. Can be a function that receives the close function (required) |
| `showCloseButton` | `boolean` | `true` | Show X button in top right |
| `showFooter` | `boolean` | `true` | Show footer with action buttons |
| `onPrimaryAction` | `(close: () => void) => void` | - | Callback for primary action button. Receives close function |
| `onSecondaryAction` | `(close: () => void) => void` | - | Callback for secondary action button. Receives close function |
| `primaryActionText` | `string` | `"Save"` | Text for primary action button |
| `secondaryActionText` | `string` | `"Cancel"` | Text for secondary action button |
| `primaryActionVariant` | `'primary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | `"primary"` | Variant for primary action button |
| `primaryActionDisabled` | `boolean` | `false` | Disable primary action button |
| `className` | `string` | - | Custom class for modal content |
| `headerClassName` | `string` | - | Custom class for header |
| `footerClassName` | `string` | - | Custom class for footer |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes |
| `defaultOpen` | `boolean` | `false` | Default open state (uncontrolled) |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `"lg"` | Maximum width of modal |
| `onOpen` | `(close: () => void) => void` | - | Callback when modal opens. Receives close function |

## Features

- ✅ Accessible (ARIA compliant via Radix UI)
- ✅ Keyboard navigation (Esc to close)
- ✅ Click outside to close
- ✅ Focus trap inside modal
- ✅ Customizable sizes
- ✅ Customizable action buttons
- ✅ Controlled and uncontrolled modes
- ✅ Smooth animations
- ✅ Backdrop blur effect
- ✅ Close function accessible in children
- ✅ Close function accessible via onOpen callback
- ✅ Close function passed to all action callbacks

## Close Function Usage

There are three ways to access the close function:

### 1. In Action Callbacks (onPrimaryAction, onSecondaryAction)

```tsx
<Modal
  onPrimaryAction={(close) => {
    saveData();
    close(); // Close modal after saving
  }}
>
  ...
</Modal>
```

### 2. As Children Function Parameter

```tsx
<Modal>
  {(close) => (
    <div>
      <button onClick={close}>Close</button>
    </div>
  )}
</Modal>
```

### 3. Via onOpen Callback

```tsx
const [modalClose, setModalClose] = useState(null);

<Modal
  onOpen={(close) => setModalClose(() => close)}
>
  ...
</Modal>

{/* Use close function anywhere */}
<button onClick={modalClose}>Close Modal</button>
```

## Advanced Usage

For more control, you can use the raw Radix components directly:

```tsx
import {
  ModalRoot,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
} from '@/components/ui/Modal';

<ModalRoot>
  <ModalTrigger>Open</ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Title</ModalTitle>
      <ModalDescription>Description</ModalDescription>
    </ModalHeader>
    <div>Custom content</div>
    <ModalFooter>
      <ModalClose>Close</ModalClose>
    </ModalFooter>
  </ModalContent>
</ModalRoot>
```

## Accessibility

- Uses Radix UI's Dialog primitive for accessibility
- Supports keyboard navigation (Tab, Shift+Tab, Esc)
- Properly manages focus trap
- Includes ARIA attributes
- Screen reader friendly

## Notes

- The modal is rendered in a portal (appended to document.body)
- Background scrolling is prevented when modal is open
- The modal is centered on the screen
- Click outside or press Esc to close (unless showCloseButton is false and no secondary action is provided)
- The close function is stable and won't change between renders
