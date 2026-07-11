"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search as SearchIcon, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, ShopifyProduct } from '@/lib/shopify';

export function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const recentSearches = ["Oversized Hoodie", "Graphic Tee", "Black Cap"];
  const trendingSearches = ["Summer Collection", "Varsity Jackets", "Cargo Pants", "Electric Blue"];
  const categories = ["Hoodies", "T-Shirts", "Accessories", "Outerwear"];

  useEffect(() => {
    // Fetch products once when mounted (or opened)
    if (allProducts.length === 0) {
      getProducts().then(setAllProducts);
    }
  }, [allProducts.length]);

  useEffect(() => {
    if (isOpen) {
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 100);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Clear query when closed
      setTimeout(() => setQuery(""), 300);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = allProducts.filter(
        p => p.title.toLowerCase().includes(query.toLowerCase()) || 
             p.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, allProducts]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-background flex flex-col"
        >
          {/* Header / Search Input */}
          <div className="w-full border-b">
            <div className="container mx-auto px-4 lg:px-8 h-20 md:h-24 flex items-center gap-4">
              <SearchIcon className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, collections..."
                className="flex-1 h-full bg-transparent border-none outline-none text-2xl md:text-4xl font-medium tracking-tight placeholder:text-muted-foreground/50"
              />
              <button 
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-muted transition-colors shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 lg:px-8 py-12">
              {query.trim().length === 0 ? (
                // Empty State: Recent & Trending
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                  <div className="md:col-span-4 space-y-12">
                    {/* Recent Searches */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center">
                        <Clock className="w-4 h-4 mr-2" /> Recent Searches
                      </h3>
                      <ul className="space-y-4">
                        {recentSearches.map((item) => (
                          <li key={item}>
                            <button 
                              onClick={() => setQuery(item)}
                              className="text-lg hover:text-muted-foreground transition-colors"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Trending */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" /> Trending Now
                      </h3>
                      <ul className="space-y-4">
                        {trendingSearches.map((item) => (
                          <li key={item}>
                            <button 
                              onClick={() => setQuery(item)}
                              className="text-lg hover:text-muted-foreground transition-colors"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="md:col-span-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                      Popular Categories
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {categories.map((cat, i) => (
                        <Link 
                          key={cat} 
                          href={`/shop?category=${encodeURIComponent(cat)}`}
                          onClick={onClose}
                          className="group relative aspect-square overflow-hidden bg-muted flex items-end p-4 rounded-lg"
                        >
                          {/* We mock an image background. Ideally we'd use a real category image */}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                          <h4 className="relative z-20 font-bold text-white uppercase tracking-wider">{cat}</h4>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Results State
                <div>
                  <div className="flex items-center justify-between mb-8 border-b pb-4">
                    <h3 className="text-xl font-medium">
                      Results for <span className="font-bold">"{query}"</span>
                    </h3>
                    <span className="text-muted-foreground">{results.length} items</span>
                  </div>

                  {results.length === 0 ? (
                    <div className="py-20 text-center flex flex-col items-center">
                      <SearchIcon className="w-16 h-16 text-muted-foreground/30 mb-6" />
                      <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">No results found</h3>
                      <p className="text-muted-foreground mb-8 max-w-md">
                        We couldn't find anything matching your search. Try checking your spelling or using more general terms.
                      </p>
                      <button onClick={() => setQuery("")} className="uppercase tracking-widest font-semibold border-b-2 border-foreground pb-1">
                        Clear Search
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-6">
                      {results.map((product) => (
                        <Link 
                          key={product.id} 
                          href={`/product/${product.handle}`} 
                          onClick={onClose}
                          className="group"
                        >
                          <div className="relative aspect-[3/4] bg-muted mb-4 overflow-hidden rounded-md">
                            <Image
                              src={product.images.edges[0]?.node.url || 'https://picsum.photos/400/500'}
                              alt={product.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <h4 className="font-bold text-sm uppercase tracking-wide line-clamp-1 group-hover:underline underline-offset-4">
                            {product.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(parseFloat(product.priceRange.minVariantPrice.amount))}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {results.length > 0 && (
                    <div className="mt-12 flex justify-center">
                      <Link 
                        href={`/shop?search=${encodeURIComponent(query)}`} 
                        onClick={onClose}
                        className="inline-flex items-center uppercase tracking-widest font-semibold border-b-2 border-transparent hover:border-foreground pb-1 transition-colors"
                      >
                        View all results <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
