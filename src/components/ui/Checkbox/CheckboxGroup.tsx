import { cn } from '@/utils/cn';
import Checkbox from './Checkbox';

export type CheckboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
};

export type CheckboxGroupProps = {
  options: CheckboxOption[];
  values: string[];
  onValuesChange: (values: string[]) => void;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  groupClassName?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  orientation?: 'vertical' | 'horizontal';
  size?: 'default' | 'sm' | 'lg';
  name?: string;
};

const CheckboxGroup = ({
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
  orientation = 'vertical',
  size = 'default',
  name,
  ...props
}: CheckboxGroupProps) => {
  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onValuesChange([...values, optionValue]);
    } else {
      onValuesChange(values.filter(v => v !== optionValue));
    }
  };

  const orientationClasses = {
    vertical: 'flex-col space-y-3',
    horizontal: 'flex-row space-x-6',
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 block">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        className={cn('flex', orientationClasses[orientation], groupClassName)}
      >
        {options.map(option => (
          <Checkbox
            key={option.value}
            id={option.value}
            label={option.label}
            description={option.description}
            checked={values.includes(option.value)}
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange(option.value, checked)
            }
            disabled={option.disabled || disabled}
            size={size}
            name={name}
            value={option.value}
            checkboxClassName={checkboxClassName}
            labelClassName={labelClassName}
          />
        ))}
      </div>
    </div>
  );
};
export default CheckboxGroup;
