"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, ChevronRight, Home, Sparkles } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

interface CollectionData {
  title: string;
  description: string;
  image: string;
  badge?: string;
}

interface CollectionClientProps {
  products: ShopifyProduct[];
  collectionHandle: string;
  collectionInfo: CollectionData;
}

const SIZES_FALLBACK = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS_FALLBACK = ['Black', 'White'];

export function CollectionClient({ products: initialProducts, collectionHandle, collectionInfo }: CollectionClientProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('featured');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Extract real sizes and colors from Shopify products
  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    initialProducts.forEach(p => {
      const sizeOption = p.options?.find(o => o.name.toLowerCase() === 'size');
      if (sizeOption) sizeOption.values.forEach(v => sizes.add(v));
    });
    const result = Array.from(sizes);
    return result.length > 0 ? result : SIZES_FALLBACK;
  }, [initialProducts]);

  const availableColors = useMemo(() => {
    const colors = new Set<string>();
    initialProducts.forEach(p => {
      const colorOption = p.options?.find(o => o.name.toLowerCase() === 'color');
      if (colorOption) colorOption.values.forEach(v => colors.add(v));
    });
    const result = Array.from(colors);
    return result.length > 0 ? result : COLORS_FALLBACK;
  }, [initialProducts]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        const price = parseFloat(p.priceRange.minVariantPrice.amount);
        if (price < priceRange[0] || price > priceRange[1]) return false;
        
        // Filter by size
        if (selectedSizes.length > 0) {
          const sizeOption = p.options?.find(o => o.name.toLowerCase() === 'size');
          if (!sizeOption || !sizeOption.values.some(v => selectedSizes.includes(v))) {
            return false;
          }
        }
        
        // Filter by color
        if (selectedColors.length > 0) {
          const colorOption = p.options?.find(o => o.name.toLowerCase() === 'color');
          if (!colorOption || !colorOption.values.some(v => selectedColors.includes(v))) {
            return false;
          }
        }
        
        return true;
      })
      .sort((a, b) => {
        const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
        const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
        
        switch (sortOption) {
          case 'price-low': return priceA - priceB;
          case 'price-high': return priceB - priceA;
          case 'newest': return b.id.localeCompare(a.id);
          default: return 0;
        }
      });
  }, [initialProducts, priceRange, selectedSizes, selectedColors, sortOption]);

  const FilterSidebar = () => (
    <div className="space-y-8">
      <Accordion defaultValue={['price', 'size', 'color']}>
        {/* Price Filter */}
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="font-bold uppercase tracking-wider text-sm hover:no-underline py-2">Price</AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <Slider
              defaultValue={[0, 5000]}
              max={5000}
              step={100}
              value={priceRange}
              onValueChange={(val) => setPriceRange(val as number[])}
              className="mb-6"
            />
            <div className="flex justify-between items-center text-xs">
              <span className="px-2 py-1 bg-muted rounded">₹{priceRange[0]}</span>
              <span className="text-muted-foreground">to</span>
              <span className="px-2 py-1 bg-muted rounded">₹{priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Size Filter */}
        <AccordionItem value="size" className="border-none">
          <AccordionTrigger className="font-bold uppercase tracking-wider text-sm hover:no-underline py-2">Size</AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="grid grid-cols-3 gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                  className={`border text-xs py-2 rounded-sm transition-all ${
                    selectedSizes.includes(size) ? 'bg-primary text-primary-foreground border-primary' : 'hover:border-foreground bg-background'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color Filter */}
        <AccordionItem value="color" className="border-none">
          <AccordionTrigger className="font-bold uppercase tracking-wider text-sm hover:no-underline py-2">Color</AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="flex flex-col gap-3">
              {availableColors.map((c) => (
                <div key={c} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`color-${c}`} 
                    checked={selectedColors.includes(c)}
                    onCheckedChange={(checked) => {
                      if (checked) setSelectedColors([...selectedColors, c]);
                      else setSelectedColors(selectedColors.filter(color => color !== c));
                    }}
                  />
                  <label
                    htmlFor={`color-${c}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {c}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="pb-24">
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] md:h-[50vh] min-h-[300px] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <Image 
            src={collectionInfo.image} 
            alt={collectionInfo.title} 
            fill 
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
          {collectionInfo.badge && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest mb-4 inline-flex items-center rounded-sm">
              <Sparkles className="w-3 h-3 mr-2" /> {collectionInfo.badge}
            </span>
          )}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4 text-foreground drop-shadow-xl">
            {collectionInfo.title}
          </h1>
          <p className="text-lg md:text-xl text-foreground font-medium drop-shadow-md">
            {collectionInfo.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors flex items-center">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/collections" className="hover:text-foreground transition-colors">Collections</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-foreground font-semibold uppercase tracking-wider">{collectionInfo.title}</span>
        </nav>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b pb-4">
          <div className="w-full md:w-auto flex items-center gap-4 text-sm font-medium">
            <p className="uppercase tracking-wider text-muted-foreground">{filteredProducts.length} Results</p>
          </div>
          
          <div className="flex gap-4 mt-4 md:mt-0 w-full md:w-auto">
            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger render={<Button variant="outline" className="flex-1 md:hidden"><Filter className="w-4 h-4 mr-2" /> Filters</Button>} />
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader className="mb-6 text-left">
                  <SheetTitle className="uppercase tracking-tighter font-black text-xl">Filters</SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto h-[calc(100vh-100px)] pb-10">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sortOption} onValueChange={(val) => setSortOption(val || 'featured')}>
              <SelectTrigger className="w-[180px] bg-transparent">
                <div className="flex items-center">
                  <SlidersHorizontal className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Sort By" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">New Arrivals</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 pr-6">
              <FilterSidebar />
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {!isMounted ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <Skeleton className="aspect-[3/4] w-full rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Promotional Banner inside grid (Mock) */}
                {filteredProducts.length > 2 && (
                   <div className="col-span-full w-full bg-primary text-primary-foreground p-8 rounded-lg mb-10 flex flex-col md:flex-row items-center justify-between shadow-lg">
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Buy 2 Get 1 Free</h3>
                        <p className="font-medium text-primary-foreground/80">Mix and match any items from this collection.</p>
                      </div>
                      <Button variant="secondary" className="mt-4 md:mt-0 uppercase tracking-widest font-bold">Use Code B2G1</Button>
                   </div>
                )}

                {filteredProducts.length === 0 ? (
                  <div className="py-20 text-center bg-muted/20 rounded-lg border border-dashed">
                    <h3 className="text-xl font-medium mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-6">We couldn't find anything matching your current filters.</p>
                    <Button onClick={() => { setPriceRange([0,5000]); setSelectedColors([]); setSelectedSizes([]); }}>
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
                    <AnimatePresence mode="popLayout">
                      {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
                
                {filteredProducts.length > 0 && (
                  <div className="mt-16 text-center">
                    <Button variant="outline" size="lg" className="uppercase tracking-widest font-semibold px-12 h-14">
                      Load More
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
