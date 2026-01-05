import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';

const SheetRoot = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out data-[state=open]:fade-in',
      'data-[state=open]:duration-300 data-[state=closed]:duration-200',
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-white shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b border-gray-200 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t border-gray-200 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full border-r border-gray-200 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        right:
          'inset-y-0 right-0 h-full border-l border-gray-200 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
        full: '',
      },
    },
    defaultVariants: {
      side: 'right',
      size: 'md',
    },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  showCloseButton?: boolean;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(
  (
    {
      side = 'right',
      size = 'md',
      className,
      children,
      showCloseButton = true,
      ...props
    },
    ref
  ) => {
    const getSizeClasses = (side: string | null, size: string | null) => {
      const sideValue = side || 'right';
      const sizeValue = size || 'md';

      if (sideValue === 'left' || sideValue === 'right') {
        switch (sizeValue) {
          case 'sm':
            return 'w-80 sm:w-96';
          case 'md':
            return 'w-96 sm:w-[500px]';
          case 'lg':
            return 'w-[500px] sm:w-[600px]';
          case 'xl':
            return 'w-[600px] sm:w-[700px]';
          case 'full':
            return 'w-full';
          default:
            return 'w-96 sm:w-[500px]';
        }
      } else {
        switch (sizeValue) {
          case 'sm':
            return 'h-1/3';
          case 'md':
            return 'h-1/2';
          case 'lg':
            return 'h-2/3';
          case 'xl':
            return 'h-3/4';
          case 'full':
            return 'h-full';
          default:
            return 'h-1/2';
        }
      }
    };

    return (
      <SheetPortal>
        <SheetOverlay />
        <SheetPrimitive.Content
          ref={ref}
          className={cn(
            sheetVariants({ side }),
            getSizeClasses(side, size),
            'p-6',
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetPrimitive.Close>
          )}
        </SheetPrimitive.Content>
      </SheetPortal>
    );
  }
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left border-b border-gray-200 pb-2',
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-gray-900', className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm text-gray-600', className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

const SheetBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex-1 overflow-y-auto', className)} {...props} />
);
SheetBody.displayName = 'SheetBody';

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 border-t border-gray-200 pt-4 mt-6',
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

export interface SheetProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  showCloseButton?: boolean;
  showFooter?: boolean;
  onSave?: (close: () => void) => void;
  onClose?: () => void;
  saveText?: string;
  closeText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export const Sheet: React.FC<SheetProps> = ({
  children,
  trigger,
  title,
  description,
  side = 'right',
  size = 'md',
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  showCloseButton = true,
  showFooter = true,
  onSave,
  onClose,
  saveText = 'Save',
  closeText = 'Close',
  defaultOpen,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    onClose?.();
    setIsOpen(false);
  }, [onClose]);

  const handleSave = React.useCallback(() => {
    onSave?.(() => {
      setIsOpen(false);
    });
  }, [onSave]);

  return (
    <div className={cn('relative', className)}>
      <SheetRoot
        open={isOpen}
        onOpenChange={setIsOpen}
        defaultOpen={defaultOpen}
      >
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          side={side}
          size={size}
          showCloseButton={showCloseButton}
          className={cn('flex flex-col', contentClassName)}
        >
          <SheetHeader className={cn('flex-shrink-0', headerClassName)}>
            <SheetTitle>{title}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>

          <SheetBody className="flex-1">{children}</SheetBody>
          {showFooter && (
            <SheetFooter className={cn('flex-shrink-0', footerClassName)}>
              <div className="flex flex-col gap-2 w-full sm:flex-row">
                {onSave && (
                  <Button onClick={handleSave} className="gap-2">
                    {saveText}
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="sm:order-first"
                  onClick={handleClose}
                >
                  {closeText}
                </Button>
              </div>
            </SheetFooter>
          )}
        </SheetContent>
      </SheetRoot>
    </div>
  );
};

Sheet.displayName = 'Sheet';

// Export additional components for advanced usage if needed
export {
  SheetRoot,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetOverlay,
  SheetPortal,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
};
