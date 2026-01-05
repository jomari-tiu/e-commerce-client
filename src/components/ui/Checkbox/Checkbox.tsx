import { ShadCheckbox } from "../@raw-shadcn/Checkbox/ShadCheckbox";
import { cn } from "@/utils/cn";

export type CheckboxProps = {
  label?: string;
  description?: string;
  checked?: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  size?: "default" | "sm" | "lg";
  name?: string;
  value?: string;
  id?: string;
};

const Checkbox = ({
  label,
  description,
  checked,
  onCheckedChange,
  disabled = false,
  required = false,
  className,
  checkboxClassName,
  labelClassName,
  size = "default",
  name,
  value,
  id,
  ...props
}: CheckboxProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    default: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div
      className={cn("flex items-start space-x-2", className, {
        "items-center": !description,
      })}
    >
      <ShadCheckbox
        id={"checkbox-" + id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        name={name}
        value={value}
        required={required}
        className={cn(sizeClasses[size], "mt-0.5", checkboxClassName)}
        {...props}
      />
      {(label || description) && (
        <label
          htmlFor={"checkbox-" + id}
          className="flex flex-col peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          {label && (
            <div
              className={cn("text-sm font-medium leading-none", labelClassName)}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </div>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </label>
      )}
    </div>
  );
};
export default Checkbox;
