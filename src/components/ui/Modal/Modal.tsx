import * as React from "react";
import {
  ModalRoot,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
} from "../@raw-shadcn/Modal";
import { Button } from "../button";
import { cn } from "@/utils/cn";

export interface ModalProps {
  /** The element that triggers the modal (e.g., a button) */
  trigger?: React.ReactNode;

  /** Modal title */
  title?: string;

  /** Modal description/subtitle */
  description?: string;

  /** Main content of the modal - receives close function as prop if children is a function */
  children: React.ReactNode | ((close: () => void) => React.ReactNode);

  /** Whether to show the close button (X) in the top right */
  showCloseButton?: boolean;

  /** Whether to show the footer with action buttons */
  showFooter?: boolean;

  /** Callback when the primary action button is clicked */
  onPrimaryAction?: (close: () => void) => void;

  /** Callback when the secondary/cancel button is clicked */
  onSecondaryAction?: (close: () => void) => void;

  /** Text for the primary action button */
  primaryActionText?: string;

  /** Text for the secondary/cancel button */
  secondaryActionText?: string;

  /** Variant for the primary action button */
  primaryActionVariant?: "primary" | "success" | "danger" | "warning" | "info";

  /** Whether the primary action button is disabled */
  primaryActionDisabled?: boolean;

  /** Custom className for the modal content */
  className?: string;

  /** Custom className for the header */
  headerClassName?: string;

  /** Custom className for the footer */
  footerClassName?: string;

  /** Controlled open state */
  open?: boolean;

  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;

  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;

  /** Maximum width of the modal */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";

  /** Callback that receives the close function when modal opens */
  onOpen?: (close: () => void) => void;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
};

/**
 * Modal component - A modal dialog that overlays the page
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Modal
 *   trigger={<Button>Open Modal</Button>}
 *   title="Edit Profile"
 *   description="Make changes to your profile here"
 *   onPrimaryAction={(close) => {
 *     // Handle save
 *     close();
 *   }}
 *   primaryActionText="Save"
 * >
 *   <div>Modal content goes here</div>
 * </Modal>
 *
 * // With children as function to access close
 * <Modal
 *   trigger={<Button>Open Modal</Button>}
 *   title="Custom Modal"
 * >
 *   {(close) => (
 *     <div>
 *       <p>Content</p>
 *       <button onClick={close}>Custom Close</button>
 *     </div>
 *   )}
 * </Modal>
 *
 * // With onOpen callback
 * <Modal
 *   trigger={<Button>Open Modal</Button>}
 *   title="Modal with onOpen"
 *   onOpen={(close) => {
 *     // Store close function or perform actions when modal opens
 *     console.log('Modal opened');
 *   }}
 * >
 *   <div>Content</div>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  trigger,
  title,
  description,
  children,
  showCloseButton = true,
  showFooter = true,
  onPrimaryAction,
  onSecondaryAction,
  primaryActionText = "Save",
  secondaryActionText = "Cancel",
  primaryActionVariant = "primary",
  primaryActionDisabled = false,
  className,
  headerClassName,
  footerClassName,
  open,
  onOpenChange,
  defaultOpen,
  maxWidth = "lg",
  onOpen,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);

  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const closeModal = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleClose = React.useCallback(() => {
    closeModal();
    onSecondaryAction?.(closeModal);
  }, [onSecondaryAction, closeModal]);

  const handlePrimaryAction = React.useCallback(() => {
    onPrimaryAction?.(closeModal);
  }, [onPrimaryAction, closeModal]);

  // Call onOpen when modal opens
  React.useEffect(() => {
    if (isOpen && onOpen) {
      onOpen(closeModal);
    }
  }, [isOpen, onOpen, closeModal]);

  const renderChildren = () => {
    if (typeof children === "function") {
      return children(closeModal);
    }
    return children;
  };

  return (
    <ModalRoot open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>{trigger}</ModalTrigger>
      <ModalContent
        showCloseButton={showCloseButton}
        className={cn(maxWidthClasses[maxWidth], className)}
      >
        {(title || description) && (
          <ModalHeader className={headerClassName}>
            {title && <ModalTitle>{title}</ModalTitle>}
            {description && <ModalDescription>{description}</ModalDescription>}
          </ModalHeader>
        )}

        {renderChildren()}

        {showFooter && (onPrimaryAction || onSecondaryAction) && (
          <ModalFooter className={footerClassName}>
            {onSecondaryAction && (
              <ModalClose asChild>
                <Button variant="outline" onClick={handleClose}>
                  {secondaryActionText}
                </Button>
              </ModalClose>
            )}
            {onPrimaryAction && (
              <Button
                variant={primaryActionVariant}
                onClick={handlePrimaryAction}
                disabled={primaryActionDisabled}
              >
                {primaryActionText}
              </Button>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </ModalRoot>
  );
};

Modal.displayName = "Modal";

// Export raw components for advanced usage
export {
  ModalRoot,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
} from "../@raw-shadcn/Modal";
