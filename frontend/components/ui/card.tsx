import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Card variants with shadow levels and dark mode support
const cardVariants = cva(
  [
    "rounded-lg border bg-neutral-50 text-neutral-900 shadow-sm",
    "dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100"
  ].join(" "),
  {
    variants: {
      variant: {
        default: "shadow-sm",
        elevated: "shadow-md"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

// Card component accepts HTML div attributes and variant control
export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

// CardHeader without separate interface to satisfy ESLint
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-6 py-4 border-b border-neutral-200 dark:border-neutral-700",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-neutral-600 dark:text-neutral-400",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 flex items-center",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
