"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
        Something went wrong
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        We encountered an unexpected error while loading this page. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} className="rounded-none uppercase font-bold tracking-widest px-8">
          Try Again
        </Button>
        <Button variant="outline" onClick={() => window.location.href = '/'} className="rounded-none uppercase font-bold tracking-widest px-8">
          Go Home
        </Button>
      </div>
    </div>
  );
}
