import * as React from 'react';
import { Switch as ShadSwitch } from '../@raw-shadcn/switch';
import { cn } from '@/utils/cn';

export type SwitchProps = {
  label?: string;
  description?: string;
  checked?: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  switchClassName?: string;
  labelClassName?: string;
  size?: 'default' | 'sm' | 'lg';
  name?: string;
  id?: string;
};

const sizeClasses = {
  sm: 'h-5 w-9 data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300',
  default: 'h-6 w-11 data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300',
  lg: 'h-7 w-14 data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300',
};

const thumbSizeClasses = {
  sm: 'h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
  default: 'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
  lg: 'h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0',
};

export const Switch = React.forwardRef<
  React.ElementRef<typeof ShadSwitch>,
  SwitchProps
>(
  (
    {
      label,
      description,
      checked,
      onCheckedChange,
      disabled = false,
      required = false,
      className,
      switchClassName,
      labelClassName,
      size = 'default',
      name,
      id,
      ...props
    },
    ref
  ) => {
    const switchId = id || `switch-${name || Math.random()}`;

    return (
      <div
        className={cn(
          'flex items-start space-x-3',
          className,
          {
            'items-center': !description,
          }
        )}
      >
        <ShadSwitch
          ref={ref}
          id={switchId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          name={name}
          className={cn(sizeClasses[size], switchClassName)}
          {...props}
        />
        {(label || description) && (
          <label
            htmlFor={switchId}
            className="flex flex-col peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            {label && (
              <div
                className={cn(
                  'text-sm font-medium leading-none',
                  labelClassName
                )}
              >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </div>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;

