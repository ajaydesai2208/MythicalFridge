import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Input variants with semantic states and size options
const inputVariants = cva(
  [
    "flex w-full rounded-md border bg-white text-sm placeholder:text-neutral-400",
    "focus:outline-none focus:ring-2 focus:ring-offset-1",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-500"
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-neutral-300 focus:ring-primary",
        error: "border-error focus:ring-error",
        success: "border-success focus:ring-success",
        warning: "border-warning focus:ring-warning"
      },
      size: {
        sm: "px-2 py-1.5 h-8 text-sm",
        md: "px-3 py-2 h-10 text-sm",
        lg: "px-4 py-3 h-12 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

// Type alias for props combining HTML input attributes and variant control
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputVariants>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, ...props }, ref) => (
    <input
      className={cn(inputVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input, inputVariants };
