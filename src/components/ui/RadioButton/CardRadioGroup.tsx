import { ComponentProps, ReactNode } from 'react';
import RadioGroup, { RadioGroupProps, RadioOption } from './RadioGroup';
import { cn } from '@/utils/cn';
import { ShadRadioGroup, ShadRadioGroupItem } from '../@raw-shadcn/RadioButton/ShadRadioGroup';
import { Badge } from '../badge';

export type CardRadioOption = RadioOption & {
  icon?: ReactNode;
  badge?: Omit<ComponentProps<typeof Badge>, 'children'> & { label: string };
  recommended?: boolean;
  price?: string;
};

export type CardRadioGroupProps = Omit<RadioGroupProps, 'options'> & {
  options: CardRadioOption[];
  layout?: 'default' | 'cards' | 'tiles';
  columns?: number;
  showIcons?: boolean;
  showBadges?: boolean;
  cardClassName?: string;
};

const CardRadioGroup = ({
  options,
  onValueChange,
  value,
  disabled = false,
  className,
  groupClassName,
  itemClassName,
  labelClassName,
  cardClassName,
  label,
  required = false,
  name,
  orientation = 'vertical',
  size = 'default',
  layout = 'default',
  columns = 1,
  showIcons = true,
  showBadges = true,
  ...props
}: CardRadioGroupProps) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    default: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

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
      ? 'flex flex-row space-x-4'
      : 'flex flex-col space-y-2';
  };

  if (layout === 'default') {
    return (
      <RadioGroup
        options={options}
        onValueChange={onValueChange}
        value={value}
        disabled={disabled}
        className={className}
        groupClassName={groupClassName}
        itemClassName={itemClassName}
        labelClassName={labelClassName}
        label={label}
        required={required}
        name={name}
        orientation={orientation}
        size={size}
        {...props}
      />
    );
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 block">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <ShadRadioGroup
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
        required={required}
        className={cn(getGridClasses(), groupClassName)}
        {...props}
      >
        {options.map(option => {
          const isSelected = value === option.value;
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
                  <ShadRadioGroupItem
                    value={option.value}
                    disabled={isDisabled}
                    className={cn(
                      sizeClasses[size],
                      layout === 'tiles' ? 'order-last mt-1' : 'mt-0.5',
                      itemClassName
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
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </ShadRadioGroup>
    </div>
  );
};

export default CardRadioGroup;
