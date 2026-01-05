import { ComponentProps, ReactNode } from 'react';
import { CheckboxOption } from './CheckboxGroup';
import { cn } from '@/utils/cn';
import Checkbox from './Checkbox';
import { Badge } from '../badge';
import { ShadCheckbox } from '../@raw-shadcn/Checkbox/ShadCheckbox';
import CheckboxGroup, { CheckboxGroupProps } from './CheckboxGroup';

export type CardCheckboxOption = CheckboxOption & {
  icon?: ReactNode;
  badge?: Omit<ComponentProps<typeof Badge>, 'children'> & { label: string };
  recommended?: boolean;
  price?: string;
};

export type CardCheckboxProps = Omit<CheckboxGroupProps, 'options'> & {
  options: CardCheckboxOption[];
  layout?: 'default' | 'cards' | 'tiles';
  columns?: number;
  showIcons?: boolean;
  showBadges?: boolean;
  cardClassName?: string;
  allowSelectAll?: boolean;
  selectAllLabel?: string;
};

export const CardCheckboxGroup = ({
  options,
  values,
  onValuesChange,
  label,
  disabled = false,
  required = false,
  className,
  groupClassName,
  checkboxClassName,
  labelClassName,
  cardClassName,
  orientation = 'vertical',
  size = 'default',
  name,
  layout = 'default',
  columns = 1,
  showIcons = true,
  showBadges = true,
  allowSelectAll = false,
  selectAllLabel = 'Select All',
  ...props
}: CardCheckboxProps) => {
  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onValuesChange([...values, optionValue]);
    } else {
      onValuesChange(values.filter(v => v !== optionValue));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allValues = options
        .filter(option => !option.disabled)
        .map(option => option.value);
      onValuesChange(allValues);
    } else {
      onValuesChange([]);
    }
  };

  const isAllSelected =
    options.length > 0 &&
    options
      .filter(option => !option.disabled)
      .every(option => values.includes(option.value));
  const isPartiallySelected = values.length > 0 && !isAllSelected;

  const getGridClasses = () => {
    if (layout === 'cards' || layout === 'tiles') {
      return `grid gap-3 ${
        columns === 2
          ? 'grid-cols-2'
          : columns === 3
            ? 'grid-cols-3'
            : columns === 4
              ? 'grid-cols-4'
              : 'grid-cols-1'
      }`;
    }
    return orientation === 'horizontal'
      ? 'flex flex-row space-x-6'
      : 'flex flex-col space-y-3';
  };

  if (layout === 'default') {
    return (
      <div className={cn('w-full', className)} {...props}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 block">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {allowSelectAll && options.length > 1 && (
          <div className="mb-4 pb-3 border-b border-gray-200">
            <Checkbox
              label={selectAllLabel}
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
              disabled={disabled}
              size={size}
              checkboxClassName={cn(
                checkboxClassName,
                isPartiallySelected && 'data-[state=checked]:bg-gray-400'
              )}
              labelClassName={cn('font-semibold', labelClassName)}
            />
          </div>
        )}

        <CheckboxGroup
          options={options}
          values={values}
          onValuesChange={onValuesChange}
          disabled={disabled}
          groupClassName={groupClassName}
          checkboxClassName={checkboxClassName}
          labelClassName={labelClassName}
          orientation={orientation}
          size={size}
          name={name}
        />
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)} {...props}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 block">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {allowSelectAll && options.length > 1 && (
        <div className="mb-4 pb-3 border-b border-gray-200">
          <Checkbox
            label={selectAllLabel}
            checked={isAllSelected}
            onCheckedChange={handleSelectAll}
            disabled={disabled}
            size={size}
            checkboxClassName={cn(
              checkboxClassName,
              isPartiallySelected && 'data-[state=checked]:bg-gray-400'
            )}
            labelClassName={cn('font-semibold', labelClassName)}
          />
        </div>
      )}

      <div className={cn(getGridClasses(), groupClassName)}>
        {options.map(option => {
          const isSelected = values.includes(option.value);
          const isDisabled = option.disabled || disabled;

          return (
            <label
              key={option.value}
              className={cn(
                'relative cursor-pointer',
                isDisabled && 'cursor-not-allowed opacity-50'
              )}
            >
              <div
                className={cn(
                  'relative flex items-start p-4 border rounded-lg transition-all duration-200',
                  'hover:border-gray-400 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
                  isSelected
                    ? 'border-primary bg-primary-50 ring-1 ring-primary'
                    : 'border-gray-200 bg-white',
                  isDisabled && 'hover:border-gray-200',
                  layout === 'tiles' && 'text-center flex-col items-center',
                  cardClassName
                )}
              >
                {option.recommended && (
                  <div className="absolute -top-2 left-4 px-2 py-0.5 bg-blue-500 text-white text-xs font-medium rounded">
                    Recommended
                  </div>
                )}

                <div
                  className={cn(
                    'flex items-start w-full',
                    layout === 'tiles'
                      ? 'flex-col items-center space-y-2'
                      : 'space-x-3'
                  )}
                >
                  <ShadCheckbox
                    checked={isSelected}
                    onCheckedChange={checked =>
                      handleCheckboxChange(option.value, checked === true)
                    }
                    disabled={isDisabled}
                    name={name}
                    value={option.value}
                    className={cn(
                      size === 'sm'
                        ? 'h-3 w-3'
                        : size === 'lg'
                          ? 'h-5 w-5'
                          : 'h-4 w-4',
                      layout === 'tiles' ? 'order-last mt-1' : 'mt-0.5',
                      checkboxClassName
                    )}
                  />

                  <div
                    className={cn(
                      'flex-1 flex flex-col w-full',
                      layout === 'tiles' && 'text-center'
                    )}
                  >
                    {showIcons && option.icon && (
                      <div
                        className={cn(
                          'mb-2',
                          layout === 'tiles'
                            ? 'flex justify-center'
                            : 'inline-block mr-2'
                        )}
                      >
                        {option.icon}
                      </div>
                    )}

                    <div
                      className={cn(
                        'flex items-start justify-between gap-2 mb-1',
                        layout === 'tiles' && 'flex-col items-center gap-1'
                      )}
                    >
                      <div>
                        <p
                          className={cn(
                            'text-sm font-medium leading-none mb-1',
                            labelClassName
                          )}
                        >
                          {option.label}
                        </p>
                        {showBadges && option.badge && (
                          <Badge size="sm" {...option.badge}>
                            {option.badge.label}
                          </Badge>
                        )}
                      </div>
                      {option.price && (
                        <span className="text-sm font-semibold text-green-600">
                          {option.price}
                        </span>
                      )}
                    </div>

                    {option.description && (
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Selection indicator for card/tile layouts */}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CardCheckboxGroup;
