"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function GlobalError({
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
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-background border shadow-2xl p-8 max-w-md w-full text-center space-y-8 relative overflow-hidden rounded-xl"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-destructive" />
        
        <div className="w-20 h-20 mx-auto rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
          <AlertOctagon className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-heading font-black uppercase tracking-widest text-destructive">
            System Error
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Something went unexpectedly wrong. We've logged the issue and are looking into it.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={() => reset()} className="w-full h-14 uppercase tracking-widest font-bold bg-destructive text-destructive-foreground hover:bg-destructive/90">
            <RefreshCw className="w-4 h-4 mr-2" /> Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full h-14 uppercase tracking-widest font-bold">
              <Home className="w-4 h-4 mr-2" /> Return Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
