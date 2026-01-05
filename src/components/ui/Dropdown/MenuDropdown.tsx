import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  ShadDropdownMenu,
  ShadDropdownMenuContent,
  ShadDropdownMenuItem,
  ShadDropdownMenuSeparator,
  ShadDropdownMenuLabel,
  ShadDropdownMenuTrigger,
} from '../@raw-shadcn/Dropdown/ShadDropdownMenu';
import { cn } from '@/utils/cn';
import { Button } from '../button';

export type MenuDropdownItem =
  | {
      label: string;
      onClick: () => void;
      disabled?: boolean;
      icon?: React.ReactNode;
      destructive?: boolean;
    }
  | {
      type: 'separator';
    }
  | {
      type: 'label';
      label: string;
    };

export type MenuDropdownProps = {
  items: MenuDropdownItem[];
  children?: React.ReactNode;
  triggerText?: string;
  triggerIcon?: React.ReactNode;
  variant?:
    | 'default'
    | 'outline'
    | 'ghost'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'primary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  disabled?: boolean;
  showChevron?: boolean;
};

export const MenuDropdown = React.forwardRef<
  React.ElementRef<typeof ShadDropdownMenuTrigger>,
  MenuDropdownProps
>(
  (
    {
      items,
      children,
      triggerText,
      triggerIcon,
      variant = 'default',
      size = 'default',
      align = 'end',
      side = 'bottom',
      className,
      triggerClassName,
      contentClassName,
      disabled = false,
      showChevron = true,
      ...props
    },
    ref
  ) => {
    // If children is provided, use it as trigger, otherwise create button trigger
    const TriggerContent = children ? (
      children
    ) : (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled}
        className={cn('gap-2', triggerClassName)}
        {...props}
      >
        {triggerIcon}
        {triggerText && <span>{triggerText}</span>}
        {showChevron && <ChevronDown className="h-4 w-4 opacity-50" />}
      </Button>
    );

    return (
      <div className={cn('relative', className)}>
        <ShadDropdownMenu>
          <ShadDropdownMenuTrigger asChild>
            {TriggerContent}
          </ShadDropdownMenuTrigger>
          <ShadDropdownMenuContent
            align={align}
            side={side}
            className={cn('min-w-[200px]', contentClassName)}
          >
            {items.map((item, index) => {
              if ('type' in item) {
                if (item.type === 'separator') {
                  return (
                    <ShadDropdownMenuSeparator key={`separator-${index}`} />
                  );
                }
                if (item.type === 'label') {
                  return (
                    <ShadDropdownMenuLabel key={`label-${index}`}>
                      {item.label}
                    </ShadDropdownMenuLabel>
                  );
                }
              }

              const menuItem = item as Extract<
                MenuDropdownItem,
                { label: string; onClick: () => void }
              >;

              return (
                <ShadDropdownMenuItem
                  key={`item-${index}`}
                  disabled={menuItem.disabled}
                  onClick={menuItem.onClick}
                  className={cn(
                    'cursor-pointer gap-2',
                    menuItem.destructive && 'text-red-600 focus:text-red-600'
                  )}
                >
                  {menuItem.icon}
                  {menuItem.label}
                </ShadDropdownMenuItem>
              );
            })}
          </ShadDropdownMenuContent>
        </ShadDropdownMenu>
      </div>
    );
  }
);

MenuDropdown.displayName = 'MenuDropdown';
