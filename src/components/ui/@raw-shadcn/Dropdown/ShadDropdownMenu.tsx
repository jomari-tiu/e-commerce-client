import * as React from 'react';
import * as ShadDropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';

import { cn } from '@/utils/cn';

const ShadDropdownMenu = ShadDropdownMenuPrimitive.Root;

const ShadDropdownMenuTrigger = ShadDropdownMenuPrimitive.Trigger;

const ShadDropdownMenuGroup = ShadDropdownMenuPrimitive.Group;

const ShadDropdownMenuPortal = ShadDropdownMenuPrimitive.Portal;

const ShadDropdownMenuSub = ShadDropdownMenuPrimitive.Sub;

const ShadDropdownMenuRadioGroup = ShadDropdownMenuPrimitive.RadioGroup;

const ShadDropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ShadDropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<
    typeof ShadDropdownMenuPrimitive.SubTrigger
  > & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ShadDropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </ShadDropdownMenuPrimitive.SubTrigger>
));
ShadDropdownMenuSubTrigger.displayName =
  ShadDropdownMenuPrimitive.SubTrigger.displayName;

const ShadDropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ShadDropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ShadDropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ShadDropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out data-[state=open]:zoom-in origin-[--radix-dropdown-menu-content-transform-origin]',
      className
    )}
    {...props}
  />
));
ShadDropdownMenuSubContent.displayName =
  ShadDropdownMenuPrimitive.SubContent.displayName;

const ShadDropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof ShadDropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ShadDropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <ShadDropdownMenuPrimitive.Portal>
    <ShadDropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border border-gray-200 bg-white text-gray-900 shadow-lg backdrop-blur-sm',
        // Enhanced animations
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out data-[state=open]:fade-in',
        'data-[state=closed]:zoom-out data-[state=open]:zoom-in',
        'data-[state=open]:duration-200 data-[state=closed]:duration-150',
        'origin-[--radix-select-content-transform-origin]',

        className
      )}
      {...props}
    />
  </ShadDropdownMenuPrimitive.Portal>
));
ShadDropdownMenuContent.displayName =
  ShadDropdownMenuPrimitive.Content.displayName;

const ShadDropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof ShadDropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ShadDropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ShadDropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
ShadDropdownMenuItem.displayName = ShadDropdownMenuPrimitive.Item.displayName;

const ShadDropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ShadDropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ShadDropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ShadDropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ShadDropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ShadDropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ShadDropdownMenuPrimitive.CheckboxItem>
));
ShadDropdownMenuCheckboxItem.displayName =
  ShadDropdownMenuPrimitive.CheckboxItem.displayName;

const ShadDropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ShadDropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ShadDropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ShadDropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ShadDropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ShadDropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ShadDropdownMenuPrimitive.RadioItem>
));
ShadDropdownMenuRadioItem.displayName =
  ShadDropdownMenuPrimitive.RadioItem.displayName;

const ShadDropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof ShadDropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ShadDropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ShadDropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
ShadDropdownMenuLabel.displayName = ShadDropdownMenuPrimitive.Label.displayName;

const ShadDropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ShadDropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ShadDropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ShadDropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
ShadDropdownMenuSeparator.displayName =
  ShadDropdownMenuPrimitive.Separator.displayName;

const ShadDropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  );
};
ShadDropdownMenuShortcut.displayName = 'ShadDropdownMenuShortcut';

export {
  ShadDropdownMenu,
  ShadDropdownMenuTrigger,
  ShadDropdownMenuContent,
  ShadDropdownMenuItem,
  ShadDropdownMenuCheckboxItem,
  ShadDropdownMenuRadioItem,
  ShadDropdownMenuLabel,
  ShadDropdownMenuSeparator,
  ShadDropdownMenuShortcut,
  ShadDropdownMenuGroup,
  ShadDropdownMenuPortal,
  ShadDropdownMenuSub,
  ShadDropdownMenuSubContent,
  ShadDropdownMenuSubTrigger,
  ShadDropdownMenuRadioGroup,
};
