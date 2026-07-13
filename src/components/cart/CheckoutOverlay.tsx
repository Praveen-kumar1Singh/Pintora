"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export type CheckoutStatus = 'idle' | 'loading' | 'error';

interface CheckoutOverlayProps {
  status: CheckoutStatus;
  error?: string | null;
  onRetry: () => void;
  onCancel: () => void;
}

export function CheckoutOverlay({ status, error, onRetry, onCancel }: CheckoutOverlayProps) {
  // Lock body scroll when overlay is active
  useEffect(() => {
    if (status !== 'idle') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [status]);

  return (
    <AnimatePresence>
      {status !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)', transition: { delay: 0.1 } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80"
        >
          <AnimatePresence mode="wait">
            {status === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center space-y-10 p-8 max-w-md w-full text-center relative"
              >
                {/* Premium Spinner */}
                <div className="relative flex items-center justify-center w-32 h-32">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-[1px] border-primary/20 border-t-primary"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-[1px] border-primary/10 border-b-primary"
                  />
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-heading font-black uppercase tracking-[0.2em]">Preparing Order</h2>
                  <motion.p 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="text-muted-foreground tracking-widest text-sm uppercase"
                  >
                    Securely transferring your cart...
                  </motion.p>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
                className="bg-background border shadow-2xl p-8 max-w-md w-full mx-4 flex flex-col items-center text-center space-y-6 relative overflow-hidden rounded-xl"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-destructive" />
                
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-black uppercase tracking-widest text-destructive">Checkout Error</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {error || "An unexpected error occurred while preparing your checkout. Please try again."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
                  <Button variant="outline" onClick={onCancel} className="flex-1 h-12 uppercase tracking-widest font-bold">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
                  </Button>
                  <Button onClick={onRetry} className="flex-1 h-12 uppercase tracking-widest font-bold">
                    <RefreshCw className="w-4 h-4 mr-2" /> Try Again
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
