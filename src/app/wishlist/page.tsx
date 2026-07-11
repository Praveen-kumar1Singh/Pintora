"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlistStore } from '@/store/useWishlistStore';
import { EmptyState } from '@/components/ui/empty-state';
import { useCartStore } from '@/store/useCartStore';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { ShopifyProduct } from '@/lib/shopify';

export default function WishlistPage() {
  const [isMounted, setIsMounted] = useState(false);
  const wishlistItems = useWishlistStore((state) => state.items);
  const { removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMoveToCart = (product: ShopifyProduct) => {
    // We assume default color and size for moving to cart quickly, 
    // though in a real scenario you'd open a modal to select them if they exist
    addToCart(product.variants?.edges?.[0]?.node?.id || product.id, 1);
    removeItem(product.id);
  };

  if (!isMounted) return null; // Avoid hydration mismatch for persisted store

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 md:py-20 min-h-[70vh]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b pb-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            Your Wishlist
          </h1>
          <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <EmptyState 
          icon={<Heart className="w-10 h-10" />}
          title="Your wishlist is empty"
          description="Save your favorite pieces here. They will be waiting for you when you are ready."
          actionLabel="Start Browsing"
          actionHref="/shop"
        />
      ) : (
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
          <AnimatePresence>
            {wishlistItems.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <ProductCard product={product} />
                
                {/* Overlay Action - specific to wishlist */}
                <div className="absolute top-4 left-4 z-10 opacity-0 translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <Button 
                    size="sm" 
                    className="shadow-lg font-bold uppercase tracking-wider text-xs h-8"
                    onClick={() => handleMoveToCart(product)}
                  >
                    <ShoppingBag className="w-3 h-3 mr-2" /> Move to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
