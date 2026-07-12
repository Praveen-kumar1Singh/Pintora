"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search as SearchIcon, X, Clock, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, getCollections, ShopifyProduct, ShopifyCollection } from '@/lib/shopify';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [matchedCollections, setMatchedCollections] = useState<ShopifyCollection[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const trendingSearches = ["Oversized Tees", "Hoodies", "Caps"];
  const defaultCategories = ["Hoodies", "T-Shirts", "Accessories", "Bottomwear"];

  // Load recent searches and collections on mount
  useEffect(() => {
    const saved = localStorage.getItem('printora-recent-searches');
    if (saved) {
      try { setRecentSearches(JSON.parse(saved)); } catch (e) {}
    }
    
    // Fetch collections once to filter locally
    getCollections().then(setCollections);
  }, []);

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 5);
      localStorage.setItem('printora-recent-searches', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => setQuery(""), 300);
    }
    
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (debouncedQuery.trim().length > 1) {
      setIsLoading(true);
      
      // Match collections locally
      const lowerQ = debouncedQuery.toLowerCase();
      const mCol = collections.filter(c => 
        c.title.toLowerCase().includes(lowerQ) || 
        c.description?.toLowerCase().includes(lowerQ)
      );
      setMatchedCollections(mCol);
      
      // Fetch products dynamically from Shopify
      getProducts({ query: debouncedQuery }).then(products => {
        setResults(products);
        setIsLoading(false);
      });
      
    } else {
      setResults([]);
      setMatchedCollections([]);
      setIsLoading(false);
    }
  }, [debouncedQuery, collections]);

  const handleResultClick = (term?: string) => {
    if (term || debouncedQuery) {
      saveRecentSearch(term || debouncedQuery);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      saveRecentSearch(query);
      window.location.href = `/shop?search=${encodeURIComponent(query)}`;
      onClose();
    }
  };

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
              {isLoading ? (
                <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground shrink-0 animate-spin" />
              ) : (
                <SearchIcon className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground shrink-0" />
              )}
              <input
                ref={inputRef}
                type="text"
                value={query}
                autoFocus
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
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
                    {recentSearches.length > 0 && (
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
                    )}
                    
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
                      {defaultCategories.map((cat) => (
                        <Link 
                          key={cat} 
                          href={`/collections/${cat.toLowerCase().replace(' ', '-')}`}
                          onClick={() => handleResultClick()}
                          className="group relative aspect-[4/3] overflow-hidden bg-muted flex items-end p-4 rounded-lg"
                        >
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                          <h4 className="relative z-20 font-bold text-white uppercase tracking-wider">{cat}</h4>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Results State
                <div className={isLoading ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
                  <div className="flex items-center justify-between mb-8 border-b pb-4">
                    <h3 className="text-xl font-medium">
                      Results for <span className="font-bold">"{debouncedQuery}"</span>
                    </h3>
                    <span className="text-muted-foreground">{results.length} items</span>
                  </div>

                  {results.length === 0 && matchedCollections.length === 0 && !isLoading ? (
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
                    <div className="space-y-12">
                      
                      {/* Matching Collections */}
                      {matchedCollections.length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                            Matching Collections
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {matchedCollections.map((col) => (
                              <Link 
                                key={col.id} 
                                href={`/collections/${col.handle}`}
                                onClick={() => handleResultClick()}
                                className="group relative aspect-[4/3] overflow-hidden bg-muted flex items-end p-4 rounded-lg"
                              >
                                {col.image?.url && (
                                  <Image src={col.image.url} alt={col.title} fill className="object-cover" />
                                )}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors z-10" />
                                <h4 className="relative z-20 font-bold text-white uppercase tracking-wider">{col.title}</h4>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Matching Products */}
                      {results.length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                            Products
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-6">
                            {results.map((product) => (
                              <Link 
                                key={product.id} 
                                href={`/product/${product.handle}`} 
                                onClick={() => handleResultClick()}
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
                        </div>
                      )}
                    </div>
                  )}
                  
                  {(results.length > 0 || matchedCollections.length > 0) && (
                    <div className="mt-12 flex justify-center">
                      <Link 
                        href={`/shop?search=${encodeURIComponent(debouncedQuery)}`} 
                        onClick={() => handleResultClick()}
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
