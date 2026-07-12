"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const inWishlist = isInWishlist(product.id);
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtPrice = product.priceRange.minVariantPrice.amount ? (price * 1.2).toFixed(0) : null;
  // TODO: Use actual Shopify tags instead of mock logic
  const isNew = product.tags?.includes('new') || false;
  const isBestseller = product.tags?.includes('bestseller') || false;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col gap-4"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted/50 rounded-2xl">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && <span className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-sm">New</span>}
          {isBestseller && <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-sm">Bestseller</span>}
        </div>

        <Link href={`/product/${product.handle}`} className="block w-full h-full">
          <Image
            src={product.images.edges[0]?.node.url || 'https://picsum.photos/800/1000'}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        </Link>
        
        {/* Quick Actions overlay */}
        <div className="absolute top-3 right-3 lg:top-4 lg:right-4 flex flex-col gap-2 lg:opacity-0 lg:translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 z-10">
          <Button 
            variant="secondary" 
            size="icon" 
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className="rounded-full shadow-md bg-white hover:bg-white/90 text-black w-8 h-8 lg:w-10 lg:h-10 transition-transform hover:scale-110"
            onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
          >
            <Heart aria-hidden="true" className={`w-3 h-3 lg:w-4 lg:h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
        
        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3 lg:bottom-4 lg:left-4 lg:right-4 lg:opacity-0 lg:translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-10">
          {/* Mobile Icon Button */}
          <Button 
            size="icon"
            aria-label={`Quick add ${product.title} to cart`}
            className="w-8 h-8 rounded-full shadow-md lg:hidden absolute right-0 bottom-0 bg-black text-white"
            onClick={async (e) => {
              e.preventDefault();
              await addToCart(product.variants?.edges?.[0]?.node?.id || product.id, 1);
              toast.success(`${product.title} added to cart`);
            }}
          >
            <ShoppingBag aria-hidden="true" className="w-4 h-4" />
          </Button>
          {/* Desktop Full Button */}
          <Button 
            aria-label={`Quick add ${product.title} to cart`}
            className="w-full shadow-lg hidden lg:flex rounded-none bg-black text-white hover:bg-black/90 font-bold uppercase tracking-widest text-xs h-12"
            onClick={async (e) => {
              e.preventDefault();
              await addToCart(product.variants?.edges?.[0]?.node?.id || product.id, 1);
              toast.success(`${product.title} added to cart`);
            }}
          >
            Quick Add To Cart
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 px-1">
        {/* Rating Mock */}
        <div className="flex items-center gap-1 text-[10px] text-yellow-500">
          {'★★★★★'.split('').map((star, i) => (
            <span key={i}>{star}</span>
          ))}
          <span className="text-muted-foreground ml-1">(4.8)</span>
        </div>
        
        <Link href={`/product/${product.handle}`}>
          <h3 className="font-bold text-sm tracking-wide uppercase line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm">
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)}
          </p>
          {compareAtPrice && (
            <p className="text-muted-foreground text-sm line-through">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(compareAtPrice))}
            </p>
          )}
        </div>

        {/* Color Swatches Mock */}
        <div className="flex items-center gap-1 mt-1">
          {['bg-black', 'bg-zinc-300', 'bg-amber-900'].map((color, i) => (
            <div key={i} className={`w-3 h-3 rounded-full border border-border/50 ${color}`} />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">+2 colors</span>
        </div>
      </div>
    </motion.div>
  );
}
