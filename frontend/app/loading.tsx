// app/loading.tsx

export default function Loading() {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <div
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }
  