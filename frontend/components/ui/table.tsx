import * as React from "react";

import { cn } from "@/lib/utils";

// Table wrapper with horizontal scroll on small screens
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-x-auto">
    <table
      ref={ref}
      className={cn(
        "min-w-full divide-y divide-neutral-200 text-sm",
        "dark:divide-neutral-700",
        className
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

// Table header section with background
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "bg-neutral-100",
      "dark:bg-neutral-700",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

// Table body with striped rows and dividing lines
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "divide-y divide-neutral-200",
      "dark:divide-neutral-700",
      "[&_tr:nth-child(even)]:bg-neutral-50",
      "dark:[&_tr:nth-child(even)]:bg-neutral-800",
      className
    )}
    {...props}
  />
));
TableBody.displayName = "TableBody";

// Table footer matching header style
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "bg-neutral-100 font-medium",
      "dark:bg-neutral-700",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

// Table row with hover state
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "transition-colors hover:bg-neutral-100",
      "dark:hover:bg-neutral-700",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

// Table header cell
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "px-4 py-2 text-left font-medium text-neutral-900",
      "dark:text-neutral-100",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

// Table body cell
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-4 py-2 text-neutral-700",
      "dark:text-neutral-300",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

// Table caption styling
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-4 text-sm text-neutral-500",
      "dark:text-neutral-400",
      className
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
