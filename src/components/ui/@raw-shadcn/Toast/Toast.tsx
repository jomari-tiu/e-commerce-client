import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X, Loader2 } from 'lucide-react';

import { cn } from '@/utils/cn';
import { ToastTimer } from './ToastTimer';

const ToastProvider = ToastPrimitives.Provider;

const toastPositionVariants = cva(
  'fixed z-[100] flex max-h-screen w-full flex-col p-4 md:max-w-[420px] gap-2',
  {
    variants: {
      position: {
        'top-right': 'top-0 right-0 flex-col',
        'top-left': 'top-0 left-0 flex-col',
        'bottom-right': 'bottom-0 right-0 flex-col-reverse',
        'bottom-left': 'bottom-0 left-0 flex-col-reverse',
        'top-center': 'top-0 left-1/2 -translate-x-1/2 flex-col',
        'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse',
      },
    },
    defaultVariants: {
      position: 'top-right',
    },
  }
);

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> &
    VariantProps<typeof toastPositionVariants>
>(({ className, position, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      toastPositionVariants({ position }),
      `toast-viewport-${position}`,
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg backdrop-blur-sm will-change-transform data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border-gray-200 bg-white/95 text-gray-900 shadow-md',
        success:
          'border-green-200 bg-green-50/95 text-green-800 shadow-green-100',
        danger: 'border-red-200 bg-red-50/95 text-red-800 shadow-red-100',
        warning:
          'border-yellow-200 bg-yellow-50/95 text-yellow-800 shadow-yellow-100',
        info: 'border-blue-200 bg-blue-50/95 text-blue-800 shadow-blue-100',
        primary:
          'border-primary/20 bg-primary/5 text-primary-foreground shadow-primary/10',
      },
      loading: {
        true: 'cursor-wait',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      loading: false,
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> & {
      loading?: boolean;
      duration?: number;
      showTimer?: boolean;
    }
>(
  (
    { className, variant, loading, duration, showTimer = true, ...props },
    ref
  ) => {
    const [isPaused, setIsPaused] = React.useState(false);

    return (
      <ToastPrimitives.Root
        ref={ref}
        className={cn(
          toastVariants({ variant, loading }),
          'relative overflow-hidden',
          className
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        {...props}
      >
        {props.children}
        {showTimer && duration && duration > 0 && !loading && (
          <ToastTimer
            duration={duration}
            variant={variant || 'default'}
            isPaused={isPaused}
          />
        )}
      </ToastPrimitives.Root>
    );
  }
);
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className
    )}
    data-toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title> & {
    loading?: boolean;
  }
>(({ className, loading, children, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold flex items-center gap-2', className)}
    {...props}
  >
    {loading && (
      <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" aria-label="Loading" />
    )}
    {children}
  </ToastPrimitives.Title>
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastTimer,
  toastPositionVariants,
};
