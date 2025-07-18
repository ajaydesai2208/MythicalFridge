import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define button variants using class-variance-authority
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "transition-colors disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow hover:bg-primary/90",
        destructive: "bg-error text-white shadow-sm hover:bg-error/90",
        success: "bg-success text-white shadow-sm hover:bg-success/90",
        warning: "bg-warning text-black shadow-sm hover:bg-warning/90",
        outline: "border border-neutral-300 bg-background hover:bg-neutral-100",
        secondary: "bg-secondary text-black shadow-sm hover:bg-secondary/90",
        ghost: "bg-transparent hover:bg-neutral-100",
        link: "bg-transparent underline-offset-4 text-primary hover:underline"
      },
      size: {
        xs: "text-xs px-2 py-1",
        sm: "text-sm px-3 py-1.5",
        default: "h-9 text-sm px-4 py-2",
        lg: "h-10 text-base px-6 py-3",
        icon: "h-9 w-9 p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

// ButtonProps interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// ForwardRef Button component without Slot dependency
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
