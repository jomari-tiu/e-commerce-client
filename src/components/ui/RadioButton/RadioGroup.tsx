import { cn } from '@/utils/cn';
import { ShadRadioGroup, ShadRadioGroupItem } from '../@raw-shadcn/RadioButton/ShadRadioGroup';

export type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
};

export type RadioGroupProps = {
  options: RadioOption[];
  onValueChange: (value: string) => void;
  value?: string;
  disabled?: boolean;
  className?: string;
  groupClassName?: string;
  itemClassName?: string;
  labelClassName?: string;
  label?: string;
  required?: boolean;
  name?: string;
  orientation?: 'vertical' | 'horizontal';
  size?: 'default' | 'sm' | 'lg';
};

export const sizeClasses = {
  sm: 'h-3 w-3',
  default: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export const orientationClasses = {
  vertical: 'flex-col space-y-2',
  horizontal: 'flex-row space-x-4',
};

const RadioGroup = ({
  options,
  onValueChange,
  value,
  disabled = false,
  className,
  groupClassName,
  itemClassName,
  labelClassName,
  label,
  required = false,
  name,
  orientation = 'vertical',
  size = 'default',
  ...props
}: RadioGroupProps) => {
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
        className={cn('flex', orientationClasses[orientation], groupClassName)}
        {...props}
      >
        {options.map(option => (
          <div key={option.value} className="flex items-center space-x-2">
            <ShadRadioGroupItem
              id={'radio-' + option.value}
              value={option.value}
              disabled={option.disabled || disabled}
              className={cn(sizeClasses[size], 'mt-0.5', itemClassName)}
            />
            <label
              htmlFor={'radio-' + option.value}
              className="flex flex-col peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              <div
                className={cn(
                  'text-sm font-medium leading-none',
                  labelClassName
                )}
              >
                {option.label}
              </div>
              {option.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {option.description}
                </p>
              )}
            </label>
          </div>
        ))}
      </ShadRadioGroup>
    </div>
  );
};

export default RadioGroup;
