// app/error.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground p-4">
      <h1 className="text-2xl font-semibold mb-2">Oops — something went wrong</h1>
      <p className="mb-6 text-neutral-500 dark:text-neutral-400">
        An unexpected error occurred. Please try again.
      </p>
      <Button
        variant="primary"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </div>
  );
}
