import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  ShadSelect,
  ShadSelectContent,
  ShadSelectGroup,
  ShadSelectItem,
  ShadSelectLabel,
  ShadSelectSeparator,
  ShadSelectTrigger,
  ShadSelectValue,
} from '../@raw-shadcn/Select/ShadSelect';
import { cn } from '@/utils/cn';
import { Text } from '../Text';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
  separator?: boolean; // Add separator after this item
};

export type SelectValue = {
  value: string;
  label: string;
};

export type SelectProps = {
  options: SelectOption[];
  onValueChange: (selectedOption: SelectValue | null) => void;
  placeholder?: string;
  label?: string;
  value?: SelectValue | null;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  size?: 'default' | 'sm' | 'lg';
  required?: boolean;
  name?: string;
};

export const Select = React.forwardRef<
  React.ElementRef<typeof ShadSelectTrigger>,
  SelectProps
>(function Select(
  {
    options,
    onValueChange,
    placeholder = 'Select an option',
    label,
    value,
    disabled = false,
    className,
    triggerClassName,
    contentClassName,
    size = 'default',
    required = false,
    name,
    ...props
  },
  ref
) {
  const selectedOption = options.find(option => option.value === value?.value);

  const sizeClasses = {
    sm: 'h-8 text-xs',
    default: 'h-10 text-sm',
    lg: 'h-12 text-base',
  };

  const handleValueChange = (selectedValue: string) => {
    const option = options.find(opt => opt.value === selectedValue);
    if (option) {
      onValueChange({ value: option.value, label: option.label });
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
          <Text size="sm" color="accent">
            {label}
          </Text>
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <ShadSelect
        value={value?.value || ''}
        onValueChange={handleValueChange}
        disabled={disabled}
        name={name}
        required={required}
        {...props}
      >
        <ShadSelectTrigger
          ref={ref}
          className={cn(
            sizeClasses[size],
            !selectedOption ? 'text-black' : 'text-muted-foreground',
            triggerClassName
          )}
        >
          <ShadSelectValue placeholder={placeholder} />
        </ShadSelectTrigger>
        <ShadSelectContent
          className={cn(
            'min-w-[var(--radix-select-trigger-width)]',
            contentClassName
          )}
        >
          {options.map((option, index) => (
            <React.Fragment key={option.value}>
              <ShadSelectItem
                value={option.value}
                disabled={option.disabled}
                className={cn(
                  'cursor-pointer',
                  value?.value === option.value &&
                    'bg-accent text-accent-foreground'
                )}
              >
                {option.label}
              </ShadSelectItem>
              {option.separator && index < options.length - 1 && (
                <ShadSelectSeparator />
              )}
            </React.Fragment>
          ))}
        </ShadSelectContent>
      </ShadSelect>
    </div>
  );
});

Select.displayName = 'Select';

// Alternative component with more advanced features
export type AdvancedSelectOption =
  | SelectOption
  | { type: 'separator' }
  | { type: 'label'; label: string };

export type AdvancedSelectProps = Omit<
  SelectProps,
  'options' | 'onValueChange'
> & {
  options: AdvancedSelectOption[];
  onValueChange?: (selectedOption: SelectValue | null) => void;
  searchable?: boolean;
  multiple?: boolean;
  values?: SelectValue[]; // For multiple selection
  onMultiValueChange?: (values: SelectValue[]) => void;
  maxHeight?: string;
  clearable?: boolean;
  onClear?: () => void;
};

export const SelectMenu = React.forwardRef<
  React.ElementRef<typeof ShadSelectTrigger>,
  AdvancedSelectProps
>(function SelectMenu(
  {
    options,
    onValueChange,
    onMultiValueChange,
    placeholder = 'Select option(s)',
    label,
    value,
    values = [],
    disabled = false,
    className,
    triggerClassName,
    contentClassName,
    size = 'default',
    required = false,
    name,
    searchable = false,
    multiple = false,
    maxHeight = '300px',
    clearable = false,
    onClear,
    ...props
  },
  ref
) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const filteredOptions = React.useMemo(() => {
    if (!searchable || !searchTerm) return options;

    return options.filter(option => {
      if ('type' in option) return true; // Keep separators and labels
      return option.label.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [options, searchTerm, searchable]);

  const getDisplayText = () => {
    if (multiple) {
      if (values.length === 0) return placeholder;
      if (values.length === 1) {
        return values[0].label;
      }
      return `${values.length} selected`;
    }

    return value ? value.label : placeholder;
  };

  const handleSelect = (optionValue: string) => {
    const option = options.find(
      opt => 'value' in opt && opt.value === optionValue
    ) as SelectOption;
    if (!option) return;

    const selectValue: SelectValue = {
      value: option.value,
      label: option.label,
    };

    if (multiple) {
      const isSelected = values.some(v => v.value === optionValue);
      const newValues = isSelected
        ? values.filter(v => v.value !== optionValue)
        : [...values, selectValue];
      onMultiValueChange?.(newValues);
    } else {
      onValueChange?.(selectValue);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    if (multiple) {
      onMultiValueChange?.([]);
    } else {
      onValueChange?.(null);
    }
    onClear?.();
  };

  const sizeClasses = {
    sm: 'h-8 text-xs',
    default: 'h-10 text-sm',
    lg: 'h-12 text-base',
  };

  // For multiple selection, we need to use a custom implementation since Radix Select doesn't support multi-select
  if (multiple) {
    return (
      <div className={cn('w-full', className)}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 placeholder:text-gray-500 hover:border-gray-400 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
              sizeClasses[size],
              !values.length && 'text-muted-foreground',
              triggerClassName
            )}
            {...props}
          >
            <span className="truncate">{getDisplayText()}</span>
            <div className="flex items-center gap-2">
              {clearable && values.length > 0 && (
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </button>

          {isOpen && (
            <div
              className={cn(
                'absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg',
                contentClassName
              )}
              style={{ maxHeight }}
            >
              {searchable && (
                <>
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="border-t border-gray-200" />
                </>
              )}

              <div className="max-h-60 overflow-y-auto p-1">
                {filteredOptions.map((option, index) => {
                  if ('type' in option) {
                    if (option.type === 'separator') {
                      return (
                        <div
                          key={`separator-${index}`}
                          className="border-t border-gray-200 my-1"
                        />
                      );
                    }
                    if (option.type === 'label') {
                      return (
                        <div
                          key={`label-${index}`}
                          className="py-1.5 pl-8 pr-2 text-sm font-semibold text-gray-700"
                        >
                          {option.label}
                        </div>
                      );
                    }
                  }

                  const selectOption = option as SelectOption;
                  const isSelected = values.some(
                    v => v.value === selectOption.value
                  );

                  return (
                    <button
                      key={selectOption.value}
                      type="button"
                      disabled={selectOption.disabled}
                      onClick={() => handleSelect(selectOption.value)}
                      className={cn(
                        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50 focus:bg-primary-50 focus:text-primary-700 disabled:pointer-events-none disabled:opacity-50',
                        isSelected && 'bg-accent text-accent-foreground'
                      )}
                    >
                      <div className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                        {isSelected && (
                          <div className="h-2 w-2 bg-current rounded-full" />
                        )}
                      </div>
                      {selectOption.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Single selection using Radix Select
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <ShadSelect
        value={value?.value || ''}
        onValueChange={selectedValue => {
          const option = options.find(
            opt => 'value' in opt && opt.value === selectedValue
          ) as SelectOption;
          if (option) {
            onValueChange?.({ value: option.value, label: option.label });
          }
        }}
        disabled={disabled}
        name={name}
        required={required}
        onOpenChange={setIsOpen}
        {...props}
      >
        <ShadSelectTrigger
          ref={ref}
          className={cn(
            sizeClasses[size],
            !value && 'text-muted-foreground',
            'relative',
            triggerClassName
          )}
        >
          <div className="flex items-center justify-between w-full">
            <ShadSelectValue placeholder={placeholder} />
            {clearable && value && (
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClear();
                }}
                className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                ×
              </button>
            )}
          </div>
        </ShadSelectTrigger>
        <ShadSelectContent
          className={cn(
            'min-w-[var(--radix-select-trigger-width)]',
            contentClassName
          )}
          style={{ maxHeight }}
        >
          {searchable && (
            <>
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <ShadSelectSeparator />
            </>
          )}

          {filteredOptions.map((option, index) => {
            if ('type' in option) {
              if (option.type === 'separator') {
                return <ShadSelectSeparator key={`separator-${index}`} />;
              }
              if (option.type === 'label') {
                return (
                  <ShadSelectGroup key={`label-${index}`}>
                    <ShadSelectLabel>{option.label}</ShadSelectLabel>
                  </ShadSelectGroup>
                );
              }
            }

            const selectOption = option as SelectOption;

            return (
              <ShadSelectItem
                key={selectOption.value}
                value={selectOption.value}
                disabled={selectOption.disabled}
                className={cn(
                  'cursor-pointer',
                  value?.value === selectOption.value &&
                    'bg-accent text-accent-foreground'
                )}
              >
                {selectOption.label}
              </ShadSelectItem>
            );
          })}
        </ShadSelectContent>
      </ShadSelect>
    </div>
  );
});

SelectMenu.displayName = 'SelectMenu';
