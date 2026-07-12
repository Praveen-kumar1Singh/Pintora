'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function CollectionError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <AlertCircle className="w-16 h-16 text-destructive mb-6" />
      <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">
        Failed to Load Collection
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        We encountered an error while trying to fetch the collection data.
      </p>
      <Button 
        onClick={() => reset()}
        size="lg"
        className="uppercase tracking-widest font-bold"
      >
        Try Again
      </Button>
    </div>
  );
}
