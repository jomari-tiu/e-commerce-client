import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes } from "react";
import { FiLoader } from "react-icons/fi";

const buttonVariants = cva(
  "flex items-center justify-center rounded-md cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "border border-gray-300 text-gray-700 hover:bg-gray-200",
        danger: "bg-danger text-white hover:bg-danger/80",
        info: "bg-info text-white hover:bg-info/80",
        warning: "bg-warning text-white hover:bg-warning/80",
        success: "bg-success text-white hover:bg-success/80",
        primary: "bg-primary text-white hover:bg-primary/80",
        ghost: "hover:bg-gray-100 text-gray-700",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, disabled }))}
        disabled={loading}
        ref={ref}
        {...props}
      >
        {loading && <FiLoader className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
