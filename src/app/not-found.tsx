"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md space-y-8"
      >
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-heading font-black text-muted/30 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-widest bg-background/50 backdrop-blur-sm px-4">
              Page Not Found
            </h2>
          </div>
        </div>

        <p className="text-muted-foreground text-lg leading-relaxed">
          The page you're looking for has vanished into the void. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t">
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full h-14 uppercase tracking-widest font-bold">
              <ArrowLeft className="w-4 h-4 mr-2" /> Go Home
            </Button>
          </Link>
          <Link href="/shop" className="flex-1">
            <Button className="w-full h-14 uppercase tracking-widest font-bold shadow-lg">
              <Search className="w-4 h-4 mr-2" /> Browse Shop
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
