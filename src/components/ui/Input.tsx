import * as React from 'react';

import { cn } from '@/utils/cn';

export interface InputProps extends React.ComponentProps<'input'> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  debounce?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      leadingIcon,
      trailingIcon,
      debounce,
      onChange,
      ...props
    },
    ref
  ) => {
    const hasLeadingIcon = !!leadingIcon;
    const hasTrailingIcon = !!trailingIcon;

    // Debounce implementation
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (debounce && onChange) {
          // Clear previous timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          // Set new timeout
          timeoutRef.current = setTimeout(() => {
            onChange(event);
          }, debounce);
        } else {
          onChange?.(event);
        }
      },
      [debounce, onChange]
    );

    // Cleanup timeout on unmount
    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    if (hasLeadingIcon || hasTrailingIcon) {
      return (
        <div className="relative flex items-center">
          {hasLeadingIcon && (
            <div className="absolute left-3 z-10 flex items-center justify-center text-gray-500 pointer-events-none">
              {leadingIcon}
            </div>
          )}
          <input
            autoComplete="off"
            type={type}
            className={cn(
              'flex h-10 py-2 text-black w-full rounded-md border border-gray-300 bg-background text-base ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              hasLeadingIcon
                ? 'pl-10 pr-3'
                : hasTrailingIcon
                  ? 'pl-3 pr-10'
                  : 'px-3',
              hasLeadingIcon && hasTrailingIcon && 'px-10',
              className
            )}
            ref={ref}
            {...props}
            onChange={handleChange}
          />
          {hasTrailingIcon && (
            <div className="absolute right-3 z-10 flex items-center justify-center text-gray-500 pointer-events-none">
              {trailingIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        autoComplete="off"
        type={type}
        className={cn(
          'flex h-10 px-3 py-2 w-full rounded-md border border-gray-300 bg-background text-base ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
        onChange={handleChange}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
