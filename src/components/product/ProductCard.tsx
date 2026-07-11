"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { Button } from '../ui/button';

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const inWishlist = isInWishlist(product.id);
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col gap-4"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted/50 rounded-lg">
        <Link href={`/product/${product.handle}`} className="block w-full h-full">
          <Image
            src={product.images.edges[0]?.node.url || 'https://picsum.photos/800/1000'}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
          {product.images.edges[1] && (
            <Image
              src={product.images.edges[1].node.url}
              alt={product.title}
              fill
              className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          )}
        </Link>
        
        {/* Quick Actions overlay */}
        <div className="absolute top-3 right-3 lg:top-4 lg:right-4 flex flex-col gap-2 lg:opacity-0 lg:translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <Button 
            variant="secondary" 
            size="icon" 
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className="rounded-full shadow-md bg-background/90 hover:bg-background backdrop-blur-sm w-8 h-8 lg:w-10 lg:h-10"
            onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
          >
            <Heart aria-hidden="true" className={`w-3 h-3 lg:w-4 lg:h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
        
        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3 lg:bottom-4 lg:left-4 lg:right-4 lg:opacity-0 lg:translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          {/* Mobile Icon Button */}
          <Button 
            size="icon"
            aria-label={`Quick add ${product.title} to cart`}
            className="w-8 h-8 rounded-full shadow-md lg:hidden absolute right-0 bottom-0 bg-primary text-primary-foreground"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.variants?.edges?.[0]?.node?.id || product.id, 1);
            }}
          >
            <ShoppingBag aria-hidden="true" className="w-4 h-4" />
          </Button>
          {/* Desktop Full Button */}
          <Button 
            aria-label={`Quick add ${product.title} to cart`}
            className="w-full shadow-lg hidden lg:flex"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.variants?.edges?.[0]?.node?.id || product.id, 1);
            }}
          >
            <ShoppingBag aria-hidden="true" className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Link href={`/product/${product.handle}`}>
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:underline decoration-1 underline-offset-4">
            {product.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm">
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)}
        </p>
      </div>
    </motion.div>
  );
}
