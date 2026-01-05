import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const textVariants = cva("inline-block", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
    weight: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    color: {
      default: "text-gray-900",
      primary: "text-primary",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
      info: "text-info",
      muted: "text-gray-500",
      accent: "text-gray-700",
      white: "text-white",
      black: "text-black",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "default",
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      size,
      weight,
      color,
      as: Component = "span",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        className={cn(textVariants({ size, weight, color: color, className }))}
        ref={ref as any}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = "Text";

export { Text, textVariants };
