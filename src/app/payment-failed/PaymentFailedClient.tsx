"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw, ShoppingCart, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { ProductCard } from '@/components/product/ProductCard';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

export function PaymentFailedClient() {
  const { cart, setDrawerOpen } = useCartStore();
  const recentlyViewed = useRecentlyViewed();
  
  const handleRetry = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  const handleReturnToCart = () => {
    setDrawerOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-24 flex flex-col items-center">
      
      {/* Animation Header */}
      <div className="flex flex-col items-center justify-center text-center max-w-2xl w-full mb-12">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center mb-8 relative overflow-hidden shadow-2xl shadow-destructive/20"
        >
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <XCircle className="w-12 h-12" />
          </motion.div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-destructive"
        >
          Payment Failed
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground mb-8"
        >
          We couldn't process your payment. Don't worry—your cart is safely saved. Please try a different payment method or try again.
        </motion.p>
      </div>

      {/* CTAs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto mb-20"
      >
        <Button 
          onClick={handleRetry} 
          disabled={!cart?.checkoutUrl}
          className="flex-1 h-14 text-base uppercase tracking-widest font-black shadow-lg hover:shadow-destructive/25 transition-all bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          <RefreshCw className="w-5 h-5 mr-2" /> Retry Payment
        </Button>
        <Button 
          variant="outline"
          onClick={handleReturnToCart} 
          className="flex-1 h-14 text-base uppercase tracking-widest font-bold"
        >
          <ShoppingCart className="w-5 h-5 mr-2" /> Return to Cart
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-20 text-center"
      >
        <Link href="/contact" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-foreground underline underline-offset-4 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 mr-2" /> Need Customer Support?
        </Link>
      </motion.div>

      {/* Recently Viewed Products */}
      {recentlyViewed.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-7xl pt-16 border-t"
        >
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-10 text-center">
            Recently Viewed
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {recentlyViewed.slice(0, 4).map((product) => (
              <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
}
