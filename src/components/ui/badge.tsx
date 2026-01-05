import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
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
        default: "px-4 py-2",
        sm: "px-2 py-0.5",
        lg: "px-8 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, size, ...props }: BadgeProps) => {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
};
Badge.displayName = "Badge";

export { Badge };
